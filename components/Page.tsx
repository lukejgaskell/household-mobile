import React, { Children } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import DismissKeyboardView from './DismissKeyboardView';

type IProps = {
  children: any;
  titleText: string;
  dismissKeyboard?: boolean;
  subText?: string | null;
};

export default function Page(props: IProps) {
  const Container = props.dismissKeyboard ? DismissKeyboardView : View;
  return (
    <Container style={styles.container}>
      <Text style={styles.welcomeText}>{props.titleText}</Text>
      {props.subText ? <Text style={styles.text}>{props.subText}</Text> : null}
      {props.children}
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
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
    marginBottom: 30,
    width: '80%',
  },
});
