import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import FindOrCreate from "../screens/FindOrCreate";
import LoginScreen from "../screens/LoginScreen";
import JoinHousehold from "../screens/JoinHousehold";
import CreateHousehold from "../screens/CreateHousehold";
import AddChores from "../screens/AddChores";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const WelcomeStack = createStackNavigator(
  {
    Home: LoginScreen,
    FindOrCreate: FindOrCreate,
    JoinHousehold: JoinHousehold,
    CreateHousehold: CreateHousehold,
    AddChores: AddChores
  },
  config
);

WelcomeStack.path = "";

export default WelcomeStack;
