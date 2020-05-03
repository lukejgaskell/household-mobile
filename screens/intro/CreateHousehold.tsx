import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AppState } from '../../state/store';
import Colors from '../../constants/Colors';
import CreateHouseholdImage from '../../assets/images/create-household-icon.svg';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import ImagePage from '../../components/ImagePage';
import { StackNavigationProp } from '@react-navigation/stack';
import { WelcomeStackParamList } from '../../models';
import { connect } from 'react-redux';
import { dispatchCreateHousehold } from '../../state/household/redux';

function mapStateToProps(state: AppState) {
  return { householdName: state.house.householdName };
}

const mapDispatchToProps = {
  dispatchCreateHousehold,
} as { dispatchCreateHousehold: (name: string) => void };

type NavigationProp = StackNavigationProp<WelcomeStackParamList, 'CreateHousehold'>;
type IOwnProps = {
  navigation: NavigationProp;
};
type IProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & IOwnProps;

function CreateHouseholdC(props: IProps) {
  const [showError, setShowError] = useState(false);
  const [householdName, setHouseholdName] = useState('');

  async function submit() {
    if (householdName.length < 1) {
      setShowError(true);
    } else {
      await props.dispatchCreateHousehold(householdName);
      props.navigation.navigate('ViewChores');
      setShowError(false);
    }
  }

  return (
    <ImagePage
      Image={CreateHouseholdImage}
      titleText={'Create Household'}
      subText={'Create a household to begin tracking chores and make your house work fun!'}
      dismissKeyboard={true}
    >
      <DismissKeyboardView style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          autoCompleteType="off"
          onChangeText={setHouseholdName}
          placeholder="Household Name"
          value={householdName}
        />
      </DismissKeyboardView>
      {showError ? (
        <Text style={styles.errorText}>Please enter a household name</Text>
      ) : (
        <View style={styles.errorFiller}></View>
      )}
      <TouchableOpacity onPress={submit} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

CreateHouseholdC.navigationOptions = {
  title: 'Household',
};

const styles = StyleSheet.create({
  errorText: {
    color: Colors.error,
  },
  errorFiller: {
    height: 17,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',

    width: '100%',
    color: Colors.secondary,
  },
  inputWrapper: {
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
  },
  welcomeText: {
    color: Colors.primary,
    lineHeight: 37,
    marginTop: 30,
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 32,
  },
  contentContainer: {},
  imageGrouping: {
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: 20,
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 60,
    marginTop: 25,
    alignItems: 'center',
    width: '50%',
    marginLeft: '5%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 47,
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.primary,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateHouseholdC);
