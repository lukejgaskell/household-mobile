import { LoginStackParamList, RootStackParamList, WelcomeStackParamList } from './models';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppLoading } from 'expo';
import { AppState } from './state/store';
import CreateHousehold from './screens/intro/CreateHousehold';
import EditChore from './screens/EditChore';
import EditChores from './screens/EditChores';
import EditRoomates from './screens/EditRoomates';
import InviteRoomates from './screens/intro/InviteRoomates';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import RecordAChore from './screens/RecordAChore';
import Settings from './screens/Settings';
import ViewChores from './screens/intro/ViewChores';
import ViewHousehold from './screens/ViewHousehold';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { dispatchLoadCurrentUser } from './state/users/redux';

const RootStack = createStackNavigator<RootStackParamList>();
const WelcomeStack = createStackNavigator<WelcomeStackParamList>();
const LoginStack = createStackNavigator<LoginStackParamList>();

function mapStateToProps(state: AppState) {
  return {
    isLoadingCurrentUser: state.user.isLoadingCurrentUser,
    currentUser: state.user.currentUser,
  };
}

const mapDispatchToProps = {
  dispatchLoadCurrentUser,
} as {
  dispatchLoadCurrentUser: () => void;
};

type IOwnProps = {};
type IProps = IOwnProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function AuthorizerC(props: IProps) {
  useEffect(() => {
    props.dispatchLoadCurrentUser();
  }, []);

  if (props.isLoadingCurrentUser) {
    return <AppLoading />;
  }

  if (!props.currentUser?.accessToken) {
    return (
      <NavigationContainer>
        <LoginStack.Navigator initialRouteName="Login">
          <LoginStack.Screen name="Login" component={LoginScreen} options={{ title: 'Household' }} />
        </LoginStack.Navigator>
      </NavigationContainer>
    );
  }

  if (props.currentUser?.showWelcome) {
    return (
      <NavigationContainer>
        <WelcomeStack.Navigator initialRouteName="CreateHousehold">
          <WelcomeStack.Screen name="CreateHousehold" component={CreateHousehold} options={{ title: 'Household' }} />
          <WelcomeStack.Screen name="InviteRoomates" component={InviteRoomates} options={{ title: 'Household' }} />
          <WelcomeStack.Screen name="ViewChores" component={ViewChores} options={{ title: 'Household' }} />
        </WelcomeStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="ViewHousehold">
        <RootStack.Screen
          name="ViewHousehold"
          component={ViewHousehold}
          options={(props) => ({
            title: 'Household',
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 20 }} onPress={() => props.navigation.navigate('Settings')}>
                <Ionicons name="ios-cog" size={32} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <RootStack.Screen name="EditChore" component={EditChore} options={{ title: 'Household' }} />
        <RootStack.Screen name="RecordAChore" component={RecordAChore} options={{ title: 'Household' }} />
        <RootStack.Screen name="Settings" component={Settings} options={{ title: 'Household' }} />
        <RootStack.Screen name="EditChores" component={EditChores} options={{ title: 'Household' }} />
        <RootStack.Screen name="EditRoomates" component={EditRoomates} options={{ title: 'Household' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizerC);
