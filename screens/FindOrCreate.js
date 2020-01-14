import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import FindHouseholdImage from "../assets/images/find-household-icon.svg";
import CreateHouseholdImage from "../assets/images/create-household-icon.svg";

export default function FindOrCreate({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageGrouping}>
          <FindHouseholdImage />
          <TouchableOpacity
            onPress={() => navigation.navigate("JoinHousehold")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Find a household</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.orText}>or</Text>
        <View style={styles.imageGrouping}>
          <CreateHouseholdImage />
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateHousehold")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Create a household</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

FindOrCreate.navigationOptions = {
  title: "Household",
  headerLeft: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {},
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 80,
    marginLeft: -10
  },
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
    marginTop: 10,
    alignItems: "center",
    width: "90%",
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
  orText: {
    color: "#7C7C7C",
    textAlign: "center"
  }
});
