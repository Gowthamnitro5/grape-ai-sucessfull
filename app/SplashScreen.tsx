import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const logoSize = width * 0.8; // Adjust the multiplier as needed

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('auth');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* School Section with Orange Styling */}
        <Animatable.View animation="fadeIn" delay={500} duration={1500} style={styles.schoolContainer}>
          <Text style={styles.schoolText}>School Of EEE</Text>
          <Text style={styles.collegeText}>REVA University</Text>
        </Animatable.View>

        {/* Center Logos (Government and other logo) */}
        <Animatable.View animation="zoomIn" duration={1500} style={styles.centerLogosContainer}>
          <View style={styles.logosColumn}>
            <Image
              source={require('@/assets/images/nrdc.png')}
              style={[styles.logo, { width: logoSize, height: logoSize }]}
              resizeMode="contain"
            />
            <Image
              source={require('@/assets/images/revauniversity.png')}
              style={[styles.logo, { width: logoSize, height: logoSize }]}
              resizeMode="contain"
            />
          </View>
        </Animatable.View>



      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Powered By Section */}
        <Animatable.View animation="fadeIn" delay={500} duration={1500} style={styles.poweredByContainer}>
          <Text style={styles.poweredByText}>Powered By</Text>
          <Text style={styles.companyText}>ATOMS 360</Text>
        </Animatable.View>

        {/* Footer Text */}
        <Animatable.View animation="fadeInUp" delay={1000} duration={1500} style={styles.footerTextContainer}>
          <Text style={styles.footerText}>© All copyright's reserved</Text>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  schoolContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  schoolText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F48329',
    marginBottom: 5,
  },
  collegeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F48329',
  },
  centerLogosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logosColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginVertical: -90, // Negative margin to minimize vertical space
    padding: 0,
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  poweredByContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  poweredByText: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 5,
  },
  companyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  footerTextContainer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#000000',
  },
});



export default SplashScreen;
