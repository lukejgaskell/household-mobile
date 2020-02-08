import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import HouseImage from "../assets/images/chores-icon.svg";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { getScore } from "../services/activity";

function ViewHouseholdC({
  navigation,
  householdName,
  members,
  activity,
  currentUser
}) {
  const [selectedMember, setSelectedMember] = useState(null);

  function getMembers() {
    return members.map((member, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            setSelectedMember(selectedMember?.id !== member.id ? member : null)
          }
        >
          <View
            style={
              selectedMember?.id !== member.id
                ? styles.persona
                : styles.selectedPersona
            }
          >
            <Text
              style={
                selectedMember?.id !== member.id
                  ? styles.personaText
                  : styles.selectedPesonaText
              }
            >
              {member.initials}
            </Text>
            {member.status === "active" && (
              <View style={styles.choreCounter}>
                <Text style={styles.choreCounterText}>
                  {getScore(activity, currentUser.id)}
                </Text>
              </View>
            )}
            {!member.status === "active" && (
              <Text style={styles.pendingText}>Pending</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  }
  function getChoreFeed() {
    return activity
      .filter(
        c => selectedMember === null || c.completedById === selectedMember.id
      )
      .map((a, index) => {
        return (
          <View key={index} style={styles.card}>
            <View style={styles.chorePointValue}>
              <Text style={styles.chorePointValueText}>{"+" + a.points}</Text>
            </View>
            <View style={styles.choreDescription}>
              <View style={styles.row}>
                <Text style={styles.completedBy}>{a.completedBy}</Text>
                <Text>{" completed"}</Text>
              </View>
              <Text style={styles.choreName}>{a.name}</Text>
            </View>
            <Text style={styles.choreDate}>{a.completedDate}</Text>
          </View>
        );
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageGrouping}>
        {selectedMember !== null ? (
          <>
            <View style={styles.bigPersona}>
              <Text style={styles.bigPersonaText}>
                {selectedMember?.initials}
              </Text>
            </View>
            <Text style={styles.welcomeText}>{selectedMember?.name}</Text>
            <Text style={styles.pointsText}>
              {selectedMember?.score + " Points"}
            </Text>
          </>
        ) : (
          <>
            <HouseImage />
            <Text style={styles.welcomeText}>{householdName}</Text>
          </>
        )}
        <View style={styles.members}>{getMembers()}</View>
        <View style={styles.chores}>
          <ScrollView>
            {activity.length > 0 ? (
              getChoreFeed()
            ) : (
              <Text style={styles.noChoresMessage}>
                {"No chores recorded yet"}
              </Text>
            )}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("RecordAChore")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Record Chore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

ViewHouseholdC.navigationOptions = ({ navigation }) => ({
  title: "Household",
  headerLeft: null,
  headerRight: (
    <TouchableOpacity
      style={styles.gearIcon}
      onPress={() => navigation.navigate("Settings")}
    >
      <Ionicons name="ios-cog" size={32} color="black" />
    </TouchableOpacity>
  )
});

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
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 32
  },
  pointsText: {
    color: "#6C63FF",
    lineHeight: 22,
    marginTop: 20,
    marginBottom: 15,
    fontStyle: "normal",
    fontSize: 16
  },
  gearIcon: {
    marginRight: 20
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
  selectedPersona: {
    borderRadius: 56,
    width: 56,
    height: 56,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B4B0FB"
  },
  bigPersona: {
    borderRadius: 112,
    width: 112,
    height: 112,
    marginTop: 21,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B4B0FB"
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
  selectedPesonaText: {
    fontSize: 24,
    lineHeight: 32,
    color: "#FFFFFF"
  },
  bigPersonaText: {
    fontSize: 48,
    lineHeight: 58,
    color: "#FFFFFF"
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

function mapStateToProps(state) {
  const { activity, householdName, members, currentUser } = state;
  return { activity, householdName, members, currentUser };
}

const mapDispatchToProps = {};

export default ViewHousehold = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewHouseholdC);
