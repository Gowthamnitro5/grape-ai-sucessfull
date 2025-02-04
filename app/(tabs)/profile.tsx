import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  useWindowDimensions,
} from "react-native";
import { Text, Card, TextInput, Button, useTheme } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDataService } from "@/components/services/DataService";
import { supabase } from "@/utils/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Profile = ({ navigation }: any) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localProfile, setLocalProfile] = useState<any>(null);
  const { width } = useWindowDimensions();
  const { userProfile, location, session, fetchProfile } = useDataService();

  useEffect(() => {
    if (userProfile) {
      setLocalProfile(userProfile);
    }
  }, [userProfile]);

  const handleInputChange = (key: string, value: string) => {
    setLocalProfile((prevProfile: any) => ({
      ...prevProfile,
      [key]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      setLocalProfile(userProfile); // Set local state when entering edit mode
    }
  };

  const handleSave = async () => {
    if (!session?.user.id && !localProfile) return;
    try {
      if (
        localProfile.soilType === "" ||
        localProfile.farmArea === "" ||
        localProfile.landRevenueSurveyNo == ""
      ) {
        Alert.alert("Please fill all the details.");
        return;
      }
      const { error } = await supabase
        .from("profiles")
        .update({
          soil_type: localProfile.soilType,
          farm_area: localProfile.farmArea,
          // referral_code: localProfile.referralCode,
          land_revenue_survey_no: localProfile.landRevenueSurveyNo,
        })
        .eq("id", session?.user.id);

      if (error) {
        console.error(error);
        throw Error(error.message);
      }
    } catch (error) {
      Alert.alert("Database error.");
      return;
    }
    await fetchProfile();
    Alert.alert("Profile updated successfully");
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(`Error : ${error}`);
        Alert.alert("Error", `${error.message}`);
      } else {
        Alert.alert("Logout", "You have been logged out successfully.");
        navigation.navigate("auth");
      }
    } catch (error) {
      Alert.alert("Error", `An unexpected error occurred: ${error}`);
      console.error("Logout Error: ", error);
    }
  };

  const handleReferralSubmit = async () => {
    if (!session?.user.id && !localProfile) return;
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          referral_code: localProfile.referralCode,
        })
        .eq("id", session?.user.id);

      if (error) {
        console.error(error);
        throw Error(error.message);
      }
    } catch (error) {
      Alert.alert("Error in the server ...");
      return;
    }
    await fetchProfile();
    Alert.alert(
      "Referral Code",
      `Referral code ${localProfile?.referralCode} submitted.`
    );
  };

  const isSmallScreen = width < 600;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("@/assets/images/grappy.jpg")}
        style={[styles.image, { height: isSmallScreen ? 150 : 200 }]}
      />
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{userProfile?.name}</Text>
          <Text style={styles.detail}>Email: {userProfile?.email}</Text>
          {userProfile?.phone && (
            <Text style={styles.detail}>Phone: {userProfile?.phone}</Text>
          )}
          {userProfile?.address && (
            <Text style={styles.detail}>Address: {userProfile?.address}</Text>
          )}
          <Text style={styles.detail}>
            Predictions Count: {userProfile?.predictionsCount}
          </Text>

          {isEditing ? (
            <>
              <Picker
                selectedValue={localProfile?.soilType}
                onValueChange={(itemValue) =>
                  handleInputChange("soilType", itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Select Soil Type" value="" />
                <Picker.Item label="Alluvial" value="Alluvial" />
                <Picker.Item label="Black" value="Black" />
                <Picker.Item label="Red" value="Red" />
                <Picker.Item label="Laterite" value="Laterite" />
                <Picker.Item label="Saline" value="Saline" />
                <Picker.Item label="Sandy" value="Sandy" />
                <Picker.Item label="Clay" value="Clay" />
                <Picker.Item label="Loamy" value="Loamy" />
                <Picker.Item label="Peaty" value="Peaty" />
              </Picker>
              <TextInput
                label="Area of Farm (in acres)"
                value={
                  localProfile?.farmArea?.toString() ??
                  userProfile?.farmArea?.toString() ??
                  ""
                } // Ensure it's a string
                onChangeText={(text) => handleInputChange("farmArea", text)}
                style={styles.input}
                keyboardType="numeric"
              />
              <TextInput
                label="Land Revenue Survey No"
                value={
                  localProfile?.landRevenueSurveyNo ??
                  userProfile?.landRevenueSurveyNo ??
                  ""
                }
                onChangeText={(text) =>
                  handleInputChange("landRevenueSurveyNo", text)
                }
                style={styles.input}
              />
              <View style={styles.row}>
                <TextInput
                  label="GPS Latitude"
                  value={localProfile?.latitude?.toString() ?? ""} // Ensure it's a string
                  onChangeText={(text) => handleInputChange("latitude", text)}
                  style={[styles.input, styles.halfWidth]}
                  keyboardType="numeric"
                />
                <TextInput
                  label="GPS Longitude"
                  value={localProfile?.longitude?.toString() ?? ""} // Ensure it's a string
                  onChangeText={(text) => handleInputChange("longitude", text)}
                  style={[styles.input, styles.halfWidth]}
                  keyboardType="numeric"
                />
              </View>
              <TextInput
                label="Referral Code"
                value={
                  localProfile?.referralCode ?? userProfile?.referralCode ?? ""
                }
                onChangeText={(text) => handleInputChange("referralCode", text)}
                style={styles.input}
              />
              <Button
                mode="contained"
                onPress={handleReferralSubmit}
                style={styles.button}
              >
                Submit Referral
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.button}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Text style={styles.detail}>
                Soil Type: {userProfile?.soilType || "Not provided"}
              </Text>
              <Text style={styles.detail}>
                Farm Area: {userProfile?.farmArea || "Not provided"} acres
              </Text>
              <Text style={styles.detail}>
                Land Revenue Survey No:{" "}
                {userProfile?.landRevenueSurveyNo || "Not provided"}
              </Text>
              <Text style={styles.detail}>
                GPS Location:{" "}
                {location?.latitude && location?.longitude
                  ? `${location.latitude}, ${location.longitude}`
                  : "Not provided"}
              </Text>
              <Button
                mode="outlined"
                onPress={handleEditToggle}
                style={styles.button}
              >
                Edit
              </Button>
            </>
          )}
          <Button mode="outlined" onPress={handleLogout} style={styles.button}>
            Logout
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  card: {
    margin: 16,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
});

export default Profile;
