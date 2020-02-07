import React, { useState } from "react";
import { List } from "react-native-elements";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { approvalsStub } from "../stubs/approvals";

export default function Settings({ navigation }) {
  const [name, setName] = useState("Lorem's house");
  const [approvals, setApprovals] = useState(approvalsStub);

  function getApprovals() {
    return approvals.map((a, index) => (
      <View key={index} style={styles.approvalContainer}>
        <View style={styles.rowLeft}>
          <View style={styles.personaLeft}>
            <Text style={styles.personaText}>{a.initials}</Text>
          </View>
          <View style={styles.personaRight}>
            <Text style={styles.text}>{a.name}</Text>
            <Text style={styles.text}>{a.email}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity>
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{name}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditChores")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Edit Chores</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditRoomates")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Edit Roomates</Text>
      </TouchableOpacity>
      <Text style={styles.welcomeText}>{"Housemate Approval"}</Text>
      {getApprovals()}
    </View>
  );
}

Settings.navigationOptions = {
  title: "Household"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  row: {
    paddingTop: 10,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  rowLeft: {
    width: 325,
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row"
  },
  approvalContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#C0C0C0"
  },
  approveText: {
    color: "#6C63FF",
    fontSize: 20,
    lineHeight: 23
  },
  rejectText: {
    color: "#F1001D",
    fontSize: 20,
    lineHeight: 23
  },
  buttonText: {
    color: "#6C63FF"
  },
  text: {
    color: "#7C7C7C",
    paddingTop: 5,
    paddingBottom: 5
  },
  welcomeText: {
    color: "#6C63FF",
    lineHeight: 37,
    marginTop: 30,
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 32
  },
  button: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 60,
    marginTop: 40,
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
    flexDirection: "row",
    height: 47
  },
  personaLeft: {
    borderRadius: 56,
    width: 56,
    height: 56,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E7E7E7"
  },
  personaRight: {},
  personaText: {
    fontSize: 24,
    lineHeight: 32,
    color: "#3F3D56"
  }
});
