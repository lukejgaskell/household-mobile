import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { dispatchAddChore, dispatchDeleteChore, dispatchUpdateChore } from '../state/chores/redux';

import { AppState } from '../state/store';
import { Chore } from '../state/chores/models';
import ChoresImage from '../assets/images/chores-icon.svg';
import Colors from '../constants/Colors';
import ImagePage from '../components/ImagePage';
import { RootStackParamList } from '../models';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { isMaxChores } from '../utilities/chores';

function mapStateToProps(state: AppState) {
  return { chores: state.chores.chores };
}

const mapDispatchToProps = {
  dispatchUpdateChore,
  dispatchDeleteChore,
  dispatchAddChore,
} as {
  dispatchUpdateChore: (chore: Chore) => void;
  dispatchDeleteChore: (chore: Chore) => void;
  dispatchAddChore: (chore: Chore) => void;
};

type ScreenRouteProp = RouteProp<RootStackParamList, 'EditChore'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'EditChore'>;
type IOwnProps = {
  navigation: NavigationProp;
  route: ScreenRouteProp;
};
type IProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & IOwnProps;

function EditChoreC(props: IProps) {
  const chore = props.route.params?.chore;
  const [name, setName] = useState<string>(chore?.name || '');
  const [difficulty, setDifficulty] = useState<number | null>(chore?.difficulty || null);
  const [error, setError] = useState<string | null>(null);

  async function updatePress() {
    if (name.trim().length < 1 || difficulty === null || difficulty === undefined) {
      setError('Please enter a name and difficulty');
    } else {
      if (chore?.id) {
        try {
          await props.dispatchUpdateChore({ id: chore.id, name, difficulty });
          props.navigation.goBack();
          setError(null);
        } catch (e) {
          setError('failed to update chore, please try again');
        }
      } else {
        if (!isMaxChores(props.chores)) {
          try {
            props.dispatchAddChore({ name, difficulty });
            props.navigation.goBack();
            setError(null);
          } catch (e) {
            setError('failed to add chore, please try again');
          }
        } else {
          setError('Only 10 chores allowed at this time');
        }
      }
    }
  }

  async function deletePress() {
    if (chore?.id !== undefined) {
      try {
        await props.dispatchDeleteChore(chore);
        props.navigation.goBack();
      } catch (e) {
        setError('failed to delete chore, please try again');
      }
    } else {
      props.navigation.goBack();
    }
  }

  function getButtons() {
    let buttons = [];
    for (let i = 1; i <= 5; i++) {
      buttons.push(
        <TouchableOpacity
          onPress={() => setDifficulty(i)}
          style={difficulty === i ? styles.roundButtonSelected : styles.roundButton}
          key={i}
        >
          <Text style={difficulty === i ? styles.roundButtonTextSelected : styles.roundButtonText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  }

  return (
    <ImagePage Image={ChoresImage} dismissKeyboard={true} titleText={'Edit Chore'}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          autoCompleteType="off"
          onChangeText={(text) => setName(text)}
          placeholder="Chore Name"
          value={name}
        />
      </View>
      <View>
        <Text style={styles.leftText}>Chore Difficulty Points</Text>
      </View>
      <View style={styles.row}>{getButtons()}</View>
      {error ? <Text style={styles.errorText}>{error}</Text> : <View style={styles.errorFiller} />}
      <TouchableOpacity onPress={updatePress} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deletePress} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete Chore</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
  errorText: {
    marginTop: 20,
    color: Colors.error,
  },
  errorFiller: {
    marginTop: 20,
    height: 17,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: Colors.background,
    color: Colors.secondary,
    width: '100%',
  },
  inputWrapper: {
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
  },
  saveButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 60,
    marginTop: 10,
    alignItems: 'center',
    width: '40%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 47,
    backgroundColor: Colors.primary,
  },
  saveButtonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.background,
  },
  deleteButton: {
    marginTop: 30,
    padding: 10,
  },
  deleteButtonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    color: Colors.error,
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
  leftText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.secondary,
    marginTop: 20,
    marginBottom: 30,
    width: '80%',
  },
  roundButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 42,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonSelected: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 42,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  roundButtonText: {
    color: Colors.primary,
  },
  roundButtonTextSelected: {
    color: Colors.background,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditChoreC);
