import "react-native-reanimated";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabLayout from "./(tabs)/_layout";
import Auth from "./auth";
export default function RootLayout() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="auth">
      <Stack.Screen
        name="(tabs)"
        component={TabLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="auth"
        component={Auth}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
