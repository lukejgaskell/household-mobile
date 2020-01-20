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

export default function EditChores({ navigation }) {
  const chore = navigation.getParam("chore", {});
  const [name, setName] = useState(chore.name);
  const [difficulty, setDifficulty] = useState(chore.difficulty);

  function getButtons() {
    let buttons = [];
    for (let i = 1; i <= 5; i++) {
      buttons.push(
        <TouchableOpacity
          onPress={() => setDifficulty(i)}
          style={
            difficulty === i ? styles.roundButtonSelected : styles.roundButton
          }
          key={i}
        >
          <Text
            style={
              difficulty === i
                ? styles.roundButtonTextSelected
                : styles.roundButtonText
            }
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageGrouping}>
          <ChoresImage />
          <Text style={styles.welcomeText}>Edit Chore</Text>
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
          <View style={styles.row}>{getButtons()}</View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewChores")}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewChores")}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete Chore</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

EditChores.navigationOptions = {
  title: "Household"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%"
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
  saveButton: {
    // border: "1px solid #6C63FF",
    // boxSizing: "border-box",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 60,
    marginTop: 40,
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
    flexDirection: "row",
    height: 47,
    backgroundColor: "#6C63FF"
  },
  saveButtonText: {
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF"
  },
  deleteButton: {
    marginTop: 30,
    padding: 10
  },
  deleteButtonText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 14,
    color: "#FF0000"
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
  },
  roundButton: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 42,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center"
  },
  roundButtonSelected: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 42,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C63FF"
  },
  roundButtonText: {
    color: "#6C63FF"
  },
  roundButtonTextSelected: {
    color: "#FFFFFF"
  }
});
