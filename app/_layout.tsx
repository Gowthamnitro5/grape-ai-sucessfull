import "react-native-reanimated";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabLayout from "./(tabs)/_layout";
import Auth from "./auth";
import SplashScreen from "./SplashScreen";
import OutputScreen from "./output";
import { Pest } from "@/components/services/describe";

export type RootStackParamList = {
  "(tabs)": undefined;
  auth: undefined;
  SplashScreen: undefined;
  output: { input: Pest };
};

export default function RootLayout() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="(tabs)"
        component={TabLayout}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="output"
        component={OutputScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
