import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, IconButton, Button, ProgressBar, List, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const HomeScreen: React.FC = ({ navigation }: any) => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  

  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Prune vines', completed: false },
    { id: 2, title: 'Check irrigation system', completed: true },
    { id: 3, title: 'Apply fertilizer', completed: false },
  ]);
  const [vineyardHealth, setVineyardHealth] = useState(85);
  const [tipOfTheDay, setTipOfTheDay] = useState('Ensure proper air circulation in your vineyard to prevent fungal diseases.');

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=12.9716%2C77.5946', {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': '40cbab513cmsh46958b8a01b3411p1a61cejsn669ff1c5435a',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1, // Ensure the container covers the full page
    },
    cardContainer: {
      flexDirection: isLargeScreen ? 'row' : 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      borderRadius: 15,
      elevation: 4,
      padding: 10,
      width: isLargeScreen ? '48%' : '100%',
      marginBottom: 15,
    },
    blogCard: {
      borderRadius: 15,
      elevation: 4,
      padding: 10,
      width: isLargeScreen ? '28%' : '80%', // Adjust width for carousel effect
    },
  });

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <LinearGradient
        colors={['#F0E6FA', '#FFFFFF']}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <Text style={styles.title}>GrapeAI</Text>
        </View>

        <Card style={[dynamicStyles.card, styles.grapeaiCard]}>
          <ImageBackground
            source={{ uri: 'https://picsum.photos/seed/grapes/400/200' }}
            style={styles.cardBackground}
          >
            <Card.Content style={styles.cardContent}>
              <Title style={styles.cardTitle}>Welcome to GrapeAI</Title>
              <Paragraph style={styles.grapeaiInfo}>
                Your intelligent assistant for grape cultivation. Get accurate predictions
                and insights to optimize your vineyard management.
              </Paragraph>
              <Button 
                mode="contained" 
                onPress={ () => navigation.navigate('Prediction')}
                style={styles.predictButton}
                icon="camera"
              >
                Start Prediction
              </Button>
            </Card.Content>
          </ImageBackground>
        </Card>

        <View style={dynamicStyles.cardContainer}>
          <Card style={[dynamicStyles.card, styles.weatherCard]}>
            <Card.Content>
              <Title style={styles.cardTitle}>Weather Data</Title>
              <View style={styles.weatherInfo}>
                {loading ? (
                  <Paragraph>Loading...</Paragraph>
                ) : error ? (
                  <Paragraph>Error: {error}</Paragraph>
                ) : (
                  <>
                    <View style={styles.weatherItem}>
                      <Icon name="thermometer" size={24} color="#E74C3C" />
                      <Paragraph>{weatherData.current.temp_c}°C</Paragraph>
                    </View>
                    <View style={styles.weatherItem}>
                      <Icon name="water-percent" size={24} color="#3498DB" />
                      <Paragraph>{weatherData.current.humidity}%</Paragraph>
                    </View>
                    <View style={styles.weatherItem}>
                      <Icon name="weather-rainy" size={24} color="#2ECC71" />
                      <Paragraph>{weatherData.current.condition.text}</Paragraph>
                    </View>
                  </>
                )}
              </View>
            </Card.Content>
          </Card>

          <Card style={[dynamicStyles.card, styles.predictionCard]}>
            <Card.Content>
              <Title style={styles.cardTitle}>Previous Prediction</Title>
              <View style={styles.predictionInfo}>
                <Icon name="bug" size={24} color="#D35400" />
                <View style={styles.predictionText}>
                  <Paragraph style={styles.diseaseName}>Powdery Mildew</Paragraph>
                  <Paragraph style={styles.timestamp}>2 hours ago</Paragraph>
                </View>
              </View>
              <ProgressBar progress={0.7} color="#8E44AD" style={styles.progressBar} />
              <Paragraph style={styles.progressText}>70% Confidence</Paragraph>
            </Card.Content>
          </Card>
        </View>

        <Card style={[dynamicStyles.card, styles.taskCard]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Today's Tasks</Title>
            <List.Section>
              {tasks.map(task => (
                <List.Item
                  key={task.id}
                  title={task.title}
                  left={() => (
                    <TouchableOpacity onPress={() => toggleTask(task.id)}>
                      <Icon
                        name={task.completed ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                        size={24}
                        color={task.completed ? '#2ECC71' : '#BDC3C7'}
                      />
                    </TouchableOpacity>
                  )}
                  titleStyle={task.completed ? styles.completedTask : {}}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>

        <View style={dynamicStyles.cardContainer}>
          <Card style={[dynamicStyles.card, styles.healthCard]}>
            <Card.Content>
              <Title style={styles.cardTitle}>Vineyard Health</Title>
              <View style={styles.healthMeter}>
                <AnimatedCircularProgress
                  size={120}
                  width={15}
                  fill={vineyardHealth}
                  tintColor="#2ECC71"
                  backgroundColor="#F0E6FA"
                >
                  {(fill) => (
                    <Text style={styles.healthText}>
                      {Math.round(fill)}%
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
              <Paragraph style={styles.healthStatus}>
                Your vineyard is in good condition!
              </Paragraph>
            </Card.Content>
          </Card>

          <Card style={[dynamicStyles.card, styles.tipCard]}>
            <Card.Content>
              <Title style={styles.cardTitle}>Tip of the Day</Title>
              <View style={styles.tipContent}>
                <Icon name="lightbulb-on" size={40} color="#F1C40F" />
                <Paragraph style={styles.tipText}>{tipOfTheDay}</Paragraph>
              </View>
            </Card.Content>
          </Card>
        </View>


      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8E44AD',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#2C3E50',
    textAlign: 'center',
  },
  card: {
    borderRadius: 15,
    elevation: 4,
    padding: 10,
  },
  cardBackground: {
    overflow: 'hidden',
    borderRadius: 15,
  },
  cardContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
  },
  cardTitle: {
    color: '#2C3E50',
    fontWeight: 'bold',
    fontSize: 20,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  weatherItem: {
    alignItems: 'center',
  },
  predictionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  predictionText: {
    marginLeft: 10,
  },
  diseaseName: {
    fontWeight: 'bold',
    color: '#D35400',
  },
  timestamp: {
    color: '#7F8C8D',
  },
  grapeaiCard: {
    marginBottom: 20,
    overflow: 'hidden',
  },
  grapeaiInfo: {
    marginVertical: 10,
    lineHeight: 20,
    color: '#2C3E50',
  },
  predictButton: {
    marginTop: 10,
    backgroundColor: '#8E44AD',
  },
  weatherCard: {
    backgroundColor: '#E8F6F3',
  },
  predictionCard: {
    backgroundColor: '#FCF3CF',
  },
  taskCard: {
    backgroundColor: '#F0E6FA',
    marginBottom: 15,
  },
  healthCard: {
    backgroundColor: '#E8F6F3',
  },
  tipCard: {
    backgroundColor: '#FCF3CF',
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
  },
  progressBar: {
    marginTop: 10,
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 5,
    color: '#8E44AD',
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  insightPreview: {
    color: '#7F8C8D',
    marginTop: 5,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#7F8C8D',
  },
  healthMeter: {
    alignItems: 'center',
    marginVertical: 15,
  },
  healthText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ECC71',
  },
  healthStatus: {
    textAlign: 'center',
    marginTop: 10,
    color: '#2C3E50',
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    color: '#2C3E50',
  },
});

export default HomeScreen;