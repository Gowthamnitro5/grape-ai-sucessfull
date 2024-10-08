import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface SplashScreenProps {
  navigation: NavigationProp<any>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home'); // Ensure this matches your navigation structure
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#F0E6FA', '#FFFFFF']}
      style={styles.container}
    >
      <Animatable.View animation="fadeIn" duration={1500} style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/grapeai.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animatable.Text animation="fadeIn" delay={500} style={styles.title}>
          GrapeAI
        </Animatable.Text>
      </Animatable.View>

      <Animatable.View animation="fadeIn" delay={1000} duration={1500} style={styles.taglineContainer}>
        <Text style={styles.tagline}>Your intelligent assistant for grape cultivation</Text>
      </Animatable.View>

      <Animatable.View animation="fadeIn" delay={1500} duration={1500} style={styles.partnersContainer}>
        <Image
          source={require('@/assets/images/govt-logo.png')}
          style={styles.partnerLogo}
          resizeMode="contain"
        />
        <Image
          source={require('@/assets/images/revauniversity.png')}
          style={styles.partnerLogo}
          resizeMode="contain"
        />
      </Animatable.View>

      <Animatable.View animation="fadeIn" delay={2000} duration={1500} style={styles.footerContainer}>
        <Text style={styles.poweredByText}>Powered By</Text>
        <Text style={styles.companyText}>ATOMS 360</Text>
        <Text style={styles.schoolText}>School Of EEE</Text>
        <Text style={styles.collegeText}>REVA University</Text>
      </Animatable.View>

      <Animatable.Text animation="fadeIn" delay={2500} duration={1500} style={styles.copyrightText}>
        All rights reserved
      </Animatable.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  taglineContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
  },
  partnersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  partnerLogo: {
    width: 100,
    height: 100,
  },
  footerContainer: {
    alignItems: 'center',
  },
  poweredByText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  companyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 5,
  },
  schoolText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F48329',
    marginTop: 10,
  },
  collegeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F48329',
  },
  copyrightText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
});

export default SplashScreen;