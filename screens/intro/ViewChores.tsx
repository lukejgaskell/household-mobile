import React, { useState } from 'react';
import { RootStackParamList, WelcomeStackParamList } from '../../models';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AppState } from '../../state/store';
import { Chore } from '../../state/chores/models';
import ChoreCard from '../../components/ChoreCard';
import ChoresImage from '../../assets/images/chores-icon.svg';
import Colors from '../../constants/Colors';
import ImagePage from '../../components/ImagePage';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { dispatchAddChores } from '../../state/chores/redux';

const suggestedChores: Chore[] = [
  {
    name: 'Take out the Trash',
    difficulty: 1,
  },
  {
    name: 'Do the Dishes',
    difficulty: 3,
  },
  {
    name: 'Vacuum the Floors',
    difficulty: 4,
  },
];

function mapStateToProps(state: AppState) {
  return {};
}

const mapDispatchToProps = {
  dispatchAddChores,
} as { dispatchAddChores: (chore: Chore[]) => void };

type NavigationProp = StackNavigationProp<WelcomeStackParamList, 'ViewChores'>;
type IOwnProps = {
  navigation: NavigationProp;
};
type IProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & IOwnProps;

function ViewChoresC(props: IProps) {
  const [selectedChores, setSelectedChores] = useState<Chore[]>([]);
  const [error, setError] = useState('');

  async function submit() {
    setError('');
    if (selectedChores.length > 0) {
      try {
        props.dispatchAddChores(selectedChores, () => {
          props.navigation.navigate('InviteRoomates');
        });
      } catch (e) {
        setError('An error occured while adding chores, please try again');
      }
    } else {
      setError('Please select at least one option.');
    }
  }

  function selectChore(chore: Chore) {
    if (selectedChores.filter((sc: Chore) => sc.name === chore.name).length > 0) {
      setSelectedChores([...selectedChores.filter((sc: Chore) => sc.name !== chore.name)]);
    } else {
      setSelectedChores([...selectedChores, chore]);
    }
  }

  function getChores() {
    let items: any[] = [];
    suggestedChores.forEach((chore, index) => {
      items.push(
        <ChoreCard
          key={index}
          chore={chore}
          isSelected={selectedChores.filter((sc) => sc.name === chore.name).length > 0}
          onPress={() => selectChore(chore)}
        />
      );
    });
    return items;
  }

  return (
    <ImagePage Image={ChoresImage} titleText={'Chores'}>
      <View style={styles.chores}>{getChores()}</View>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity onPress={() => submit()} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

ViewChoresC.navigationOptions = {
  title: 'Household',
};

const styles = StyleSheet.create({
  chores: {},
  errorText: {
    marginTop: 20,
    color: Colors.error,
  },
  errorTextFiller: {
    marginTop: 37,
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
    height: 47,
  },
  buttonText: {
    // fontFamily: 'Roboto',
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewChoresC);
