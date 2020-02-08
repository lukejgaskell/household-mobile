import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import ChoresImage from "../assets/images/chores-icon.svg";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

function ViewChoresC({ navigation, chores }) {
  function getChores() {
    let items = [];
    chores.forEach((chore, index) => {
      items.push(
        <TouchableOpacity
          onPress={() => navigation.navigate("EditChore", { chore })}
          style={styles.choreButton}
          key={index}
        >
          <Text style={styles.choreButtonText}>{chore.name}</Text>
          <View style={styles.roundButtonSelected}>
            <Text style={styles.roundButtonTextSelected}>
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
          <ChoresImage />
          <Text style={styles.welcomeText}>Chores</Text>
          <View style={styles.chores}>{getChores()}</View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChores")}
            style={styles.addButton}
          >
            <Ionicons name="ios-add" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("InviteRoomates")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

ViewChoresC.navigationOptions = {
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
  roundButtonTextSelected: {
    color: "#FFFFFF"
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

function mapStateToProps(state) {
  const { chores } = state;
  return { chores };
}

const mapDispatchToProps = {};

export default ViewChores = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewChoresC);
