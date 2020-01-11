import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>Household</Text>
        <Text>Welcome</Text>
      </ScrollView>
    </View>
  );
}

WelcomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  }
});
