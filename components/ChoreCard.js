import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/Colors';
import React from 'react';

export default function ChoreCard({ chore, onPress, isSelected }) {
  return (
    <TouchableOpacity onPress={() => onPress(chore)} style={styles.card}>
      <View style={isSelected ? styles.leftSelected : styles.left}>
        <Text style={isSelected ? styles.leftTextSelected : styles.leftText}>
          {chore.name}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.rightText}>{(chore.difficulty || 0) + ' Pts'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    width: 325,
    height: 50,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
  },
  leftSelected: {
    paddingLeft: 16,
    paddingRight: 8,
    height: '100%',
    width: '83%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  left: {
    paddingLeft: 16,
    paddingRight: 8,
    height: '100%',
    width: '83%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
  },
  leftText: {
    color: Colors.secondary,
  },
  leftTextSelected: {
    color: Colors.background,
  },
  right: {
    paddingLeft: 8,
    paddingRight: 8,
    borderLeftColor: Colors.background,
    borderLeftWidth: 1,
    height: '100%',
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
  },
  rightText: {
    color: Colors.background,
  },
});
