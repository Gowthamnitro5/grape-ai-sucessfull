import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { profile as SignUpData, supabase } from "@/utils/supabase";
import { Input } from "@rneui/themed";
import { KeyboardTypeOptions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  accessibilityLabel: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  accessibilityLabel,
  ...rest
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Input
      value={value}
      onChangeText={onChangeText}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.inputText}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      {...rest}
    />
  </View>
);

interface SignUpProps {
  signUpData: SignUpData;
  setSignUpData: (data: SignUpData) => void;
  signUpUser: () => void;
  loading: boolean;
}

const SignUp: React.FC<SignUpProps> = ({
  signUpData,
  setSignUpData,
  signUpUser,
  loading,
}) => {
  const signUpFields = [
    {
      label: "Email",
      key: "email",
      keyboardType: "email-address",
      accessibilityLabel: "Enter your email address",
    },
    {
      label: "Password",
      key: "password",
      secureTextEntry: true,
      accessibilityLabel: "Enter your password",
    },
    {
      label: "Full Name",
      key: "fullName",
      accessibilityLabel: "Enter your full name",
    },
    {
      label: "Phone Number",
      key: "phone",
      keyboardType: "phone-pad",
      accessibilityLabel: "Enter your phone number",
    },
    {
      label: "Address",
      key: "address",
      accessibilityLabel: "Enter your address",
    },
    {
      label: "Soil Type",
      key: "soilType",
      accessibilityLabel: "Enter your soil type",
    },
    {
      label: "Farm Area (in acres)",
      key: "farmArea",
      keyboardType: "numeric",
      accessibilityLabel: "Enter your farm area in acres",
    },
    {
      label: "Referral Code",
      key: "referralCode",
      accessibilityLabel: "Enter your referral code",
    },
    {
      label: "Land Revenue Survey No",
      key: "landRevenueSurveyNo",
      keyboardType: "numeric",
      accessibilityLabel: "Enter your land revenue survey number",
    },
  ];

  return (
    <View>
      <Image
        source={{ uri: "https://example.com/signup-illustration.png" }}
        style={styles.illustration}
        accessible={true}
        accessibilityLabel="Decorative sign-up illustration"
      />
      {signUpFields.map(({ label, key, accessibilityLabel, ...rest }) => (
        <FormField
          key={key}
          label={label}
          value={signUpData[key as keyof SignUpData]}
          onChangeText={(text) =>
            setSignUpData({ ...signUpData, [key as keyof SignUpData]: text })
          }
          accessibilityLabel={accessibilityLabel}
          {...rest}
        />
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={signUpUser}
        disabled={loading}
        accessible={true}
        accessibilityLabel={
          loading ? "Signing up, please wait" : "Sign up button"
        }
        accessibilityRole="button"
      >
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

interface SignInData {
  email: string;
  password: string;
}

interface SignInProps {
  signInData: SignInData;
  setSignInData: (data: SignInData) => void;
  signInUser: () => void;
  loading: boolean;
}

const SignIn: React.FC<SignInProps> = ({
  signInData,
  setSignInData,
  signInUser,
  loading,
}) => {
  const signInFields = [
    {
      label: "Email",
      key: "email",
      keyboardType: "email-address" as KeyboardTypeOptions,
      accessibilityLabel: "Enter your email address",
    },
    {
      label: "Password",
      key: "password",
      secureTextEntry: true,
      accessibilityLabel: "Enter your password",
    },
  ];

  return (
    <View>
      <Image
        source={{ uri: "https://example.com/signin-illustration.png" }}
        style={styles.illustration}
        accessible={true}
        accessibilityLabel="Decorative sign-in illustration"
      />
      {signInFields.map(({ label, key, accessibilityLabel, ...rest }) => (
        <FormField
          key={key}
          label={label}
          value={signInData[key as keyof SignInData]}
          onChangeText={(text) => setSignInData({ ...signInData, [key]: text })}
          accessibilityLabel={accessibilityLabel}
          {...rest}
        />
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={signInUser}
        disabled={loading}
        accessible={true}
        accessibilityLabel={
          loading ? "Signing in, please wait" : "Sign in button"
        }
        accessibilityRole="button"
      >
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
    soilType: "",
    farmArea: "",
    referralCode: "",
    landRevenueSurveyNo: "",
  });
  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const signUpUser = async () => {
    setLoading(true);
    const { phone, farmArea, landRevenueSurveyNo } = signUpData;

    if (phone.length === 0 || isNaN(parseInt(phone, 10))) {
      Alert.alert("Please enter a valid phone number.");
      console.log("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    if (isNaN(parseInt(farmArea, 10))) {
      Alert.alert("Please enter a valid farm area in numeric form.");
      console.log("Please enter a valid farm area in numeric form.");
      setLoading(false);
      return;
    }

    if (isNaN(parseInt(landRevenueSurveyNo, 10))) {
      Alert.alert("Please enter a valid land revenue survey number.");
      console.log("Please enter a valid land revenue survey number.");
      setLoading(false);
      return;
    }

    const inputs = {
      full_name: signUpData.fullName,
      phone: parseInt(phone, 10),
      address: signUpData.address,
      soil_type: signUpData.soilType,
      farm_area: parseInt(farmArea, 10),
      referral_code: signUpData.referralCode,
      land_revenue_survey_no: parseInt(landRevenueSurveyNo, 10),
      predictions_count: 0,
    };

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
      options: { data: inputs },
    });
    if (error) {
      Alert.alert("Error", error.message);
      console.error(error.message);
      setLoading(false);
      return;
    }
    console.log("Sign-Up Successful!");
    Alert.alert("Sign-Up Sucessful.");
    setLoading(false);
  };

  const signInUser = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(signInData);
    if (error) {
      Alert.alert(error.message);
      console.error(error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title} accessibilityRole="header">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </Text>
            {isSignUp ? (
              <SignUp
                signUpData={signUpData}
                setSignUpData={setSignUpData}
                signUpUser={signUpUser}
                loading={loading}
              />
            ) : (
              <SignIn
                signInData={signInData}
                setSignInData={setSignInData}
                signInUser={signInUser}
                loading={loading}
              />
            )}
            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsSignUp(!isSignUp)}
              accessible={true}
              accessibilityLabel={
                isSignUp ? "Switch to sign in" : "Switch to sign up"
              }
              accessibilityRole="button"
            >
              <Text style={styles.switchButtonText}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: width * 0.05,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.03,
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: height * 0.02,
  },
  fieldLabel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inputText: {
    color: "#333",
  },
  button: {
    marginTop: height * 0.03,
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: height * 0.03,
    alignItems: "center",
  },
  switchButtonText: {
    color: "#3b5998",
    fontSize: 16,
  },
  illustration: {
    width: "100%",
    height: height * 0.2,
    resizeMode: "contain",
    marginBottom: height * 0.03,
  },
});

export default Auth;
