import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert, View, useWindowDimensions } from 'react-native';
import { TextInput, Button, ActivityIndicator, Surface, HelperText, useTheme } from 'react-native-paper';

import { NavigationProp } from '@react-navigation/native';
import { getPrediction } from "@/components/services/predictionService";
import Toast from 'react-native-toast-message';

interface InputScreenProps {
  navigation: NavigationProp<any>;
}

const Explore: React.FC<InputScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const [inputs, setInputs] = useState<{
    solarRadiation: string;
    humidity: string;
    conductivity: string;
    phosphorous: string;
    pHValue: string;
    temperature: string;
    nitrogen: string;
    potassium: string;
  }>({
    solarRadiation: '',
    humidity: '',
    conductivity: '',
    phosphorous: '',
    pHValue: '',
    temperature: '',
    nitrogen: '',
    potassium: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const prediction = await getPrediction(inputs);
      if (prediction) {
        navigation.navigate('outputScreen', { prediction });
      } else {
        Toast.show({
          text1: 'No Prediction Received',
          text2: 'Please check your input values and try again.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Prediction error:', error);
      Alert.alert('Prediction Error', 'An error occurred while fetching the prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getGuideline = (key: keyof typeof inputs): string => {
    const guidelines: Record<string, string> = {
      solarRadiation: 'Value in kWh/m², range: 0-1000',
      humidity: 'Percentage, range: 0-100%',
      conductivity: 'mS/cm, range: 0-10',
      phosphorous: 'mg/L, range: 0-50',
      pHValue: 'Value, range: 0-14',
      temperature: 'Temperature in °C',
      nitrogen: 'mg/L, range: 0-100',
      potassium: 'mg/L, range: 0-100',
    };
    return guidelines[key] || 'Please enter a valid value';
  };

  const hasErrors = (value: string): boolean => {
    return value === '';
  };

  const isSmallScreen = width < 600;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.formContainer}>
        <Surface style={[styles.surface, { width: isSmallScreen ? '100%' : '80%', maxWidth: 800 }]}>
          <View style={styles.inputsContainer}>
            {Object.keys(inputs).map((key, index) => (
              <View 
                key={key} 
                style={[styles.inputWrapper, isSmallScreen ? styles.fullWidth : styles.halfWidth]}
              >
                <TextInput
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={inputs[key as keyof typeof inputs]}
                  onChangeText={(text) => setInputs({ ...inputs, [key]: text })}
                  style={styles.input}
                  mode="outlined"
                  placeholder={getGuideline(key as keyof typeof inputs)}
                />
                <HelperText type="info" visible={true} style={styles.helperText}>
                  {getGuideline(key as keyof typeof inputs)}
                </HelperText>
                <HelperText type="error" visible={hasErrors(inputs[key as keyof typeof inputs])}>
                  {inputs[key as keyof typeof inputs] === '' && `Please provide a valid ${key}`}
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
            {loading ? <ActivityIndicator animating={true} color="#fff" /> : 'Predict'}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  surface: {
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  inputsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    width: '48%',
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