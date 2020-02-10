import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import React from 'react';

export default function ImagePage({
  children,
  Image,
  titleText,
  subText = null
}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageGrouping}>
        <Image />
        <Text style={styles.welcomeText}>{titleText}</Text>
        <Text style={styles.text}>{subText}</Text>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
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
    width: '80%'
  },
  imageGrouping: {
    alignItems: 'center',
    marginTop: '10%'
  }
});
