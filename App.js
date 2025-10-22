import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OtpLoginScreen from './src/screens/OtpLoginScreen';
import { AuthProvider } from "./src/context/AuthContext";

import LoginScreen from "./src/screens/LoginScreen";
import ProductsList from "./src/screens/ProductsList";
import ProductDetail from "./src/screens/ProductDetail";
import ProductForm from "./src/screens/ProductForm";
import UsersList from "./src/screens/UsersList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OtpLogin" component={OtpLoginScreen} />
          <Stack.Screen name="Products" component={ProductsList} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="ProductForm" component={ProductForm} />
          <Stack.Screen name="Users" component={UsersList} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
