import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import LoginImage from "../assets/images/login-icon.svg";
import GoogleLogo from "../assets/images/google-icon.svg";
import FacebookLogo from "../assets/images/facebook-icon.svg";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <LoginImage />
        <Text style={styles.welcomeText}>Welcome</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("FindOrCreate")}
        style={styles.loginButton}
      >
        <GoogleLogo />
        <Text style={styles.loginText}>Login With Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("FindOrCreate")}
        style={styles.loginButton}
      >
        <FacebookLogo style={styles.facebookLogo} />
        <Text style={styles.loginText}>Login With Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

LoginScreen.navigationOptions = {
  title: "Household"
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
  welcomeContainer: {
    alignItems: "center",
    marginTop: "30%",
    marginBottom: 20
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
  loginButton: {
    // border: "1px solid #6C63FF",
    // boxSizing: "border-box",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 60,
    marginTop: 30,
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 47,
    paddingLeft: 18
  },
  loginText: {
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#6C63FF",
    marginLeft: 80
  },
  facebookLogo: {
    marginLeft: 4
  }
});
