import React, { Children } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

export default function Page({ children, titleText, subText = null }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{titleText}</Text>
      {subText ? <Text style={styles.text}>{subText}</Text> : null}
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center'
  },
  welcomeText: {
    color: Colors.primary,
    lineHeight: 37,
    marginTop: 30,
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 32
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
  }
});
