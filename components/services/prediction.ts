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

const URL = "http://localhost:8000/predict";

export const predictionResult = async (data: Prediction) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw Error(JSON.stringify(errorData));
    }
    return await response.json();
  } catch (e: any) {
    throw Error(e);
  }
};

const data: Prediction = {
  solar_radiation: 0,
  humidity: 0,
  conductivity: 0,
  phosphorus: 0,
  ph_value: 0,
  temperature: 0,
  nitrogen: 0,
  potassium: 0,
};

// predictionResult(data)
//   .then((result) => {
//     console.log("Prediction Result:", result);
//   })
//   .catch((error) => {
//     console.error("Error during prediction:", error);
//   });
