import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "./explore";
import HistoryScreen from "./history";
import HomeScreen from "./home";
import Profile from "./profile";
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="explore"
        component={Explore}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="history"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
