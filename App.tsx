import * as Font from 'expo-font';

import { AppState, store } from './state/store';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { AppLoading } from 'expo';
import Authorizer from './Authorizer';
import CreateHousehold from './screens/intro/CreateHousehold';
import InviteRoomates from './screens/intro/InviteRoomates';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './models';
import ViewChores from './screens/intro/ViewChores';
import { createStackNavigator } from '@react-navigation/stack';
import { dispatchLoadCurrentUser } from './state/users/redux';

const Stack = createStackNavigator<RootStackParamList>();

type IOwnProps = {
  skipLoadingScreen: boolean;
};
type IProps = IOwnProps;

export default function App(props: IProps) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <Authorizer />
      </View>
    </Provider>
  );
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      // @ts-ignore
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete: (val: boolean) => void) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
