import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import CreateHouseholdImage from "../assets/images/create-household-icon.svg";

export default function CreateHousehold({ navigation }) {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.imageGrouping}>
        <CreateHouseholdImage />
        <Text style={styles.welcomeText}>Create Household</Text>
        <Text style={styles.text}>
          Create a household to begin tracking chores and make your house work
          fun!
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={text => setName(text)}
            placeholder="Household Name"
            value={name}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddChores")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

CreateHousehold.navigationOptions = {
  title: "Household"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",

    color: "#424242"
  },
  inputWrapper: {
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
    borderBottomColor: "#C7C7C7",
    borderBottomWidth: 1
  },
  welcomeText: {
    color: "#6C63FF",
    lineHeight: 37,
    marginTop: 30,
    // fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 32
  },
  contentContainer: {},
  imageGrouping: {
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "10%",
    marginBottom: 20
  },
  button: {
    // border: "1px solid #6C63FF",
    // boxSizing: "border-box",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 60,
    marginTop: 40,
    alignItems: "center",
    width: "50%",
    marginLeft: "5%",
    justifyContent: "center",
    flexDirection: "row",
    height: 47
  },
  buttonText: {
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#6C63FF"
  },
  text: {
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 16,
    color: "#7C7C7C",
    marginTop: 20,
    marginBottom: 30,
    width: "80%"
  }
});
