import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./screens/SignUp";
import Login from "./screens/login";
import Post from "./screens/post";
import HomeScreen from "./screens/Home";

const Stack = createStackNavigator();

export function User() { 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
