import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { profile as SignUpData, supabase } from "@/utils/supabase";
import { Button, Input } from "@rneui/themed";
import { KeyboardTypeOptions } from "react-native";
// import { profile as SignUpData } from "@/components/supabase/schemas";

/**
 * Handle Sign-Up.
 */

type SignUpProps = {
  signUpData: SignUpData;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
  signUpUser: () => Promise<void>;
  loading: boolean;
};

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
      keyboardType: "email-address" as KeyboardTypeOptions,
    },
    { label: "Password", key: "password", secureTextEntry: true },
    { label: "Full Name", key: "fullName" },
    {
      label: "Phone Number",
      key: "phone",
      keyboardType: "numeric" as KeyboardTypeOptions,
    },
    { label: "Address", key: "address" },
    { label: "Soil Type", key: "soilType" },
    {
      label: "Farm Area (in acres)",
      key: "farmArea",
      keyboardType: "numeric" as KeyboardTypeOptions,
    },
    { label: "Referral Code", key: "referralCode" },
    {
      label: "Land Revenue Survey No",
      key: "landRevenueSurveyNo",
      keyboardType: "numeric" as KeyboardTypeOptions,
    },
  ];

  return (
    <>
      {signUpFields.map(({ label, key, secureTextEntry, keyboardType }) => (
        <View style={styles.verticallySpaced} key={key}>
          <Input
            label={label}
            labelStyle={styles.inputLabel}
            leftIcon={{
              type: "font-awesome",
              name:
                label === "Email"
                  ? "envelope"
                  : label === "Password"
                  ? "lock"
                  : label === "Full Name"
                  ? "user"
                  : label === "Phone Number"
                  ? "phone"
                  : label === "Address"
                  ? "home"
                  : label === "Soil Type"
                  ? "leaf"
                  : label === "Farm Area (in acres)"
                  ? "tree"
                  : label === "Referral Code"
                  ? "tag"
                  : "file-text",
            }}
            containerStyle={styles.inputContainer}
            onChangeText={(value) =>
              setSignUpData((prevData) => ({ ...prevData, [key]: value }))
            }
            value={signUpData[key as keyof SignUpData]}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholder={label}
            placeholderTextColor="#aaaaaa"
          />
        </View>
      ))}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign Up" disabled={loading} onPress={signUpUser} />
      </View>
    </>
  );
};

/**
 * Handle Sign-in
 */

type SignInData = {
  email: string;
  password: string;
};

type SignInProps = {
  signInData: SignInData;
  setSignInData: React.Dispatch<React.SetStateAction<SignInData>>;
  signInUser: () => Promise<void>;
  loading: boolean;
};

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
    },
    { label: "Password", key: "password", secureTextEntry: true },
  ];

  return (
    <>
      {signInFields.map(({ label, key, secureTextEntry, keyboardType }) => (
        <View style={styles.verticallySpaced} key={key}>
          <Input
            label={label}
            labelStyle={styles.inputLabel}
            leftIcon={{
              type: "font-awesome",
              name: label === "Email" ? "envelope" : "lock",
            }}
            containerStyle={styles.inputContainer}
            onChangeText={(value) =>
              setSignInData((prevData) => ({ ...prevData, [key]: value }))
            }
            value={signInData[key as keyof SignInData]}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholder={label}
            placeholderTextColor="#aaaaaa"
          />
        </View>
      ))}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign In" disabled={loading} onPress={signInUser} />
      </View>
    </>
  );
};

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: "user@example.com",
    password: "password123",
    fullName: "user",
    phone: "9999999999",
    address: "123 Main St",
    soilType: "Loamy",
    farmArea: "256",
    referralCode: "REF123",
    landRevenueSurveyNo: "12345",
  });
  const [signInData, setSignInData] = useState<SignInData>({
    email: "user@example.com",
    password: "password123",
  });
  const [loading, setLoading] = useState(false);

  const signUpUser = async () => {
    setLoading(true);
    const { phone, farmArea, landRevenueSurveyNo } = signUpData;

    // Validations
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

    const { error } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
      options: { data: inputs },
    });

    setLoading(false);
    if (error) {
      Alert.alert(error.message);
      console.log(error.message);
      return;
    }

    Alert.alert("Sign-up Successful");
    console.log("Sign-up Successful");
  };

  const signInUser = async () => {
    setLoading(true);
    const { email, password } = signInData;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      Alert.alert(error.message);
      console.log(error.message);
      return;
    }

    Alert.alert("Sign-in Successful");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        bounces={false}
      >
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
        <View style={[styles.verticallySpaced]}>
          <Button
            title={
              isSignUp
                ? "Already have Account. Sign IN"
                : "Dont have an account. Sign-Up"
            }
            onPress={() => setIsSignUp(!isSignUp)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    width: "100%",
  },
  verticallySpaced: {
    paddingVertical: 12,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  inputLabel: {
    color: "#333333",
    fontWeight: "bold",
  },
});

export default Auth;
