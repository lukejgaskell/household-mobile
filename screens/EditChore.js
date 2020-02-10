import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { addChores, deleteChores, updateChores } from '../state/redux';

//@ts-ignore
import ChoresImage from '../assets/images/chores-icon.svg';
import Colors from '../constants/Colors';
import DismissKeyboardView from '../components/DismissKeyboardView';
import ImagePage from '../components/ImagePage';
import NavOptions from '../constants/NavOptions';
import { connect } from 'react-redux';
import { isMaxChores } from '../utilities/chores';

function EditChoreC({
  navigation,
  chores,
  updateChores,
  deleteChores,
  addChores
}) {
  const chore = navigation.getParam('chore', {});
  const [name, setName] = useState(chore.name || '');
  const [difficulty, setDifficulty] = useState(chore.difficulty || null);
  const [error, setError] = useState(null);

  function updatePress() {
    if (name.trim().length < 1 || difficulty === undefined) {
      setError('Please enter a name and difficulty');
    } else {
      if (chore.id) {
        updateChores({ id: chore.id, name, difficulty });
      } else {
        if (!isMaxChores(chores)) {
          addChores({ name, difficulty });
        } else {
          setError('Only 10 chores allowed at this time');
        }
      }
      navigation.navigate(NavOptions.EditChores);
      setError(null);
    }
  }

  function deletePress() {
    if (chore.id !== undefined) {
      deleteChores(chore.id);
    }
    navigation.navigate(NavOptions.EditChores);
  }

  function getButtons() {
    let buttons = [];
    for (let i = 1; i <= 5; i++) {
      buttons.push(
        <TouchableOpacity
          onPress={() => setDifficulty(i)}
          style={
            difficulty === i ? styles.roundButtonSelected : styles.roundButton
          }
          key={i}
        >
          <Text
            style={
              difficulty === i
                ? styles.roundButtonTextSelected
                : styles.roundButtonText
            }
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  }

  return (
    <ImagePage Image={ChoresImage} titleText={'Edit Chore'}>
      <DismissKeyboardView style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          autoCompleteType="off"
          onChangeText={(text) => setName(text)}
          placeholder="Chore Name"
          value={name}
        />
      </DismissKeyboardView>
      <View>
        <Text style={styles.leftText}>Chore Difficulty Points</Text>
      </View>
      <View style={styles.row}>{getButtons()}</View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.errorFiller} />
      )}
      <TouchableOpacity onPress={updatePress} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deletePress} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete Chore</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

EditChoreC.navigationOptions = {
  title: 'Household'
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%'
  },
  errorText: {
    marginTop: 20,
    color: Colors.error
  },
  errorFiller: {
    marginTop: 20,
    height: 17
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: Colors.background,
    color: Colors.secondary
  },
  inputWrapper: {
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1
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
    backgroundColor: Colors.primary
  },
  saveButtonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.background
  },
  deleteButton: {
    marginTop: 30,
    padding: 10
  },
  deleteButtonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    color: Colors.error
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
  leftText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.secondary,
    marginTop: 20,
    marginBottom: 30,
    width: '80%'
  },
  roundButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 42,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: Colors.primary
  },
  roundButtonText: {
    color: Colors.primary
  },
  roundButtonTextSelected: {
    color: Colors.background
  }
});

function mapStateToProps(state) {
  const { chores } = state;
  return { chores };
}

const mapDispatchToProps = {
  updateChores,
  deleteChores,
  addChores
};

export default connect(mapStateToProps, mapDispatchToProps)(EditChoreC);
