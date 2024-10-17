import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
  useWindowDimensions,
} from "react-native";
import {
  TextInput,
  Button,
  ActivityIndicator,
  Surface,
  HelperText,
  useTheme,
} from "react-native-paper";

import { predictionResult } from "@/components/services/prediction";
import Toast from "react-native-toast-message";
import { Prediction } from "@/components/services/prediction";
import { Pest } from "@/components/services/describe";
import { supabase } from "@/utils/supabase";
import { useDataService } from "@/components/services/DataService";

const Explore = ({ navigation }: any) => {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const [inputs, setInputs] = useState<Prediction>({
    solar_radiation: 0,
    humidity: 0,
    conductivity: 0,
    phosphorus: 0,
    ph_value: 0,
    temperature: 0,
    nitrogen: 0,
    potassium: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { session, fetchProfile } = useDataService();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const prediction: Pest = await predictionResult(inputs);
      if (prediction) {
        console.log(prediction);
        if (session?.user.id && prediction.disease) {
          const { error } = await supabase.from("predictions").insert({
            user_id: session.user.id,
            disease: prediction.disease,
          });
          if (error) {
            console.error(error.message);
            Alert.alert("Database error", "Please try again later ...");
            return;
          }
        }
        await fetchProfile();
        navigation.navigate("output", { input: prediction });
      } else {
        Toast.show({
          text1: "No Prediction Received",
          text2: "Please check your input values and try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Prediction error:", error);
      Alert.alert(
        "Prediction Error",
        "An error occurred while fetching the prediction. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getGuideline = (key: keyof typeof inputs): string => {
    const guidelines: Record<string, string> = {
      solar_radiation: "Value in kWh/m², range: 0-1000",
      humidity: "Percentage, range: 0-100%",
      conductivity: "mS/cm, range: 0-10",
      phosphorus: "mg/L, range: 0-50",
      ph_value: "Value, range: 0-14",
      temperature: "Temperature in °C",
      nitrogen: "mg/L, range: 0-100",
      potassium: "mg/L, range: 0-100",
    };
    return guidelines[key] || "Please enter a valid value";
  };

  const hasErrors = (value: string): boolean => {
    return value === "";
  };

  const isSmallScreen = width < 600;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.formContainer}>
        <Surface
          style={[
            styles.surface,
            { width: isSmallScreen ? "100%" : "80%", maxWidth: 800 },
          ]}
        >
          <View style={styles.inputsContainer}>
            {Object.keys(inputs).map((key, index) => (
              <View
                key={key}
                style={[
                  styles.inputWrapper,
                  isSmallScreen ? styles.fullWidth : styles.halfWidth,
                ]}
              >
                <TextInput
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={inputs[key as keyof typeof inputs].toString()} // Ensure the value is a string
                  onChangeText={(text) => {
                    const numericValue = parseFloat(text); // Convert to number
                    setInputs({
                      ...inputs,
                      [key]: isNaN(numericValue) ? 0 : numericValue,
                    }); // Use 0 if conversion fails
                  }}
                  style={styles.input}
                  mode="outlined"
                  placeholder={getGuideline(key as keyof typeof inputs)}
                />
                <HelperText
                  type="info"
                  visible={true}
                  style={styles.helperText}
                >
                  {getGuideline(key as keyof typeof inputs)}
                </HelperText>
                <HelperText
                  type="error"
                  visible={hasErrors(
                    inputs[key as keyof typeof inputs].toString()
                  )}
                >
                  {inputs[key as keyof typeof inputs] === 0 &&
                    `Please provide a valid ${key}`}
                </HelperText>
              </View>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator animating={true} color="#fff" />
            ) : (
              "Predict"
            )}
          </Button>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  surface: {
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  inputsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  inputWrapper: {
    marginBottom: 15,
  },
  fullWidth: {
    width: "100%",
  },
  halfWidth: {
    width: "48%",
  },
  input: {
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
  },
  helperText: {
    fontSize: 12,
  },
});

export default Explore;
