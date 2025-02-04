import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
  Text,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  useTheme,
  Searchbar,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { NavigationProp } from "@react-navigation/native";
import { useDataService } from "@/components/services/DataService";
interface HistoryScreenProps {
  navigation: NavigationProp<any>;
}
import { History } from "@/components/services/DataService";

const plantDiseases: { [key: string]: string } = {
  "Downy Mildew":
    "This disease develops as yellow or brown blotches on the undersides of leaves, caused by water molds thriving in wet and cool conditions.",
  "Powdery Mildew":
    "Recognizable by its white, dusty coating on leaves and stems, this fungal infection prefers warm, dry environments but with high humidity.",
  Anthracnose:
    "Affects plants by creating dark, sunken lesions on fruits, stems, and leaves, often leading to tissue decay in warm and moist climates.",
};

// Grape-inspired theme colors
const COLORS = {
  primary: "#6B2C70", // Deep purple grape
  secondary: "#9A4C95", // Light purple grape
  background: "#F8F4F9", // Very light purple
  card: "#F0E6F5", // Light grape tint
  text: "#4A1D4E", // Dark grape
  accent: "#8E3C8B", // Medium grape
  timestamp: "#7D2F82", // Grape burgundy
  headerBg: "#3D1440", // Extra deep purple for header
};

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const { userHistory } = useDataService();
  const statusBarHeight = StatusBar.currentHeight || 0;

  useEffect(() => {
    filterHistory(searchQuery);
  }, [searchQuery, userHistory]);

  const filterHistory = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = userHistory!.filter((item: History) => {
      const matchDisease = item.disease.toLowerCase().includes(lowercaseQuery);
      const matchDate = item.date.toLowerCase().includes(lowercaseQuery);
      return matchDisease || matchDate;
    });
    setFilteredHistory(filtered);
  };

  const getColumnCount = (screenWidth: number) => {
    if (screenWidth >= 1024) return 4;
    if (screenWidth >= 768) return 3;
    if (screenWidth >= 480) return 2;
    return 1;
  };

  const columnCount = getColumnCount(width);

  const renderHistoryItem = ({ item }: { item: any }) => (
    <Animatable.View
      animation="fadeIn"
      duration={500}
      style={[styles.gridItem, { width: width / columnCount - 16 }]}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.cardTitle}>{item.disease}</Title>
            <Paragraph style={styles.cardTime}>{item.date}</Paragraph>
          </View>
          <Paragraph style={styles.cardPrediction}>
            {plantDiseases[item.disease]}
          </Paragraph>
        </Card.Content>
      </Card>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={COLORS.headerBg} barStyle="light-content" /> */}
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>GrapeAI</Text>
        </View>
      </View>
      <SafeAreaView style={{ backgroundColor: COLORS.background }}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search by disease or date..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            iconColor={COLORS.primary}
            inputStyle={{ color: COLORS.text }}
            placeholderTextColor={COLORS.secondary}
          />
        </View>
        <FlatList
          data={filteredHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={columnCount}
          key={`column-${columnCount}`}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 5,
  },
  searchBar: {
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 10,
    height: 45,
  },
  listContainer: {
    padding: 8,
    paddingBottom: 80,
  },
  gridItem: {
    padding: 8,
  },
  card: {
    backgroundColor: "#FCF3CF",
    borderRadius: 12,
    elevation: 2,
    height: 220,
  },
  cardHeader: {
    flexDirection: "column",
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D35400",
  },
  cardTime: {
    fontSize: 12,
    color: "#2ECC71",
    fontWeight: "500",
  },
  cardPrediction: {
    color: "#2C3E50",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
});

export default HistoryScreen;
