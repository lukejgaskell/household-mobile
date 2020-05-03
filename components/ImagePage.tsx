import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import DismissKeyboardView from './DismissKeyboardView';
import React from 'react';

type IProps = {
  children: any;
  Image: any;
  titleText: string;
  dismissKeyboard?: boolean;
  subText?: string | null;
};

export default function ImagePage(props: IProps) {
  const Container = props.dismissKeyboard ? DismissKeyboardView : View;
  return (
    <Container style={styles.container}>
      <View style={styles.imageGrouping}>
        <props.Image />
        <Text style={styles.welcomeText}>{props.titleText}</Text>
        <Text style={styles.text}>{props.subText}</Text>
        {props.children}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  welcomeText: {
    color: Colors.primary,
    lineHeight: 37,
    marginTop: 30,
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 32,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.secondary,
    marginTop: 20,
    width: '80%',
  },
  imageGrouping: {
    alignItems: 'center',
    marginTop: '10%',
  },
});
