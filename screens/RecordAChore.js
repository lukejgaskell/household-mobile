import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { chores } from "../stubs/chores";

export default function RecordAChore({ navigation }) {
  const [selectedChore, setSelectedChore] = useState(null);

  function getChores() {
    let items = [];
    chores.forEach((chore, index) => {
      items.push(
        <TouchableOpacity
          onPress={() => setSelectedChore(index)}
          style={
            selectedChore === index
              ? styles.choreButtonSelected
              : styles.choreButton
          }
          key={index}
        >
          <Text
            style={
              selectedChore === index
                ? styles.choreButtonTextSelected
                : styles.choreButtonText
            }
          >
            {chore.name}
          </Text>
          <View
            style={
              selectedChore === index
                ? styles.roundButtonSelected
                : styles.roundButton
            }
          >
            <Text
              style={
                selectedChore === index
                  ? styles.roundButtonTextSelected
                  : styles.roundButtonText
              }
            >
              {chore.difficulty}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
    return items;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageGrouping}>
          <Text style={styles.welcomeText}>Record a chore</Text>
          <View style={styles.chores}>{getChores()}</View>
          {selectedChore !== null ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("ViewHousehold")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Complete</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

RecordAChore.navigationOptions = {
  title: "Household"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
  chores: {
    marginTop: 20
  },
  button: {
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
  choreButtonSelected: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 8,
    width: 325,
    height: 50,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#6C63FF"
  },
  choreButton: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 8,
    width: 325,
    height: 50,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  choreButton: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 8,
    width: 325,
    height: 50,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  choreButtonText: {
    color: "#7C7C7C"
  },
  choreButtonTextSelected: {
    color: "#FFFFFF"
  },
  roundButton: {
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
    color: "#FFFFFF"
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
    backgroundColor: "#FFFFFF"
  },
  roundButtonTextSelected: {
    color: "#6C63FF"
  },
  addButton: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 34,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C63FF",
    marginTop: 15,
    marginBottom: 10
  }
});
