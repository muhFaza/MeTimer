import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import SignupPage from "./screens/SignupPage";
import JournalPage from "./screens/JournalPage";
import Onboarding from "./components/Onboarding/Onboarding";
import ChatFromAi from "./components/ChatOpenAi";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsPage from "./screens/NewsPage";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import ProfilePage from "./screens/ProfilePage";
import HistoryPage from "./screens/HistoryPage";
import DetailRecord from "./screens/DetailRecord";
import HowToMindfulness from "./screens/HowToMindfulness";
import { Platform } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LandingPageTabs() {
  return (
    <Tab.Navigator
      initialRouteName="LandingPageTabs"
      keyboardHidesTabBar={true}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={LandingPage}
        options={{
          tabBarLabelStyle: { fontSize: 13, marginBottom: 5 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={HistoryPage}
        options={{
          tabBarLabelStyle: { fontSize: 13, marginBottom: 5 },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="book" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatAi"
        component={ChatFromAi}
        options={{
          tabBarLabelStyle: { fontSize: 13, marginBottom: 5 },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsPage}
        options={{
          tabBarLabelStyle: { fontSize: 13, marginBottom: 5 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabelStyle: { fontSize: 13, marginBottom: 5 },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" color={color} size={27} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="ChatOpenAi" component={ChatFromAi} />
        <Stack.Screen name="LandingPageTabs" component={LandingPageTabs} />
        <Stack.Screen name="DetailRecord" component={DetailRecord} />
        <Stack.Screen name="HowToMindfulness" component={HowToMindfulness} />
        <Stack.Screen name="JournalPage" component={JournalPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
