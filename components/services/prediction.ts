import { Platform } from "react-native";

export interface Prediction {
  solar_radiation: number;
  humidity: number;
  conductivity: number;
  phosphorus: number;
  ph_value: number;
  temperature: number;
  nitrogen: number;
  potassium: number;
}

const URL =
  Platform.OS === "android"
    ? "https://smart-randomly-treefrog.ngrok-free.app/predict"
    : "http://localhost:8000/predict";

export const predictionResult = async (data: Prediction) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const result = await response.json();
    console.log(result); // Log the result for debugging
    return result;
  } catch (e: any) {
    console.error("Error during API call:", e.message || e);
    // throw new Error(e.message || e);
  }
};

// const data: Prediction = {
//   solar_radiation: 50, // Example values, replace with actual data
//   humidity: 30,
//   conductivity: 0.5,
//   phosphorus: 20,
//   ph_value: 6.5,
//   temperature: 25,
//   nitrogen: 15,
//   potassium: 10,
// };

// predictionResult(data)
//   .then((result) => {
//     console.log("Final Prediction Result:", result);
//   })
//   .catch((error) => {
//     console.error("Error during prediction:", error);
//   });
