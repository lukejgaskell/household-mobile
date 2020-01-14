import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import FindHouseholdImage from "../assets/images/find-household-icon.svg";

export default function JoinHousehold() {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageGrouping}>
          <FindHouseholdImage />
          <Text style={styles.welcomeText}>Join Household</Text>
          <Text style={styles.text}>Enter Household Admin's Email Address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={text => setEmail(text)}
              placeholder="Email Address"
              value={email}
            />
          </View>
          {!showMessage && (
            <TouchableOpacity
              onPress={() => setShowMessage(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Join Household</Text>
            </TouchableOpacity>
          )}
          {showMessage && (
            <Text style={styles.messageText}>
              This Household admin will approve you soon. You will be notified
              via email.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

JoinHousehold.navigationOptions = {
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
  contentContainer: {},
  welcomeText: {
    color: "#6C63FF",
    lineHeight: 37,
    marginTop: 30,
    // fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 32
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
    marginTop: 40,
    alignItems: "center",
    width: "80%",
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
  messageText: {
    color: "#6C63FF",
    textAlign: "center",
    fontSize: 17,
    lineHeight: 20,
    width: "80%",
    marginTop: 40
  }
});
