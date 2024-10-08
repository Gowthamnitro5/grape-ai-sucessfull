// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
// import { Card, Title, Paragraph, Button, ActivityIndicator, useTheme, Searchbar } from 'react-native-paper';
// import * as Animatable from 'react-native-animatable';
// import { NavigationProp } from '@react-navigation/native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// // Assume these functions are implemented in a separate file
// import { fetchHistory, downloadReport } from '@/components/services/predictionService';

// interface HistoryItem {
//   id: string;
//   date: string;
//   prediction: string;
//   details: string;
// }

// interface HistoryScreenProps {
//   navigation: NavigationProp<any>;
// }

// const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
//   const [history, setHistory] = useState<HistoryItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const { width } = useWindowDimensions();
//   const theme = useTheme();

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   const loadHistory = async () => {
//     try {
//       const data = await fetchHistory();
//       setHistory(data);
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (id: string) => {
//     try {
//       await downloadReport(id);
//       // Show success message
//     } catch (error) {
//       console.error('Error downloading report:', error);
//       // Show error message
//     }
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     // Implement search logic here
//   };

//   const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
//     <Animatable.View animation="fadeIn" duration={500}>
//       <Card style={styles.card}>
//         <Card.Content>
//           <Title>{item.date}</Title>
//           <Paragraph>Prediction: {item.prediction}</Paragraph>
//           <Paragraph numberOfLines={2}>{item.details}</Paragraph>
//         </Card.Content>
//         <Card.Actions>
//           <Button onPress={() => navigation.navigate('PredictionDetails', { id: item.id })}>
//             View Details
//           </Button>
//           <Button onPress={() => handleDownload(item.id)}>
//             <MaterialCommunityIcons name="download" size={18} color={theme.colors.primary} />
//             Download
//           </Button>
//         </Card.Actions>
//       </Card>
//     </Animatable.View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <Searchbar
//         placeholder="Search history"
//         onChangeText={handleSearch}
//         value={searchQuery}
//         style={styles.searchBar}
//       />
//       <FlatList
//         data={history}
//         renderItem={renderHistoryItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//         numColumns={width > 600 ? 2 : 1}
//         key={width > 600 ? 'two-column' : 'one-column'}
//       />
//       <TouchableOpacity
//         style={[styles.fab, { backgroundColor: theme.colors.primary }]}
//         onPress={() => navigation.navigate('Explore')}
//       >
//         <MaterialCommunityIcons name="plus" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchBar: {
//     marginBottom: 16,
//   },
//   listContainer: {
//     paddingBottom: 80, // To account for FAB
//   },
//   card: {
//     marginBottom: 16,
//     marginHorizontal: 8,
//     flex: 1,
//   },
//   fab: {
//     position: 'absolute',
//     margin: 16,
//     right: 0,
//     bottom: 0,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//   },
// });

// export default HistoryScreen;
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, useWindowDimensions, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, IconButton, useTheme, Searchbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { NavigationProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HistoryItem {
  id: string;
  date: string;
  time: string;
  prediction: string;
  details: string;
}

interface HistoryScreenProps {
  navigation: NavigationProp<any>;
}

const dummyData: HistoryItem[] = [
  { id: '1', date: '2023-05-01', time: '09:30 AM', prediction: 'Healthy', details: 'No signs of disease detected.' },
  { id: '2', date: '2023-05-05', time: '02:15 PM', prediction: 'Powdery Mildew', details: 'Early signs of powdery mildew detected on leaves.' },
  { id: '3', date: '2023-05-10', time: '11:45 AM', prediction: 'Healthy', details: 'Plant recovered after treatment.' },
  { id: '4', date: '2023-05-15', time: '04:00 PM', prediction: 'Botrytis', details: 'Minor signs of botrytis on some grape clusters.' },
  { id: '5', date: '2023-05-20', time: '10:20 AM', prediction: 'Healthy', details: 'No signs of disease after recent treatment.' },
  { id: '6', date: '2023-05-25', time: '03:30 PM', prediction: 'Downy Mildew', details: 'Early stages of downy mildew detected.' },
];

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here if needed
  };

  const handleDownload = (id: string) => {
    // Implement download logic here
    console.log(`Downloading report for id: ${id}`);
  };

  const getColumnCount = (screenWidth: number) => {
    if (screenWidth >= 768) return 3; // Tablet or larger
    if (screenWidth >= 480) return 2; // Large phones
    return 1; // Small phones
  };

  const columnCount = getColumnCount(width);

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <Animatable.View animation="fadeIn" duration={500} style={[styles.gridItem, { width: `${100 / columnCount}%` }]}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View>
              <Title style={styles.cardTitle}>{item.date}</Title>
              <Paragraph style={styles.cardTime}>{item.time}</Paragraph>
            </View>
            <IconButton
              icon="download"
              size={20}
              onPress={() => handleDownload(item.id)}
            />
          </View>
          <Paragraph style={styles.cardPrediction}>Prediction: {item.prediction}</Paragraph>
          <Paragraph numberOfLines={2} style={styles.cardDetails}>{item.details}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigation.navigate('PredictionDetails', { id: item.id })}
          >
            <MaterialCommunityIcons name="eye" size={18} color={theme.colors.primary} />
            <Paragraph style={styles.viewButtonText}>View Details</Paragraph>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.plumSurround}>
        <Searchbar
          placeholder="Search history"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <FlatList
        data={dummyData}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={columnCount}
        key={`column-${columnCount}`}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('Explore')}
      >
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plumSurround: {
    backgroundColor: '#8E4585', // Plum color
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  searchBar: {
    marginBottom: 8,
    height: 40,
    paddingVertical: 0,
  },
  listContainer: {
    padding: 8,
    paddingBottom: 80, // To account for FAB
  },
  gridItem: {
    padding: 4,
  },
  card: {
    height: 180,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardTime: {
    fontSize: 12,
    color: '#888',
  },
  cardPrediction: {
    fontSize: 13,
    marginVertical: 4,
  },
  cardDetails: {
    fontSize: 12,
    marginBottom: 8,
  },
  cardActions: {
    justifyContent: 'flex-start',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    marginLeft: 4,
    color: '#007AFF',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default HistoryScreen;