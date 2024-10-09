import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Paragraph, Card, Surface, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  OutputScreen: { prediction: { disease: string; pestAttacks: Record<string, string> } };
};

type OutputScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OutputScreen'>;
type OutputScreenRouteProp = RouteProp<RootStackParamList, 'OutputScreen'>;

type Props = {
  navigation: OutputScreenNavigationProp;
  route: OutputScreenRouteProp;
};

const OutputScreen = ({ route, navigation }:any) => {
  const { prediction } = route.params; // Ensure prediction is received

  // Use the received prediction data instead of dummy data
  const predictions = prediction; // Use the prediction passed from explore.tsx

  const handleBackToHome = () => {
    navigation.navigate('Home'); // Navigates to the Home screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View animation="fadeInUp" duration={1000}>
        <Surface style={styles.surface}>
          <Title style={styles.title}>Prediction Results</Title>

          <Animatable.View animation="fadeIn" delay={300}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>Predicted Disease</Title>
                <Paragraph>{predictions.disease}</Paragraph>
              </Card.Content>
            </Card>
          </Animatable.View>

          <Animatable.View animation="fadeIn" delay={600}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>Pest Attack Probabilities</Title>
                {Object.entries(predictions.pestAttacks).map(([pest, probability], index) => (
                  <Animatable.View key={pest} animation="fadeInLeft" delay={index * 100}>
                    <Paragraph>{pest}: {(parseFloat(probability as string) * 100).toFixed(2)}%</Paragraph> {/* Convert to percentage */}
                  </Animatable.View>
                ))}
              </Card.Content>
            </Card>
          </Animatable.View>

          {/* Add Back to Home button */}
          <Animatable.View animation="fadeIn" delay={900}>
            <Button
              mode="contained"
              onPress={handleBackToHome}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Back to Home
            </Button>
          </Animatable.View>
        </Surface>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F6F7',
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#8E44AD',
  },
  card: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#8E44AD',
    borderRadius: 10,
  },
  buttonLabel: {
    color: '#FFF',
  },
});

export default OutputScreen;
