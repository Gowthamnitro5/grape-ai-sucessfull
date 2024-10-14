export interface Pest {
  disease: string;
  flea_beetle: number;
  thrips: number;
  mealybug: number;
  jassids: number;
  red_spider_mites: number;
  leaf_eating_caterpillar: number;
}

const URL = "http://localhost:8000/describe";

export const describePest = async (data: Pest) => {
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
    return await response.text();
  } catch (error: any) {
    throw Error(error);
  }
};

const data: Pest = {
  disease: "string",
  flea_beetle: 0,
  thrips: 0,
  mealybug: 0,
  jassids: 0,
  red_spider_mites: 0,
  leaf_eating_caterpillar: 0,
};

// describePest(data)
//   .then((result) => {
//     console.log("Prediction Result:", result);
//   })
//   .catch((error) => {
//     console.error("Error during prediction:", error);
//   });
