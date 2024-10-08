import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Card, Title, Paragraph, IconButton, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const navigation = useNavigation();

  // State to hold weather data
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleNavigateToExplore = () => {
    navigation.navigate('Explore' as never);
  };

  // Fetch weather data on component mount
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13', {
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
        setError((err as Error).message); // Type assertion to Error
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const dynamicStyles = StyleSheet.create({
    container: {
      padding: isLargeScreen ? 20 : 10,
    },
    cardContainer: {
      flexDirection: isLargeScreen ? 'row' : 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: isLargeScreen ? '31%' : '100%',
      marginBottom: 15,
    },
    blogCardContainer: {
      flexDirection: isLargeScreen ? 'row' : 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    blogCard: {
      width: isLargeScreen ? '31%' : '100%',
      marginBottom: 15,
    },
  });

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Grapeai</Text>
      </View>

      <View style={dynamicStyles.cardContainer}>
        <Card style={[styles.card, dynamicStyles.card]}>
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

        <Card style={[styles.card, dynamicStyles.card]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Previous Prediction</Title>
            <View style={styles.predictionInfo}>
              <Icon name="bug" size={24} color="#D35400" />
              <View style={styles.predictionText}>
                <Paragraph style={styles.diseaseName}>Powdery Mildew</Paragraph>
                <Paragraph style={styles.timestamp}>2 hours ago</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, dynamicStyles.card]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Prediction Count</Title>
            <View style={styles.countInfo}>
              <Icon name="counter" size={36} color="#8E44AD" />
              <Text style={styles.countText}>15</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      <Card style={[styles.card, dynamicStyles.card, styles.grapeaiCard]}>
        <Card.Content>
          <Title style={styles.cardTitle}>Welcome to GrapeAI</Title>
          <Paragraph style={styles.grapeaiInfo}>
            GrapeAI is your intelligent assistant for grape cultivation. Get accurate predictions
            and insights to optimize your vineyard management.
          </Paragraph>
          <Button 
            mode="contained" 
            onPress={handleNavigateToExplore}
            style={styles.predictButton}
          >
            Start Prediction
          </Button>
        </Card.Content>
      </Card>

      <Title style={styles.sectionTitle}>Latest Blogs</Title>
      <View style={dynamicStyles.blogCardContainer}>
        {[1, 2, 3].map((blog) => (
          <Card key={blog} style={[styles.card, dynamicStyles.blogCard]}>
            <Card.Cover source={{ uri: `https://picsum.photos/300/200?random=${blog}` }} />
            <Card.Content>
              <Title>Blog {blog}</Title>
              <Paragraph numberOfLines={2}>
                This is a short preview of the blog post content. Click to read more...
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="arrow-right" onPress={() => {}} />
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#2C3E50',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 4,
  },
  cardTitle: {
    color: '#2C3E50',
    fontWeight: 'bold',
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
  countInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  countText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginLeft: 10,
  },
  grapeaiCard: {
    marginBottom: 20,
    backgroundColor: '#F0E6FA',
  },
  grapeaiInfo: {
    marginVertical: 10,
    lineHeight: 20,
  },
  predictButton: {
    marginTop: 10,
    backgroundColor: '#8E44AD',
  },
});

export default HomeScreen;