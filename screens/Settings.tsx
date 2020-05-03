import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { AppState } from '../state/store';
import Colors from '../constants/Colors';
import Page from '../components/Page';
import { RootStackParamList } from '../models';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState) {
  return { householdName: state.house.householdName };
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
type IOwnProps = {
  navigation: NavigationProp;
};
type IProps = ReturnType<typeof mapStateToProps> & IOwnProps;

function SettingsC(props: IProps) {
  return (
    <Page titleText={props.householdName}>
      <TouchableOpacity onPress={() => props.navigation.navigate('EditChores')} style={styles.button}>
        <Text style={styles.buttonText}>Edit Chores</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('EditRoomates')} style={styles.button}>
        <Text style={styles.buttonText}>Edit Roomates</Text>
      </TouchableOpacity>
    </Page>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingTop: 10,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowLeft: {
    width: 325,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.primary,
  },
  text: {
    color: Colors.secondary,
    paddingTop: 5,
    paddingBottom: 5,
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
    height: 47,
  },
});

export default connect(mapStateToProps)(SettingsC);
