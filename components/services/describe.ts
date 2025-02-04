import { Platform } from "react-native";

export interface Pest {
  disease: string;
  flea_beetle: number;
  thrips: number;
  mealybug: number;
  jassids: number;
  red_spider_mites: number;
  leaf_eating_caterpillar: number;
}

const URL =
  "https://grapeai-b8exafafgafdbhgz.southindia-01.azurewebsites.net/describe";

export const describePest = async (data: Pest) => {
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
      console.error("API Error Data:", errorData);
      throw new Error(JSON.stringify(errorData));
    }

    const result = await response.text();
    console.log("Pest Description Successful"); // Log the result for debugging
    return result;
  } catch (error: any) {
    console.error("Error during API call:", error.message || error);
    throw new Error(error.message || error);
  }
};

// Example data with non-zero values to illustrate usage
// const data: Pest = {
//   disease: "powdery mildew", // Example disease, replace with actual case
//   flea_beetle: 5,
//   thrips: 2,
//   mealybug: 4,
//   jassids: 3,
//   red_spider_mites: 6,
//   leaf_eating_caterpillar: 7,
// };

// describePest(data)
//   .then((result) => {
//     console.log("Final Pest Description Result:", result);
//   })
//   .catch((error) => {
//     console.error("Error during prediction:", error);
//   });
