import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import HouseImage from "../assets/images/chores-icon.svg";
import { membersStub } from "../stubs/members";
import { choreFeedStub } from "../stubs/choreFeed";

export default function ViewHousehold({ navigation }) {
  const [name, setName] = useState("Lorem's house");
  const [members, setMembers] = useState(membersStub);
  const [chores, setChores] = useState(choreFeedStub);

  function getMembers() {
    return members.map((member, index) => {
      return (
        <View key={index} style={styles.persona}>
          <Text style={styles.personaText}>{member.initials}</Text>
          {member.isActive && (
            <View style={styles.choreCounter}>
              <Text style={styles.choreCounterText}>{member.score}</Text>
            </View>
          )}
          {!member.isActive && <Text style={styles.pendingText}>Pending</Text>}
        </View>
      );
    });
  }
  function getChoreFeed() {
    return chores.map((chore, index) => {
      return (
        <View key={index} style={styles.card}>
          <View style={styles.chorePointValue}>
            <Text style={styles.chorePointValueText}>{"+" + chore.points}</Text>
          </View>
          <View style={styles.choreDescription}>
            <View style={styles.row}>
              <Text style={styles.completedBy}>{chore.completedBy}</Text>
              <Text>{" completed"}</Text>
            </View>
            <Text style={styles.choreName}>{chore.name}</Text>
          </View>
          <Text style={styles.choreDate}>{chore.completedDate}</Text>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageGrouping}>
          <HouseImage />
          <Text style={styles.welcomeText}>{name}</Text>
          <View style={styles.members}>{getMembers()}</View>
          <View style={styles.chores}>
            {chores.length > 0 ? (
              getChoreFeed()
            ) : (
              <Text style={styles.noChoresMessage}>
                {"No chores recorded yet"}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("RecordAChore")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Record Chore</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

ViewHousehold.navigationOptions = {
  title: "Household"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: "row"
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
  card: {
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1.25,
    elevation: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    height: 64,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 10,
    paddingLeft: 10
  },
  members: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 30
  },
  contentContainer: {},
  imageGrouping: {
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "10%",
    marginBottom: 20
  },
  chores: {
    backgroundColor: "#F5F5F5",
    width: "100%",
    height: 300
  },
  persona: {
    borderRadius: 56,
    width: 56,
    height: 56,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E7E7E7"
  },
  choreCounter: {
    position: "absolute",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 32,
    width: 32,
    height: 32,
    right: -12,
    bottom: -12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C63FF"
  },
  choreCounterText: {
    color: "#FFFFFF"
  },
  personaText: {
    fontSize: 24,
    lineHeight: 32,
    color: "#3F3D56"
  },
  button: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 60,
    marginTop: 20,
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
    flexDirection: "row",
    height: 47,
    backgroundColor: "#6C63FF"
  },
  buttonText: {
    // fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF"
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
  chorePointValue: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 32,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C63FF",
    marginRight: 15
  },
  chorePointValueText: {
    color: "#FFFFFF"
  },
  choreDescription: {
    width: "65%"
  },
  completedBy: {
    color: "#6C63FF",
    fontWeight: "bold"
  },
  choreName: {
    fontWeight: "bold"
  },
  choreDate: {
    top: 15,
    alignSelf: "flex-start",
    color: "#6C63FF"
  },
  noChoresMessage: {
    textAlign: "center",
    width: "100%",
    color: "#7C7C7C",
    marginTop: 40,
    fontSize: 16,
    lineHeight: 19
  },
  pendingText: {
    position: "absolute",
    color: "#7C7C7C",
    fontSize: 14,
    lineHeight: 16,
    bottom: -20
  }
});
