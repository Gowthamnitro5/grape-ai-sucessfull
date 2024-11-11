import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import {
  Title,
  Paragraph,
  Card,
  Surface,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import HTML from "react-native-render-html";

import { describePest, Pest } from "@/components/services/describe";
import { RootStackParamList } from "./_layout";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

type Props = NativeStackScreenProps<RootStackParamList, "output">;

const OutputScreen = ({ route, navigation }: Props) => {
  const prediction: Pest = route.params.input;
  const [llmAnalysis, setLlmAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLlmAnalysis();
  }, []);

  const fetchLlmAnalysis = async () => {
    try {
      const response = await describePest(prediction);
      console.log(response);
      setLlmAnalysis(response);
    } catch (error) {
      console.error("Error fetching LLM analysis:", error);
      setLlmAnalysis(
        `<p>Failed to load LLM analysis. Error: ${(error as Error).message}</p>`
      );
    } finally {
      setLoading(false);
    }
  };

  const generateScreenContentHTML = () => {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .title { font-size: 24px; color: #8E44AD; text-align: center; }
            .card { margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
            .card-title { font-size: 18px; margin-bottom: 10px; }
            .bar-container { display: flex; align-items: center; margin-bottom: 10px; }
            .bar-label { width: 30%; }
            .bar-wrapper { flex: 1; }
            .bar { height: 20px; background-color: #8E44AD; border-radius: 10px; }
            .probability-text { margin-left: 10px; }
          </style>
        </head>
        <body>
          <h1 class="title">Prediction Results</h1>
  
          <div class="card">
            <h2 class="card-title">Predicted Disease</h2>
            <p>${prediction.disease}</p>
          </div>
  
          <div class="card">
            <h2 class="card-title">Pest Attack Probabilities</h2>
            ${Object.entries({
              flea_beetle: prediction.flea_beetle,
              thrips: prediction.thrips,
              mealybug: prediction.mealybug,
              jassids: prediction.jassids,
              red_spider_mites: prediction.red_spider_mites,
              leaf_eating_caterpillar: prediction.leaf_eating_caterpillar,
            })
              .map(
                ([pest, probability]) => `
              <div class="bar-container">
                <div class="bar-label">${pest.replace(/_/g, " ")}</div>
                <div class="bar-wrapper">
                  <div class="bar" style="width: ${probability}%;"></div>
                </div>
                <span class="probability-text">${probability}</span>
              </div>
            `
              )
              .join("")}
          </div>
  
          <div class="card">
            <h2 class="card-title">Detailed Analysis</h2>
            ${llmAnalysis}
          </div>
        </body>
      </html>
    `;
  };

  const htmlContent = generateScreenContentHTML();

  const downloadScreenContentAsPDF = async () => {
    try {
      if (Platform.OS !== "android") return;
      const fileUri = FileSystem.documentDirectory + `generated.pdf`;
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false, // Set to true if you need the output in base64
      });
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });
      console.log("PDF file created and saved at:", fileUri);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate PDF");
    }
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
                <Paragraph>{prediction.disease}</Paragraph>
              </Card.Content>
            </Card>
          </Animatable.View>

          <Animatable.View animation="fadeIn" delay={600}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>Pest Attack Probabilities</Title>
                <View style={styles.chartContainer}>
                  {Object.entries({
                    flea_beetle: prediction.flea_beetle,
                    thrips: prediction.thrips,
                    mealybug: prediction.mealybug,
                    jassids: prediction.jassids,
                    red_spider_mites: prediction.red_spider_mites,
                    leaf_eating_caterpillar: prediction.leaf_eating_caterpillar,
                  }).map(([pest, probability], index) => (
                    <Animatable.View
                      key={pest}
                      animation="fadeInLeft"
                      delay={index * 100}
                      style={styles.barContainer}
                    >
                      <View style={styles.labelContainer}>
                        <Paragraph>{pest.replace(/_/g, " ")}</Paragraph>
                      </View>
                      <View style={styles.barWrapper}>
                        <View
                          style={[styles.bar, { width: `${probability}%` }]}
                        />
                        <Paragraph style={styles.probabilityText}>
                          {probability}
                        </Paragraph>
                      </View>
                    </Animatable.View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </Animatable.View>

          <Animatable.View animation="fadeIn" delay={900}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>Detailed Analysis</Title>
                {loading ? (
                  <ActivityIndicator animating={true} color="#8E44AD" />
                ) : (
                  <HTML source={{ html: llmAnalysis }} contentWidth={300} />
                )}
              </Card.Content>
            </Card>
          </Animatable.View>

          <Animatable.View animation="fadeIn" delay={1200}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("(tabs)")}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Back to Home
            </Button>
          </Animatable.View>

          <Animatable.View animation="fadeIn" delay={1500}>
            <Button
              mode="contained"
              onPress={downloadScreenContentAsPDF}
              style={[styles.button, styles.pdfButton]}
              labelStyle={styles.buttonLabel}
            >
              Download Screen as PDF
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
    backgroundColor: "#F4F6F7",
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#8E44AD",
  },
  card: {
    marginBottom: 20,
  },
  chartContainer: {
    marginTop: 10,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  labelContainer: {
    width: "30%",
  },
  barWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    height: 20,
    backgroundColor: "#8E44AD",
    borderRadius: 10,
  },
  probabilityText: {
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#8E44AD",
    borderRadius: 10,
  },
  buttonLabel: {
    color: "#FFF",
  },
  pdfButton: {
    marginTop: 10,
    backgroundColor: "#27AE60",
  },
});

export default OutputScreen;
