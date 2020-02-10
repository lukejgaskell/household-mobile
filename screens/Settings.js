import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import NavOptions from '../constants/NavOptions';
import Page from '../components/Page';
import { connect } from 'react-redux';

function SettingsC({ navigation, householdName }) {
  return (
    <Page titleText={householdName}>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavOptions.EditChores)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Edit Chores</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavOptions.EditRoomates)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Edit Roomates</Text>
      </TouchableOpacity>
    </Page>
  );
}

SettingsC.navigationOptions = {
  title: 'Household'
};

const styles = StyleSheet.create({
  row: {
    paddingTop: 10,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  rowLeft: {
    width: 325,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row'
  },
  buttonText: {
    color: Colors.primary
  },
  text: {
    color: Colors.secondary,
    paddingTop: 5,
    paddingBottom: 5
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 60,
    marginTop: 40,
    alignItems: 'center',
    width: '70%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 47
  }
});

function mapStateToProps(state) {
  const { householdName } = state;

  return { householdName };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsC);
