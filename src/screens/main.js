// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useContext} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {StateContext} from '../utilities/stateContext';
import {AuthContext} from '../utilities/authContext';
import AsyncStorage from '@react-native-community/async-storage';

const Main = ({}) => {
  const stateContext = useContext(StateContext);
  const {signOut} = useContext(AuthContext);
  const {UserData} = stateContext;

  const setAsync = async () => {
    signOut();
    AsyncStorage.removeItem("UserData");
  }

  return (
    <ScrollView contentContainerStyle={{flex:1, marginTop: 20}}>
      <Text
        style={{
          textAlign: 'center',
          paddingVertical: 20,
          color: '#9933ff',
          fontSize: 28,
        }}>
        Welcome, {UserData}
      </Text>
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <View style={{padding: 40, alignItems: 'center'}}>
          <Text style={{fontSize: 16}}>
            {' '}
            Press the down button and see if it works
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={setAsync}>
          <Text style={styles.buttonTextStyle}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Main;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#9933ff',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#9933ff',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
