import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { addMembers, deleteMembers } from '../state/redux';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import NavOptions from '../constants/NavOptions';
import Page from '../components/Page';
import { connect } from 'react-redux';

function EditRoomatesC({ navigation, members, addMembers, deleteMembers }) {
  const [emails, setEmails] = useState([]);
  const [showError, setShowError] = useState(false);

  function inviteMembers() {
    const invalidEmails = emails.some(
      (e) => e.trim().length === 0 || !e.includes('@')
    );
    if (invalidEmails) {
      setShowError(true);
    } else {
      emails.forEach((email) => {
        addMembers({
          email,
          name: email,
          status: 'pending',
          initials: email.substring(0, 2).toUpperCase()
        });
      });
      navigation.navigate(NavOptions.ViewHousehold);
      setShowError(false);
    }
  }

  function getEmails() {
    let items = [];
    members.forEach((m, index) => {
      items.push(
        <View style={styles.emailWrapper} key={'o' + index}>
          <Text style={styles.emailText}>{m.email}</Text>
          <TouchableOpacity onPress={() => deleteMembers(m.id)}>
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
      <TouchableOpacity
        onPress={() => setEmails([...emails, ''])}
        style={styles.addButton}
      >
        <Ionicons name="ios-add" size={32} color="white" />
      </TouchableOpacity>
      {showError ? (
        <Text style={styles.errorText}>Please enter valid emails</Text>
      ) : (
        <View style={styles.errorFiller}></View>
      )}
      <TouchableOpacity onPress={() => inviteMembers()} style={styles.button}>
        <Text style={styles.buttonText}>Invite</Text>
      </TouchableOpacity>
    </Page>
  );
}

EditRoomatesC.navigationOptions = {
  title: 'Household'
};

const styles = StyleSheet.create({
  emails: {
    marginTop: 20
  },
  errorText: {
    color: Colors.error
  },
  errorFiller: {
    height: 17
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
  input: {
    width: '100%',
    color: Colors.secondary
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
    height: 50
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
    height: 50
  },
  emailText: {
    color: Colors.secondary
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
  const { members } = state;

  return { members };
}

const mapDispatchToProps = {
  addMembers,
  deleteMembers
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRoomatesC);
