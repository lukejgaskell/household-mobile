import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
// @ts-ignore
import FacebookLogo from '../assets/images/facebook-icon.svg';
// @ts-ignore
import GoogleLogo from '../assets/images/google-icon.svg';
import ImagePage from '../components/ImagePage';
// @ts-ignore
import LoginImage from '../assets/images/login-icon.svg';
import NavOptions from '../constants/NavOptions';
import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../state/redux';

function LoginScreenC({ navigation, setCurrentUser }) {
  function login() {
    setCurrentUser({
      name: 'Me',
      id: 0,
      initials: 'ME',
      email: 'me@gmail.com',
      status: 'active'
    });
    navigation.navigate(NavOptions.CreateHousehold);
  }
  return (
    <ImagePage Image={LoginImage} titleText={'Welcome'}>
      <TouchableOpacity onPress={() => login()} style={styles.loginButton}>
        <GoogleLogo />
        <Text style={styles.loginText}>Login With Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => login()} style={styles.loginButton}>
        <FacebookLogo style={styles.facebookLogo} />
        <Text style={styles.loginText}>Login With Facebook</Text>
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

const mapDispatchToProps = { setCurrentUser };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenC);
