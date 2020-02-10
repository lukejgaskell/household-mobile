import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import ActivityCard from '../components/ActivityCard';
import Colors from '../constants/Colors';
// @ts-ignore
import HouseImage from '../assets/images/house-icon.svg';
import ImagePage from '../components/ImagePage';
import { Ionicons } from '@expo/vector-icons';
import { MemberStatuses } from '../constants/Statuses';
import NavOptions from '../constants/NavOptions';
import { connect } from 'react-redux';
import { getScore } from '../utilities/activity';

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
            {member.status === MemberStatuses.ACTIVE && (
              <View style={styles.choreCounter}>
                <Text style={styles.choreCounterText}>
                  {getScore(activity, currentUser.id)}
                </Text>
              </View>
            )}
            {member.status !== MemberStatuses.ACTIVE && (
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
        (c) => selectedMember === null || c.completedById === selectedMember.id
      )
      .map((a, index) => {
        return <ActivityCard key={index} activity={a} />;
      });
  }

  function PersonaImage() {
    return (
      <>
        <View style={styles.bigPersona}>
          <Text style={styles.bigPersonaText}>{selectedMember?.initials}</Text>
        </View>
      </>
    );
  }

  return (
    <ImagePage
      Image={selectedMember !== null ? PersonaImage : HouseImage}
      titleText={selectedMember !== null ? selectedMember.name : householdName}
    >
      {selectedMember !== null ? (
        <Text style={styles.pointsText}>
          {getScore(activity, selectedMember.id) + ' Points'}
        </Text>
      ) : null}
      <View style={styles.members}>{getMembers()}</View>
      <View style={styles.chores}>
        <ScrollView>
          {activity.length > 0 ? (
            getChoreFeed()
          ) : (
            <Text style={styles.noChoresMessage}>
              {'No chores recorded yet'}
            </Text>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavOptions.RecordAChore)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Record Chore</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

ViewHouseholdC.navigationOptions = ({ navigation }) => ({
  title: 'Household',
  headerLeft: null,
  headerRight: (
    <TouchableOpacity
      style={styles.gearIcon}
      onPress={() => navigation.navigate(NavOptions.Settings)}
    >
      <Ionicons name="ios-cog" size={32} color="black" />
    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  pointsText: {
    color: Colors.primary,
    lineHeight: 22,
    fontStyle: 'normal',
    fontSize: 16,
    marginBottom: 10
  },
  gearIcon: {
    marginRight: 20
  },
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1.25,
    elevation: 2,
    backgroundColor: Colors.background,
    borderRadius: 12,
    height: 64,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 10,
    paddingLeft: 10
  },
  members: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30
  },
  chores: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: 300
  },
  persona: {
    borderRadius: 56,
    width: 56,
    height: 56,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7E7E7'
  },
  selectedPersona: {
    borderRadius: 56,
    width: 56,
    height: 56,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B4B0FB'
  },
  bigPersona: {
    borderRadius: 112,
    width: 112,
    height: 112,
    marginTop: 21,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B4B0FB'
  },
  choreCounter: {
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 32,
    width: 32,
    height: 32,
    right: -12,
    bottom: -12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  choreCounterText: {
    color: Colors.background
  },
  personaText: {
    fontSize: 24,
    lineHeight: 32,
    color: '#3F3D56'
  },
  selectedPesonaText: {
    fontSize: 24,
    lineHeight: 32,
    color: Colors.background
  },
  bigPersonaText: {
    fontSize: 48,
    lineHeight: 58,
    color: Colors.background
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 60,
    marginTop: 20,
    alignItems: 'center',
    width: '40%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 47,
    backgroundColor: Colors.primary
  },
  buttonText: {
    // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.background
  },
  text: {
    // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.secondary,
    marginTop: 20,
    marginBottom: 30,
    width: '80%'
  },
  noChoresMessage: {
    textAlign: 'center',
    width: '100%',
    color: Colors.secondary,
    marginTop: 40,
    fontSize: 16,
    lineHeight: 19
  },
  pendingText: {
    position: 'absolute',
    color: Colors.secondary,
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewHouseholdC);
