import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Home from "../screens/Home";
import EditUser from "../screens/EditUser";
import UpdateUser from "../screens/UpdateUser";
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name={"Home"}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={UpdateUser}
        name={"UpdateUser"}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={EditUser}
        name={"EditUser"}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
