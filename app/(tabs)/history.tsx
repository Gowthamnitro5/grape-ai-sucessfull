import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  useTheme,
  Searchbar,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { NavigationProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDataService } from "@/components/services/DataService";

interface HistoryScreenProps {
  navigation: NavigationProp<any>;
}

const plantDiseases: { [key: string]: string } = {
  "Downy Mildew":
    "This disease develops as yellow or brown blotches on the undersides of leaves, caused by water molds thriving in wet and cool conditions.",
  "Powdery Mildew":
    "Recognizable by its white, dusty coating on leaves and stems, this fungal infection prefers warm, dry environments but with high humidity.",
  Anthracnose:
    "Affects plants by creating dark, sunken lesions on fruits, stems, and leaves, often leading to tissue decay in warm and moist climates.",
};

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const { userHistory } = useDataService();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here if needed
  };

  const handleDownload = (id: string) => {
    // Implement download logic here
  };

  const getColumnCount = (screenWidth: number) => {
    if (screenWidth >= 768) return 3; // Tablet or larger
    if (screenWidth >= 480) return 2; // Large phones
    return 1; // Small phones
  };

  const columnCount = getColumnCount(width);

  const renderHistoryItem = ({ item }: { item: any }) => (
    <Animatable.View
      animation="fadeIn"
      duration={500}
      style={[styles.gridItem, { width: `${100 / columnCount}%` }]}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View>
              <Title style={styles.cardTitle}>{item.disease}</Title>
              <Paragraph style={styles.cardTime}>{item.date}</Paragraph>
            </View>
          </View>
          <Paragraph style={styles.cardPrediction}>
            {plantDiseases[item.disease]}
          </Paragraph>
        </Card.Content>
      </Card>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#8E44AD" }]}>
      <View style={{ top: 8 }}>
        <Searchbar
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <FlatList
        data={userHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={columnCount}
        key={`column-${columnCount}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plumSurround: {
    backgroundColor: "#8E4585",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  searchBar: {
    marginBottom: 8,
    height: 60,
    paddingVertical: 1,
  },
  listContainer: {
    padding: 8,
    paddingBottom: 80,
  },
  gridItem: {
    padding: 4,
  },
  card: {
    backgroundColor: "#FCF3CF",
    height: 210,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D35400",
  },
  cardTime: {
    fontSize: 12,
    color: "#2ECC71",
    fontWeight: "bold",
  },
  cardPrediction: {
    color: "#2C3E50",
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 4,
  },
  cardDetails: {
    fontSize: 12,
    marginBottom: 8,
  },
  cardActions: {
    justifyContent: "flex-start",
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewButtonText: {
    marginLeft: 4,
    color: "#007AFF",
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});

export default HistoryScreen;
