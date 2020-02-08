import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import ChoresImage from "../assets/images/chores-icon.svg";
import { addChores } from "../state/redux";
import { connect } from "react-redux";

function AddChoresC({ navigation, addChores }) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(null);

  function add() {
    addChores({ name, difficulty });
    navigation.navigate("ViewChores");
  }

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
        <View style={styles.row}>{getButtons()}</View>
        <TouchableOpacity onPress={add} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

AddChoresC.navigationOptions = {
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
    width: "40%",
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

const mapDispatchToProps = {
  addChores
};

export default AddChores = connect(null, mapDispatchToProps)(AddChoresC);
