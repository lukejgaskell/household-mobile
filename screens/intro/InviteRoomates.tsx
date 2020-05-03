import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AppState } from '../../state/store';
import Colors from '../../constants/Colors';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import ImagePage from '../../components/ImagePage';
import InviteRoomatesImage from '../../assets/images/invite-roomates-icon.svg';
import { Ionicons } from '@expo/vector-icons';
import { Member } from '../../state/members/models';
import { StackNavigationProp } from '@react-navigation/stack';
import { WelcomeStackParamList } from '../../models';
import { connect } from 'react-redux';
import { dispatchAddMembers } from '../../state/members/redux';
import { dispatchUpdateUserStatus } from '../../state/users/redux';

function mapStateToProps(state: AppState) {
  return {};
}

const mapDispatchToProps = {
  dispatchAddMembers,
  dispatchUpdateUserStatus,
} as {
  dispatchAddMembers: (member: Member[]) => void;
  dispatchUpdateUserStatus: (showWelcome: boolean) => void;
};

type NavigationProp = StackNavigationProp<WelcomeStackParamList, 'InviteRoomates'>;
type IOwnProps = {
  navigation: NavigationProp;
};
type IProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & IOwnProps;

function InviteRoomatesC(props: IProps) {
  const [emails, setEmails] = useState(['']);
  const [error, setError] = useState('');

  async function submit() {
    const invalidEmails = emails.some((e) => e.trim().length < 3 || !e.includes('@'));
    if (invalidEmails) {
      setError('Please enter valid emails');
    } else {
      const members = emails.map((email) => ({
        email: email,
      }));
      try {
        props.dispatchAddMembers(members);
        props.dispatchUpdateUserStatus(false);
        setError('');
      } catch (e) {
        setError('An error occured while adding members, please try again');
      }
    }
  }

  function skip() {
    props.dispatchUpdateUserStatus(false);
  }

  function addEmail() {
    if (emails.length > 3) {
      setError('Only 4 emails allowed, you can add more later');
    } else {
      setEmails([...emails, '']);
    }
  }

  function getEmails() {
    let items: any[] = [];
    emails.forEach((email, index) => {
      items.push(
        <DismissKeyboardView style={styles.inputWrapper} key={index}>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCompleteType="off"
            onChangeText={(text) => {
              emails[index] = text;
              setEmails([...emails]);
            }}
            placeholder="Enter Email Address"
            value={email}
          />
        </DismissKeyboardView>
      );
    });
    return items;
  }

  return (
    <ImagePage Image={InviteRoomatesImage} dismissKeyboard={true} titleText={'Invite Roomates'}>
      <View style={styles.chores}>{getEmails()}</View>
      <TouchableOpacity onPress={() => addEmail()} style={styles.addButton}>
        <Ionicons name="ios-add" size={32} color="white" />
      </TouchableOpacity>
      <Text style={styles.errorText}>{error}</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => skip()} style={styles.defaultButton}>
          <Text style={styles.defaultButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => submit()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Invite</Text>
        </TouchableOpacity>
      </View>
    </ImagePage>
  );
}

const styles = StyleSheet.create({
  chores: {
    marginTop: 20,
  },
  errorText: {
    color: Colors.error,
  },
  errorFiller: {
    height: 17,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 60,
    marginTop: 30,
    alignItems: 'center',
    width: '35%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 47,
  },
  primaryButtonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.background,
  },
  defaultButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 60,
    marginTop: 30,
    alignItems: 'center',
    width: '35%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 47,
  },
  defaultButtonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.primary,
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
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: Colors.background,
    width: '100%',
    color: Colors.secondary,
  },
  inputWrapper: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#AFAFAF',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    flexDirection: 'row',
    width: 325,
    height: 50,
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

export default connect(mapStateToProps, mapDispatchToProps)(InviteRoomatesC);
