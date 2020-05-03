import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Activity } from '../state/activity/models';
import ActivityCard from '../components/ActivityCard';
import { AppState } from '../state/store';
import Colors from '../constants/Colors';
import HouseImage from '../assets/images/house-icon.svg';
import ImagePage from '../components/ImagePage';
import { Member } from '../state/members/models';
import { MemberStatuses } from '../constants/Statuses';
import { RootStackParamList } from '../models';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { dispatchLoadActivity } from '../state/activity/redux';
import { dispatchLoadHousehold } from '../state/household/redux';
import { getScore } from '../utilities/activity';

function mapStateToProps(state: AppState) {
  return {
    activity: state.activity.activity,
    householdName: state.house.householdName,
    members: state.members.members,
    currentUser: state.user.currentUser,
  };
}

const mapDispatchToProps = {
  dispatchLoadActivity,
  dispatchLoadHousehold,
} as {
  dispatchLoadActivity: () => void;
  dispatchLoadHousehold: () => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'ViewHousehold'>;
type IOwnProps = {
  navigation: NavigationProp;
};
type IProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & IOwnProps;

function ViewHouseholdC(props: IProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  React.useEffect(() => {
    props.dispatchLoadHousehold();
    props.dispatchLoadActivity();
  }, []);

  function getMembers() {
    return props.members.map((member, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedMember(selectedMember?.email !== member.email ? member : null)}
        >
          <View style={selectedMember?.email !== member.email ? styles.persona : styles.selectedPersona}>
            <Text style={selectedMember?.email !== member.email ? styles.personaText : styles.selectedPesonaText}>
              {member?.email?.substring(0, 2)}
            </Text>
            {member.status === MemberStatuses.CONFIRMED && (
              <View style={styles.choreCounter}>
                <Text style={styles.choreCounterText}>{getScore(props.activity, selectedMember?.email)}</Text>
              </View>
            )}
            {member.status !== MemberStatuses.CONFIRMED && <Text style={styles.pendingText}>Pending</Text>}
          </View>
        </TouchableOpacity>
      );
    });
  }
  function getChoreFeed() {
    return props.activity
      .filter((a: Activity) => selectedMember === null || a.completedByEmail === selectedMember.email)
      .map((a: Activity, index: number) => {
        return <ActivityCard key={index} activity={a} />;
      });
  }

  function PersonaImage() {
    return (
      <>
        <View style={styles.bigPersona}>
          <Text style={styles.bigPersonaText}>{selectedMember?.email?.substring(0, 2)}</Text>
        </View>
      </>
    );
  }

  return (
    <ImagePage
      Image={selectedMember !== null ? PersonaImage : HouseImage}
      titleText={selectedMember !== null ? selectedMember.email : props.householdName}
    >
      {selectedMember !== null ? (
        <Text style={styles.pointsText}>{getScore(props.activity, selectedMember.email) + ' Points'}</Text>
      ) : null}
      <View style={styles.members}>{getMembers()}</View>
      <ScrollView style={styles.chores}>
        {props.activity.length > 0 ? (
          getChoreFeed()
        ) : (
          <Text style={styles.noChoresMessage}>{'No chores recorded yet'}</Text>
        )}
      </ScrollView>
      <TouchableOpacity onPress={() => props.navigation.navigate('RecordAChore')} style={styles.button}>
        <Text style={styles.buttonText}>Record Chore</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  pointsText: {
    color: Colors.primary,
    lineHeight: 22,
    fontStyle: 'normal',
    fontSize: 16,
    marginBottom: 10,
  },
  gearIcon: {
    marginRight: 20,
  },
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 1,
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
    paddingLeft: 10,
  },
  members: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  chores: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: 300,
  },
  persona: {
    borderRadius: 56,
    width: 56,
    height: 56,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7E7E7',
  },
  selectedPersona: {
    borderRadius: 56,
    width: 56,
    height: 56,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B4B0FB',
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
    backgroundColor: '#B4B0FB',
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
    backgroundColor: Colors.primary,
  },
  choreCounterText: {
    color: Colors.background,
  },
  personaText: {
    fontSize: 24,
    lineHeight: 32,
    color: '#3F3D56',
  },
  selectedPesonaText: {
    fontSize: 24,
    lineHeight: 32,
    color: Colors.background,
  },
  bigPersonaText: {
    fontSize: 48,
    lineHeight: 58,
    color: Colors.background,
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
    backgroundColor: Colors.primary,
  },
  buttonText: {
    // fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.background,
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
    width: '80%',
  },
  noChoresMessage: {
    textAlign: 'center',
    width: '100%',
    color: Colors.secondary,
    marginTop: 40,
    fontSize: 16,
    lineHeight: 19,
  },
  pendingText: {
    position: 'absolute',
    color: Colors.secondary,
    fontSize: 14,
    lineHeight: 16,
    bottom: -20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewHouseholdC);
