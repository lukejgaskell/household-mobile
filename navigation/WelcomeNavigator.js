import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import FindOrCreate from "../screens/FindOrCreate";
import LoginScreen from "../screens/LoginScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const WelcomeStack = createStackNavigator(
  {
    Home: LoginScreen,
    FindOrCreate: FindOrCreate
  },
  config
);

WelcomeStack.path = "";

export default WelcomeStack;
