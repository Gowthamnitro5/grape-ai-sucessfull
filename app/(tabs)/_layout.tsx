import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "./explore";
import HistoryScreen from "./history";
import HomeScreen from "./home";
import Profile from "./profile";
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Prediction"
        component={Explore}
        // options={{ headerShown: false }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        // options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        //options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
