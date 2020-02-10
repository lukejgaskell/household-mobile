import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { addMembers, setHouseholdName } from '../state/redux';

import Colors from '../constants/Colors';
// @ts-ignore
import CreateHouseholdImage from '../assets/images/create-household-icon.svg';
import DismissKeyboardView from '../components/DismissKeyboardView';
import ImagePage from '../components/ImagePage';
import NavOptions from '../constants/NavOptions';
import { connect } from 'react-redux';

function CreateHouseholdC({
  navigation,
  setHouseholdName,
  householdName,
  addMembers,
  members,
  currentUser
}) {
  const [showError, setShowError] = useState(false);

  function submit() {
    if (householdName.length < 1) {
      setShowError(true);
    } else {
      if (members.filter((m) => m.id === currentUser.id).length === 0) {
        addMembers({
          name: currentUser.name,
          email: currentUser.email,
          id: currentUser.id,
          initials: currentUser.initials,
          status: currentUser.status
        });
      }
      navigation.navigate(NavOptions.ViewChores);
      setShowError(false);
    }
  }

  return (
    <ImagePage
      Image={CreateHouseholdImage}
      titleText={'Create Household'}
      subText={
        'Create a household to begin tracking chores and make your house work fun!'
      }
    >
      <DismissKeyboardView style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          autoCompleteType="off"
          onChangeText={(text) => setHouseholdName(text)}
          placeholder="Household Name"
          value={householdName}
        />
      </DismissKeyboardView>
      {showError ? (
        <Text style={styles.errorText}>Please enter a household name</Text>
      ) : (
        <View style={styles.errorFiller}></View>
      )}
      <TouchableOpacity onPress={() => submit()} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

CreateHouseholdC.navigationOptions = {
  title: 'Household'
};

const styles = StyleSheet.create({
  errorText: {
    color: Colors.error
  },
  errorFiller: {
    height: 17
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',

    color: '#424242'
  },
  inputWrapper: {
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1
  },
  welcomeText: {
    color: Colors.primary,
    lineHeight: 37,
    marginTop: 30,
    // fontFamily: "Roboto",
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 32
  },
  contentContainer: {},
  imageGrouping: {
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: 20
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 60,
    marginTop: 40,
    alignItems: 'center',
    width: '50%',
    marginLeft: '5%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 47
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.primary
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
  }
});

function mapStateToProps(state) {
  const { householdName, currentUser, members } = state;
  return { householdName, currentUser, members };
}

const mapDispatchToProps = {
  setHouseholdName,
  addMembers
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateHouseholdC);
