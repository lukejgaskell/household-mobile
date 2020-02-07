import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import FindOrCreate from "../screens/FindOrCreate";
import LoginScreen from "../screens/LoginScreen";
import JoinHousehold from "../screens/JoinHousehold";
import CreateHousehold from "../screens/CreateHousehold";
import AddChores from "../screens/AddChores";
import ViewChores from "../screens/ViewChores";
import EditChore from "../screens/EditChore";
import InviteRoomates from "../screens/InviteRoomates";
import ViewHousehold from "../screens/ViewHousehold";
import RecordAChore from "../screens/RecordAChore";
import Settings from "../screens/Settings";
import EditChores from "../screens/EditChores";
import EditRoomates from "../screens/EditRoomates";

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
    AddChores: AddChores,
    ViewChores: ViewChores,
    EditChore: EditChore,
    InviteRoomates: InviteRoomates,
    ViewHousehold: ViewHousehold,
    RecordAChore: RecordAChore,
    Settings: Settings,
    EditChores: EditChores,
    EditRoomates: EditRoomates
  },
  config
);

WelcomeStack.path = "";

export default WelcomeStack;
