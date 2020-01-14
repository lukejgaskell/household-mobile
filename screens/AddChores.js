import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import ChoresImage from "../assets/images/chores-icon.svg";
import { Ionicons } from "@expo/vector-icons";

export default function AddChores({ navigation }) {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageGrouping}>
          <ChoresImage />
          <Text style={styles.welcomeText}>Add Chores</Text>
          <Text style={styles.text}>
            Add your household chores to receive points for every household task
            that is completed.
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={text => setName(text)}
              placeholder="Chore Name"
              value={name}
            />
          </View>
          <View>
            <Text style={styles.leftText}>Chore Difficulty Points</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChores")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

AddChores.navigationOptions = {
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
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
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
  },
  leftText: {
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    fontSize: 14,
    lineHeight: 16,
    color: "#7C7C7C",
    marginTop: 20,
    marginBottom: 30,
    width: "80%"
  }
});
