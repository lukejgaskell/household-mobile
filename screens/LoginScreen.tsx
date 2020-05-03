import * as Google from 'expo-google-app-auth';

import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { dispatchLoadCurrentUser, dispatchUpdateCurrentUser } from '../state/users/redux';

import { AppState } from '../state/store';
import Colors from '../constants/Colors';
import GoogleLogo from '../assets/images/google-icon.svg';
import ImagePage from '../components/ImagePage';
import LoginImage from '../assets/images/login-icon.svg';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState) {
  return {
    isLoadingCurrentUser: state.user.isLoadingCurrentUser,
    currentUser: state.user.currentUser,
  };
}

const mapDispatchToProps = {
  dispatchUpdateCurrentUser,
  dispatchLoadCurrentUser,
} as {
  dispatchUpdateCurrentUser: (idToken: string) => void;
  dispatchLoadCurrentUser: (idToken: string) => void;
};

type IOwnProps = {};
type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & IOwnProps;

function LoginScreenC(props: IProps) {
  useEffect(() => {
    props.dispatchLoadCurrentUser;
  }, []);

  async function loginWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: '677980014088-cnlr4aha88l921r2gr6jegfd4p8i3div.apps.googleusercontent.com',
      });

      if (result.type === 'success' && result.idToken) {
        props.dispatchUpdateCurrentUser(result.idToken);
      }
    } catch (e) {}
  }

  return (
    <ImagePage Image={LoginImage} titleText={'Welcome'}>
      <TouchableOpacity onPress={() => loginWithGoogle()} style={styles.loginButton}>
        <GoogleLogo />
        <Text style={styles.loginText}>Login With Google</Text>
      </TouchableOpacity>
    </ImagePage>
  );
}

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
    paddingLeft: 18,
  },
  loginText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.primary,
    marginLeft: 80,
  },
  facebookLogo: {
    marginLeft: 4,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenC);
