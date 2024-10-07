import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grapeai</Text>

      <Text style={styles.sectionTitle}>Weather Data</Text>
      <Card style={styles.card}>
        <Text>Temperature</Text>
        <Text>Humidity</Text>
        <Text>Rainfall Condition</Text>
      </Card>

      <Text style={styles.sectionTitle}>Previous Prediction</Text>
      <Card style={styles.card}>
        <Text>Disease Name</Text>
        <Text>Timestamp</Text>
      </Card>

      <Text style={styles.sectionTitle}>Prediction Count</Text>
      <Card style={styles.card}>
        <Text>Count: 0</Text>
      </Card>

      <Text style={styles.sectionTitle}>Blogs</Text>
      <View style={styles.blogsContainer}>
        <Card style={styles.blogCard}>
          <Text>Blog 1</Text>
        </Card>
        <Card style={styles.blogCard}>
          <Text>Blog 2</Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  card: {
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  blogsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blogCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;