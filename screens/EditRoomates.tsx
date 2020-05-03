import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { dispatchAddMembers, dispatchDeleteMember } from '../state/members/redux';

import { AppState } from '../state/store';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Member } from '../state/members/models';
import Page from '../components/Page';
import { RootStackParamList } from '../models';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState) {
  return { members: state.members.members };
}

const mapDispatchToProps = {
  dispatchAddMembers,
  dispatchDeleteMember,
} as {
  dispatchAddMembers: (members: Member[]) => void;
  dispatchDeleteMember: (member: Member) => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EditRoomates'>;
type IOwnProps = {
  navigation: NavigationProp;
};
type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & IOwnProps;

function EditRoomatesC(props: IProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState('');

  async function inviteMembers() {
    const invalidEmails = emails.some((e: string) => e.trim().length === 0 || !e.includes('@'));
    if (invalidEmails) {
      setError('Please enter valid emails');
    } else {
      const members = emails.map((email) => {
        return { email };
      });
      try {
        await props.dispatchAddMembers(members);
        props.navigation.navigate('ViewHousehold');
        setError('');
      } catch (e) {
        setError('An error occured while adding members, please try again');
      }
    }
  }

  function getEmails() {
    let items: any = [];
    props.members.forEach((m: Member, index: number) => {
      items.push(
        <View style={styles.emailWrapper} key={'o' + index}>
          <Text style={styles.emailText}>{m.email}</Text>
          <TouchableOpacity onPress={() => props.dispatchDeleteMember(m)}>
            <Ionicons name="ios-close" size={32} color="red" />
          </TouchableOpacity>
        </View>
      );
    });

    emails.forEach((email, index) => {
      items.push(
        <View style={styles.inputWrapper} key={'n' + index}>
          <TextInput
            style={styles.input}
            autoCompleteType="off"
            onChangeText={(text) => {
              emails[index] = text;
              setEmails([...emails]);
            }}
            placeholder="Enter Email Address"
            value={email}
          />
        </View>
      );
    });
    return items;
  }

  return (
    <Page titleText={'Edit Roomates'} dismissKeyboard={true}>
      <View style={styles.emails}>{getEmails()}</View>
      <TouchableOpacity onPress={() => setEmails([...emails, ''])} style={styles.addButton}>
        <Ionicons name="ios-add" size={32} color="white" />
      </TouchableOpacity>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity onPress={() => inviteMembers()} style={styles.button}>
        <Text style={styles.buttonText}>Invite</Text>
      </TouchableOpacity>
    </Page>
  );
}

const styles = StyleSheet.create({
  emails: {
    marginTop: 20,
  },
  errorText: {
    color: Colors.error,
  },
  errorFiller: {
    height: 17,
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
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
    flexDirection: 'row',
    width: 325,
    height: 50,
  },
  emailWrapper: {
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 325,
    height: 50,
  },
  emailText: {
    color: Colors.secondary,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditRoomatesC);
