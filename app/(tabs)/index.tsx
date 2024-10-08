import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <Icon name="grape" size={40} color="#8E44AD" /> */}
        <Text style={styles.title}>Grapeai</Text>
      </View>

      <Card style={styles.weatherCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Weather Data</Title>
          <View style={styles.weatherInfo}>
            <View style={styles.weatherItem}>
              <Icon name="thermometer" size={24} color="#E74C3C" />
              <Paragraph>25°C</Paragraph>
            </View>
            <View style={styles.weatherItem}>
              <Icon name="water-percent" size={24} color="#3498DB" />
              <Paragraph>60%</Paragraph>
            </View>
            <View style={styles.weatherItem}>
              <Icon name="weather-rainy" size={24} color="#2ECC71" />
              <Paragraph>Light Rain</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.predictionCard}>
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

      <Card style={styles.countCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Prediction Count</Title>
          <View style={styles.countInfo}>
            <Icon name="counter" size={36} color="#8E44AD" />
            <Text style={styles.countText}>15</Text>
          </View>
        </Card.Content>
      </Card>

      <Title style={styles.sectionTitle}>Latest Blogs</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3].map((blog) => (
          <Card key={blog} style={styles.blogCard}>
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
      </ScrollView>
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
    marginLeft: 15,
    color: '#2C3E50',
  },
  weatherCard: {
    margin: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 4,
  },
  predictionCard: {
    margin: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 4,
  },
  countCard: {
    margin: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 4,
  },
  blogCard: {
    width: width * 0.7,
    marginLeft: 15,
    marginBottom: 15,
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
});

export default HomeScreen;