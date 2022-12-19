import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DetailsScreen from "./Home/Content";
import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View } from "react-native";
import Card from "./Home/Card";
import ProfileTab from "./Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import httpClient from "../../httpClient";
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
import Create from "./Create";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  return (
    <View>
      <Card />
    </View>
  );
}
function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
        gestureDirection: "horizontal",
        gestureEnabled: true,
        headerShown: true,
        animation: "slide_from_right",
        animationTypeForReplace: "pop",
        animationDuration: 2,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
function StackProfile({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
        gestureDirection: "horizontal",
        gestureEnabled: true,
        headerShown: true,
        animation: "slide_from_right",
        // time speed of animation
        animationTypeForReplace: "pop",
        animationDuration: 10,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileTab} />
    </Stack.Navigator>
  );
}
function MyTabs({ navigation }) {
  const getUser = async () => {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value == null) {
      navigation.navigate("Login");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );
  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false }}
      initialRouteName="Feed"
      activeColor="#B92B27"
      barStyle={{
        backgroundColor: "#f8f9fa",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderTopColor: "#e9ecef",
      }}
    >
      <Tab.Screen
        name="Feed"
        component={StackNavigator}
        options={{
          tabBarLabel: "Home",
          showLabel: false,
          labeled: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarLabel: "Tambah Barang",
          showLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pen-plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={StackProfile}
        tabBarOptions={{
          showLabel: false,
        }}
        options={{
          tabBarOptions: {
            showLabel: false,
          },
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
