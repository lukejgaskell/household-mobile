import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ChoreCard from '../components/ChoreCard';
import Colors from '../constants/Colors';
import NavOptions from '../constants/NavOptions';
import Page from '../components/Page';
import { addActivity } from '../state/redux';
import { connect } from 'react-redux';
import { getCurrentDate } from '../utilities/date';

function RecordAChoreC({ navigation, chores, addActivity, currentUser }) {
  const [selectedChore, setSelectedChore] = useState(null);

  function submit() {
    addActivity({
      name: selectedChore?.name,
      points: selectedChore?.difficulty,
      completedById: currentUser?.id,
      completedBy: currentUser?.name,
      completedDate: getCurrentDate()
    });
    navigation.navigate(NavOptions.ViewHousehold);
  }

  function getChores() {
    let items = [];
    chores.forEach((chore, index) => {
      items.push(
        <ChoreCard
          key={index}
          chore={chore}
          onPress={setSelectedChore}
          isSelected={chore?.id === selectedChore?.id}
        />
      );
    });
    return items;
  }

  return (
    <Page titleText={'Record a chore'}>
      <View style={styles.chores}>{getChores()}</View>
      {selectedChore !== null ? (
        <TouchableOpacity onPress={() => submit()} style={styles.button}>
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      ) : null}
    </Page>
  );
}

RecordAChoreC.navigationOptions = {
  title: 'Household'
};

const styles = StyleSheet.create({
  chores: {
    marginTop: 20
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    borderRadius: 60,
    marginTop: 40,
    alignItems: 'center',
    width: '40%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 47
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.background
  }
});

function mapStateToProps(state) {
  const { chores, currentUser } = state;

  return { chores, currentUser };
}

const mapDispatchToProps = {
  addActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordAChoreC);
