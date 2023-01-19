import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/Screens/HomeScreen";
import WhishListScreen from "./components/Screens/WhishListScreen";
import PaymentScreen from "./components/Screens/PaymentScreen";
import CartScreen from "./components/Screens/CartScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import SignupScreen from "./components/Screens/SignupScreen";
import ReviewScreen from "./components/Screens/ReviewScreen";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as ImagePicker from "expo-image-picker";

import { Provider } from "react-redux";
import store from "./store";

import { navigationRef } from "./components/Screens/RootNavigation";

const Stack = createNativeStackNavigator();

// import { LogBox } from "react-native";

const App = () => {
  const [HasGalleryPermissions, setHasGalleryPermissions] = useState(null);
  const [HasCameraPermissions, setHasCameraPermissions] = useState(null);

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === "granted");
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === "granted");
    };
  }, []);

  if (HasGalleryPermissions === false) {
    Alert.alert("The Access To Gallery Roll Is Denied!");
  }

  if (HasCameraPermissions === false) {
    Alert.alert("The Access To Camera Roll Is Denied!");
  }

  return (
    <StripeProvider publishableKey="pk_test_51KqJ4DAAUyqQ9D2Qg3e4RhwFrtsK8QtUkg28KOZ5CRFFUa50BBkzjZaulWLvdO58TbrophUGRZtrPjk25Ploh9To00vXLv8YDl">
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Welcome To Coffee Shop",
                headerTitleAlign: "center",
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ title: "Payment", headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Whishlist"
              component={WhishListScreen}
              options={{ title: "My WhishList", headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: "Shopping Cart", headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Login To Coffee Shop",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                title: "Register To Coffee Shop",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="Review"
              component={ReviewScreen}
              options={{
                title: "Coffee Shop App Reviews",
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
};

export default App;
