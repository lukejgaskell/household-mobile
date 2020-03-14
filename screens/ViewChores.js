import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ChoreCard from '../components/ChoreCard';
// @ts-ignore
import ChoresImage from '../assets/images/chores-icon.svg';
import Colors from '../constants/Colors';
import ImagePage from '../components/ImagePage';
import NavOptions from '../constants/NavOptions';
import { addChores } from '../state/chores/redux';
import { connect } from 'react-redux';

const suggestedChores = [
  {
    key: 1,
    name: 'Take out the Trash',
    difficulty: 1
  },
  {
    key: 2,
    name: 'Do the Dishes',
    difficulty: 3
  },
  {
    key: 3,
    name: 'Vacuum the Floors',
    difficulty: 4
  }
];

function ViewChoresC({ navigation, addChores }) {
  const [selectedChores, setSelectedChores] = useState([]);
  const [showError, setShowError] = useState(false);

  function submit() {
    if (selectedChores.length > 0) {
      selectedChores.forEach((sc) => {
        addChores(sc);
      });
      navigation.navigate(NavOptions.InviteRoomates);
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  function selectChore(chore) {
    if (selectedChores.filter((sc) => sc.key === chore.key).length > 0) {
      setSelectedChores([...selectedChores.filter((sc) => sc.key !== chore.key)]);
    } else {
      setSelectedChores([...selectedChores, chore]);
    }
  }

  function getChores() {
    let items = [];
    suggestedChores.forEach((chore, index) => {
      items.push(
        <ChoreCard
          key={index}
          chore={chore}
          isSelected={selectedChores.filter((sc) => sc.key === chore.key).length > 0}
          onPress={() => selectChore(chore)}
        />
      );
    });
    return items;
  }

  return (
    <ImagePage Image={ChoresImage} titleText={'Chores'}>
      <View style={styles.chores}>{getChores()}</View>
      {showError ? (
        <Text style={styles.errorText}>Please select at least one option.</Text>
      ) : (
        <View style={styles.errorTextFiller}></View>
      )}
      <TouchableOpacity onPress={() => submit()} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

ViewChoresC.navigationOptions = {
  title: 'Household'
};

const styles = StyleSheet.create({
  chores: {},
  errorText: {
    marginTop: 20,
    color: Colors.error
  },
  errorTextFiller: {
    marginTop: 37
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 60,
    marginTop: 10,
    alignItems: 'center',
    width: '40%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 47
  },
  buttonText: {
    // fontFamily: 'Roboto',
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
  return {};
}

const mapDispatchToProps = {
  addChores
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewChoresC);
