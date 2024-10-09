// This is a mock prediction service. In a real application, you'd send the data to your backend API.
export const getPrediction = async (inputs: any) => { // Specify the type of inputs
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Utility function to parse and validate numerical inputs
    const parseInput = (value: string | number) => { // Specify the type of 'value'
        const parsedValue = Number(value);
        return isNaN(parsedValue) ? 0 : parsedValue; // Default to 0 if the value is not a valid number
    };

    try {
        const payload = {
            solar_radiation: parseInput(inputs.solarRadiation),
            humidity: parseInput(inputs.humidity),
            conductivity: parseInput(inputs.conductivity),
            phosphorus: parseInput(inputs.phosphorous),
            ph_value: parseInput(inputs.pHValue),
            temperature: parseInput(inputs.temperature),
            nitrogen: parseInput(inputs.nitrogen),
            potassium: parseInput(inputs.potassium),
        };

        console.log('Sending inputs:', payload); // Log the payload being sent

        const response = await fetch('http://10.0.2.2:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error: ${response.status} - ${errorText}`);
            return null; // Return null if the response is not ok
        }

        const data = await response.json();

        // Ensure the response contains the expected keys
        if (!data.predicted_disease || !data.predicted_pest_attacks) {
            console.error('Invalid response structure from the backend');
            return null;
        }

        return {
            disease: data['predicted_disease'],
            pestAttacks: {
                'Flea Beetle': data['predicted_pest_attacks']['Flea Beetle'] || 0,
                'Thrips': data['predicted_pest_attacks']['Thrips'] || 0,
                'MealyBug': data['predicted_pest_attacks']['Mealybug'] || 0,
                'Jassids': data['predicted_pest_attacks']['Jassids'] || 0,
                'Red Spider Mites': data['predicted_pest_attacks']['Red-Spider Mites'] || 0,
                'Leaf Eating Caterpillar': data['predicted_pest_attacks']['Leaf Eating Caterpillar'] || 0,
            },
        };
    } catch (err) {
        console.error('API call failed:', err);
        return null; // Return null in case of error
    }
};
