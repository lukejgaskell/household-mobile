import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addMembers, deleteMembers } from "../state/redux";

function EditRoomatesC({ navigation, members, addMembers, deleteMembers }) {
  const [emails, setEmails] = useState([]);

  function inviteMembers() {
    emails.forEach(email => {
      addMembers({ email, status: "pending" });
    });
    members.navigation.navigate("ViewHousehold");
  }

  function getEmails() {
    let items = [];
    members
      .filter(m => m.status !== "requested")
      .forEach((m, index) => {
        items.push(
          <View style={styles.emailWrapper} key={"o" + index}>
            <Text style={styles.emailText}>{m.email}</Text>
            <TouchableOpacity onPress={() => deleteMembers(m.id)}>
              <Ionicons name="ios-close" size={32} color="red" />
            </TouchableOpacity>
          </View>
        );
      });

    emails.forEach((m, index) => {
      items.push(
        <View style={styles.inputWrapper} key={"n" + index}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              emails[index] = text;
              setEmails([...emails]);
            }}
            placeholder="Enter Email Address"
            value={email}
          />
        </View>
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
          <Text style={styles.welcomeText}>Edit Roomates</Text>
          <View style={styles.chores}>{getEmails()}</View>
          <TouchableOpacity
            onPress={() => setEmails([...emails, ""])}
            style={styles.addButton}
          >
            <Ionicons name="ios-add" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inviteMembers()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Invite</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

EditRoomatesC.navigationOptions = {
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
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242"
  },
  inputWrapper: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#AFAFAF",
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: "center",
    flexDirection: "row",
    width: 325,
    height: 50
  },
  emailWrapper: {
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 325,
    height: 50
  },
  emailText: {
    color: "#7C7C7C"
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
  const { members } = state;

  return { members };
}

const mapDispatchToProps = {
  addMembers,
  deleteMembers
};

export default EditRoomates = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRoomatesC);
