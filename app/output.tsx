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
import { Prediction, predictionResult } from "@/components/services/prediction";
import { useDataService } from "@/components/services/DataService";
import { supabase } from "@/utils/supabase";

type Props = NativeStackScreenProps<RootStackParamList, "output">;

const OutputScreen = ({ route, navigation }: Props) => {
  const inputs: Prediction = route.params.input;
  const [llmAnalysis, setLlmAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const { session, fetchProfile, fetchHistory } = useDataService();
  const [prediction, setPrediction] = useState<Pest>();
  let fileUri: string = "NaN";

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      // calculating predictions.
      const response: Pest = await predictionResult(inputs);
      if (!response) {
        throw new Error("Empty response!");
      }
      setPrediction(response);

      // calculating description
      const description = await describePest(response);
      if (!description) {
        throw new Error("Empty response!");
      }
      setLlmAnalysis(description);
    } catch (error) {
      console.error(error);
      Alert.alert("Server issue.", "Please try later ..");
      navigation.navigate("(tabs)");
    }
    setLoading(false);
  };

  const generateScreenContentHTML = () => {
    if (!prediction || llmAnalysis) return;
    return `
      <main>
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
      </main>
    `;
  };

  const htmlContent = generateScreenContentHTML();

  const SavePrediction = async () => {
    try {
      console.log("Save Button is pressed");

      if (Platform.OS === "android") {
        fileUri = FileSystem.documentDirectory + `generated.pdf`;
        const { uri } = await Print.printToFileAsync({
          html: htmlContent,
          base64: false,
        });
        await FileSystem.moveAsync({
          from: uri,
          to: fileUri,
        });
        console.log("PDF file created and saved at : ", fileUri);
      }

      //saving the prediction to database.
      if (session?.user.id && prediction?.disease) {
        const { error } = await supabase.from("predictions").insert({
          user_id: session.user.id,
          disease: prediction.disease,
          pdf_uri: fileUri,
        });
        if (error) {
          throw new Error(error.message);
        }
        await fetchProfile();
        await fetchHistory();
      }

      // Sharing the file.
      if ((await Sharing.isAvailableAsync()) && Platform.OS === "android") {
        await Sharing.shareAsync(fileUri);
      }

      console.log("Saved the file successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Server issue.", "Please try later ..");
      navigation.navigate("(tabs)");
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
                {loading ? (
                  <ActivityIndicator animating={true} color="#8E44AD" />
                ) : (
                  <Paragraph>{prediction?.disease}</Paragraph>
                )}
              </Card.Content>
            </Card>
          </Animatable.View>

          <Animatable.View animation="fadeIn" delay={600}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>Pest Attack Probabilities</Title>
                {loading ? (
                  <ActivityIndicator animating={true} color="#8E44AD" />
                ) : (
                  <View style={styles.chartContainer}>
                    {Object.entries({
                      flea_beetle: prediction?.flea_beetle,
                      thrips: prediction?.thrips,
                      mealybug: prediction?.mealybug,
                      jassids: prediction?.jassids,
                      red_spider_mites: prediction?.red_spider_mites,
                      leaf_eating_caterpillar:
                        prediction?.leaf_eating_caterpillar,
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
                            style={[
                              styles.bar,
                              { width: `${probability ? probability : 0}%` },
                            ]}
                          />
                          <Paragraph style={styles.probabilityText}>
                            {probability}
                          </Paragraph>
                        </View>
                      </Animatable.View>
                    ))}
                  </View>
                )}
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
              onPress={SavePrediction}
              style={[styles.button, styles.pdfButton]}
              labelStyle={styles.buttonLabel}
            >
              Save Prediction.
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
