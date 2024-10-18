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
    console.log(`Downloading report for id: ${id}`);
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
              <Title style={styles.cardTitle}>{item.date}</Title>
              <Paragraph style={styles.cardTime}>{item.time}</Paragraph>
            </View>
            <IconButton
              icon="download"
              size={20}
              onPress={() => handleDownload(item.id)}
            />
          </View>
          <Paragraph style={styles.cardPrediction}>
            Prediction: {item.disease}
          </Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate("PredictionDetails", { id: item.id })
            }
          >
            <MaterialCommunityIcons
              name="eye"
              size={18}
              color={theme.colors.primary}
            />
            <Paragraph style={styles.viewButtonText}>View Details</Paragraph>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </Animatable.View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.plumSurround}>
        <Searchbar
          placeholder="Search history"
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
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate("Explore")}
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
    backgroundColor: "#8E4585", // Plum color
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardTime: {
    fontSize: 12,
    color: "#888",
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
