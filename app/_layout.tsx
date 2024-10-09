import "react-native-reanimated";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabLayout from "./(tabs)/_layout";
import Auth from "./auth";
import SplashScreen from "./SplashScreen";

export default function RootLayout() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="(tabs)"
        component={TabLayout}
        options={{ 
            headerShown: false,
            // Remove tabBarOptions from here if this is a stack navigator
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
      
    </Stack.Navigator>
  );
}
