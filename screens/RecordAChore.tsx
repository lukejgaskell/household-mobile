import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Activity } from '../state/activity/models';
import { AppState } from '../state/store';
import { Chore } from '../state/chores/models';
import ChoreCard from '../components/ChoreCard';
import Colors from '../constants/Colors';
import Page from '../components/Page';
import { RootStackParamList } from '../models';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { dispatchAddActivity } from '../state/activity/redux';

function mapStateToProps(state: AppState) {
  return { chores: state.chores.chores };
}

const mapDispatchToProps = {
  dispatchAddActivity,
} as {
  dispatchAddActivity: (activity: Activity) => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'RecordAChore'>;
type IOwnProps = {
  navigation: NavigationProp;
};
type IProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & IOwnProps;

function RecordAChoreC(props: IProps) {
  const [selectedChore, setSelectedChore] = useState<Chore | null>(null);
  const [error, setError] = useState('');

  async function submit() {
    try {
      setError('');
      if (!selectedChore) {
        setError('Please select a chore to record');
        return;
      }
      await props.dispatchAddActivity({
        choreName: selectedChore.name,
        points: selectedChore.difficulty,
      });
      props.navigation.navigate('ViewHousehold');
    } catch (e) {
      setError('An error occured while recording activity, please try again');
    }
  }

  function getChores() {
    let items: any[] = [];
    props.chores.forEach((chore, index) => {
      items.push(
        <ChoreCard key={index} chore={chore} onPress={setSelectedChore} isSelected={chore?.id === selectedChore?.id} />
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

const styles = StyleSheet.create({
  chores: {
    marginTop: 20,
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
    height: 47,
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.background,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordAChoreC);
