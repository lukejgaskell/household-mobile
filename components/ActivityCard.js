import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import React from 'react';

export default function ActivityCard({ activity }) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.leftText}>{activity.points + ' Pts'}</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.row}>
          <Text style={styles.completedBy}>{activity.completedBy}</Text>
          <Text style={styles.rightText}>{' completed'}</Text>
        </View>
        <Text style={styles.choreName}>{activity.name}</Text>
      </View>
      <Text style={styles.choreDate}>{activity.completedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1.25,
    elevation: 2,
    backgroundColor: Colors.background,
    borderRadius: 12,
    height: 64,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  left: {
    height: '100%',
    width: '17%',
    borderBottomLeftRadius: 11,
    borderTopLeftRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  leftText: {
    color: Colors.background,
  },
  right: {
    paddingLeft: 12,
    justifyContent: 'center',
    height: '100%',
    width: '60%',
    borderTopRightRadius: 11,
    borderBottomRightRadius: 11,
  },
  rightText: {
    color: Colors.secondary,
  },
  completedBy: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  choreName: {
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  choreDate: {
    top: 5,
    alignSelf: 'flex-start',
    color: Colors.primary,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
  },
});
