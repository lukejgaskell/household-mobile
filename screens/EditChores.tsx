import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppState } from '../state/store';
import ChoreCard from '../components/ChoreCard';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Page from '../components/Page';
import React from 'react';
import { RootStackParamList } from '../models';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { isMaxChores } from '../utilities/chores';

function mapStateToProps(state: AppState) {
  return { chores: state.chores.chores };
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'EditChores'>;
type IOwnProps = {
  navigation: NavigationProp;
};
type IProps = ReturnType<typeof mapStateToProps> & IOwnProps;

function EditChoresC(props: IProps) {
  function getChores() {
    let items: any[] = [];
    props.chores.forEach((chore, index) => {
      items.push(
        <ChoreCard
          key={index}
          chore={chore}
          isSelected={false}
          onPress={() => props.navigation.navigate('EditChore', { chore })}
        />
      );
    });
    return items;
  }

  return (
    <Page titleText={'Edit Chores'}>
      <View style={styles.chores}>{getChores()}</View>
      {!isMaxChores(props.chores) ? (
        <TouchableOpacity onPress={() => props.navigation.navigate('EditChore')} style={styles.addButton}>
          <Ionicons name="ios-add" size={32} color="white" />
        </TouchableOpacity>
      ) : null}
    </Page>
  );
}

const styles = StyleSheet.create({
  chores: {
    marginTop: 20,
  },
  text: {
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
  addButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 34,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginTop: 15,
    marginBottom: 10,
  },
});

export default connect(mapStateToProps)(EditChoresC);
