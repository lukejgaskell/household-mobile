import * as Google from 'expo-google-app-auth';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
// @ts-ignore
import GoogleLogo from '../assets/images/google-icon.svg';
import ImagePage from '../components/ImagePage';
// @ts-ignore
import LoginImage from '../assets/images/login-icon.svg';
import NavOptions from '../constants/NavOptions';
import React from 'react';
import { connect } from 'react-redux';
import { dispatchUpdateCurrentUser } from '../state/users/redux';

function LoginScreenC({ navigation, dispatchUpdateCurrentUser }) {
  async function loginWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          '677980014088-cnlr4aha88l921r2gr6jegfd4p8i3div.apps.googleusercontent.com'
      });
      if (result.type === 'success') {
        await dispatchUpdateCurrentUser(result.idToken);

        navigation.navigate(NavOptions.CreateHousehold);
      }
    } catch (e) {}
  }

  return (
    <ImagePage Image={LoginImage} titleText={'Welcome'}>
      <TouchableOpacity
        onPress={() => loginWithGoogle()}
        style={styles.loginButton}
      >
        <GoogleLogo />
        <Text style={styles.loginText}>Login With Google</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

LoginScreenC.navigationOptions = {
  title: 'Household'
};

const styles = StyleSheet.create({
  loginButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 60,
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 47,
    paddingLeft: 18
  },
  loginText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.primary,
    marginLeft: 80
  },
  facebookLogo: {
    marginLeft: 4
  }
});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = { dispatchUpdateCurrentUser };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenC);
