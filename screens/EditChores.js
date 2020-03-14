import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ChoreCard from '../components/ChoreCard';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import NavOptions from '../constants/NavOptions';
import Page from '../components/Page';
import React from 'react';
import { connect } from 'react-redux';
import { dispatchAddChore } from '../state/chores/redux';
import { isMaxChores } from '../utilities/chores';

function EditChoresC({ navigation, chores, dispatchAddChore }) {
  function getChores() {
    let items = [];
    chores.forEach((chore, index) => {
      items.push(
        <ChoreCard
          key={index}
          chore={chore}
          isSelected={false}
          onPress={() => navigation.navigate(NavOptions.EditChore, { chore })}
        />
      );
    });
    return items;
  }

  return (
    <Page titleText={'Edit Chores'}>
      <View style={styles.chores}>{getChores()}</View>
      {!isMaxChores(chores) ? (
        <TouchableOpacity
          onPress={() => navigation.navigate(NavOptions.EditChore, {})}
          style={styles.addButton}
        >
          <Ionicons name="ios-add" size={32} color="white" />
        </TouchableOpacity>
      ) : null}
    </Page>
  );
}

EditChoresC.navigationOptions = {
  title: 'Household'
};

const styles = StyleSheet.create({
  chores: {
    marginTop: 20
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
    width: '80%'
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
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  const { chores } = state;

  return { chores };
}

const mapDispatchToProps = {
  dispatchAddChore
};

export default connect(mapStateToProps, mapDispatchToProps)(EditChoresC);
