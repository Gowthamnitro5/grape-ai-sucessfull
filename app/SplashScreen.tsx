import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { NavigationProp } from "@react-navigation/native";

// Get screen dimensions and set responsive values
const { width, height } = Dimensions.get("window");
const logoSize = Math.min(width * 0.25, height * 0.15);
const minLogoSize = 80;
const finalLogoSize = Math.max(logoSize, minLogoSize);

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("auth");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* School Section with Orange Styling */}
        <Animatable.View
          animation="fadeIn"
          delay={500}
          duration={1500}
          style={styles.schoolContainer}
        >
          <View style={styles.textWrapper}>
            <Text style={styles.schoolText}>School Of EEE</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.collegeText}>REVA University</Text>
          </View>
        </Animatable.View>

        {/* Center Logos (Side by side) */}
        <Animatable.View
          animation="zoomIn"
          duration={1500}
          style={styles.centerLogosContainer}
        >
          <View style={styles.logosRow}>
            <Image
              source={require("@/assets/images/nrdc.png")}
              style={[styles.logo]}
              resizeMode="contain"
            />
            <Image
              source={require("@/assets/images/revauniversity.png")}
              style={[styles.logo]}
              resizeMode="contain"
            />
          </View>
        </Animatable.View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Powered By Section */}
        <Animatable.View
          animation="fadeIn"
          delay={500}
          duration={1500}
          style={styles.poweredByContainer}
        >
          <Text style={styles.poweredByText}>Powered By</Text>
          <Text style={styles.companyText}>ATOMS 360</Text>
        </Animatable.View>

        {/* Footer Text */}
        <Animatable.View
          animation="fadeInUp"
          delay={1000}
          duration={1500}
          style={styles.footerTextContainer}
        >
          <Text style={styles.footerText}>© All copyright's reserved</Text>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.05,
  },
  schoolContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: height * 0.04,
  },
  textWrapper: {
    width: "100%",
    alignItems: "center",
    marginVertical: 2,
  },
  schoolText: {
    fontSize: Math.min(width * 0.055, 28),
    fontWeight: "bold",
    color: "#F48329",
    textAlign: "center",
    includeFontPadding: false,
    padding: 2,
  },
  collegeText: {
    fontSize: Math.min(width * 0.055, 28),
    fontWeight: "bold",
    color: "#F48329",
    textAlign: "center",
    includeFontPadding: false,
    padding: 2,
  },
  centerLogosContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  logosRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: width * 0.05,
  },
  logo: {
    width: finalLogoSize,
    height: finalLogoSize,
  },
  bottomSection: {
    paddingBottom: height * 0.05,
    alignItems: "center",
  },
  poweredByContainer: {
    alignItems: "center",
    marginBottom: height * 0.02,
    paddingHorizontal: 20,
  },
  poweredByText: {
    fontSize: Math.min(width * 0.045, 24),
    color: "#000000",
    marginBottom: height * 0.01,
    includeFontPadding: false,
  },
  companyText: {
    fontSize: Math.min(width * 0.055, 28),
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    includeFontPadding: false,
  },
  footerTextContainer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: Math.min(width * 0.03, 16),
    color: "#000000",
    includeFontPadding: false,
  },
});

export default SplashScreen;
