// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

import Loader from '../loading';

const Auth = ({doLogin}) => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [stateF, setState] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [error, setError] = useState('');

  const lastNameRef = createRef();
  const emailRef = createRef();
  const mobileRef = createRef();
  const passwordRef = createRef();
  const passwordInputRef = createRef();

  function validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  function validateMobile(email) {
    const regexp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return regexp.test(email);
  }

  function validatePassword(password) {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,20}$/;
    return regexp.test(password);
  }

  const handleSubmitPress = () => {
    if (!firstName) {
      setErrortext('*Please enter your firstname.');
      setError('first');
      return;
    }
    if (!lastName) {
      setErrortext('*Please enter your lastname.');
      setError('last');
      return;
    }
    if (!email) {
      setErrortext('*Please enter your email address.');
      setError('email');
      return;
    }
    if (!validateEmail(email)) {
      setErrortext('*Please enter valid email address.');
      setError('email');
      return;
    }
    if (!mobile) {
      setErrortext('*Please enter your mobile number.');
      setError('mobile');
      return;
    }
    if (!validateMobile(mobile)) {
      setErrortext('*Please enter valid mobile number.');
      setError('mobile');
      return;
    }
    if (!stateF) {
      setErrortext('*Please select state.');
      setError('state');
      return;
    }
    if (!city) {
      setErrortext('*Please select city.');
      setError('city');
      return;
    }
    if (!password) {
      setErrortext('*Please enter your password.');
      setError('password');
      return;
    }
    if (!validatePassword(password)) {
      setErrortext(
        '*The password must have 8 characters, contains at least one capital letter, one small letter, one special character, and one digit.',
      );
      setError('password');
      return;
    }
    if (!newpassword) {
      setErrortext('*Please enter your confirm password.');
      setError('newpassword');
      return;
    }
    if (!validatePassword(newpassword)) {
      setErrortext(
        '*The password must have 8 characters, contains at least one capital letter, one small letter, one special character, and one digit.',
      );
      setError('newpassword');
      return;
    }
    if (password !== newpassword) {
      setErrortext('*Password and confirm password does not match.');
      setError('newpassword');
      return;
    }
    setLoading(true);
    setAsync(firstName);
  };

  const setAsync = async UserData => {
    AsyncStorage.setItem('UserData', UserData);
    doLogin(UserData);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView contentContainerStyle={{marginTop: 20}}>
      <Text
        style={{
          textAlign: 'center',
          paddingVertical: 20,
          color: '#9933ff',
          fontSize: 28,
        }}>
        Register
      </Text>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={firstname => {
            setError('');
            setErrortext('');
            setFirstname(firstname);
          }}
          placeholder="Enter Firstname"
          autoCapitalize="words"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          maxLength={20}
          returnKeyType="next"
          onSubmitEditing={() =>
            lastNameRef.current && lastNameRef.current.focus()
          }
        />
      </View>
      {error == 'first' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={lastname => {
            setError('');
            setErrortext('');
            setLastname(lastname);
          }}
          placeholder="Enter Lastname"
          autoCapitalize="words"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          maxLength={20}
          returnKeyType="next"
          ref={lastNameRef}
          onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
        />
      </View>
      {error == 'last' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={email => {
            setError('');
            setErrortext('');
            setEmail(email);
          }}
          placeholder="Enter Email Address" //dummy@abc.com
          autoCapitalize="none"
          keyboardType="email-address"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          maxLength={50}
          returnKeyType="next"
          ref={emailRef}
          onSubmitEditing={() => mobileRef.current && mobileRef.current.focus()}
        />
      </View>
      {error == 'email' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={mobile => {
            setError('');
            setErrortext('');
            setMobile(mobile);
          }}
          placeholder="Enter Mobile Number" //dummy@abc.com
          autoCapitalize="none"
          keyboardType="phone-pad"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          maxLength={10}
          returnKeyType="next"
          ref={mobileRef}
          onSubmitEditing={() =>
            passwordRef.current && passwordRef.current.focus()
          }
        />
      </View>
      {error == 'mobile' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}

      <View
        style={{
          marginLeft: 35,
          marginRight: 35,
          marginBottom: 10,
        }}>
        <DropDownPicker
          items={[
            {label: 'Maharashtra', value: 'Maharashtra'},
            {label: 'Gujrat', value: 'Gujrat'},
          ]}
          defaultIndex
          placeholder="Select State"
          containerStyle={{height: 53}}
          onChangeItem={item =>{ 
            setErrortext('')
            setError('')
            setState(item.value)}}
          style={{ marginTop: 10, backgroundColor: 'transparent'}}
        />
      </View>

      {error == 'state' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}

      <View
        style={{
          marginLeft: 35,
          marginRight: 35,
          marginBottom: 10,
        }}>
        <DropDownPicker
          items={ stateF=='Maharashtra' ? [
            {label: 'Pune', value: 'Pune'},
            {label: 'Mumbai', value: 'Mumbai'},
          ] : stateF=='Gujrat' ? [
            {label: 'Gandhinagar', value: 'Gandhinagar'},
            {label: 'Surat', value: 'Surat'},
          ] : []}
          defaultIndex
          placeholder="Select City"
          containerStyle={{height: 53}}
          onChangeItem={item =>{ 
            setErrortext('')
            setError('')
            setCity(item.value)}}
          style={{ marginTop: 10, backgroundColor: 'transparent'}}
        />
      </View>

      {error == 'city' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}

      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={password => {
            setError('');
            setErrortext('');
            setPassword(password);
          }}
          placeholder="Enter Password" //12345
          keyboardType="default"
          blurOnSubmit={false}
          secureTextEntry={true}
          underlineColorAndroid="#f000"
          maxLength={30}
          returnKeyType="next"
          ref={passwordRef}
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
        />
      </View>
      {error == 'password' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={password => {
            setError('');
            setErrortext('');
            setNewPassword(password);
          }}
          placeholder="Enter Confirm Password" //12345
          keyboardType="default"
          blurOnSubmit={false}
          secureTextEntry={true}
          underlineColorAndroid="#f000"
          maxLength={30}
          returnKeyType="done"
          ref={passwordInputRef}
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      {error == 'newpassword' ? (
        <Text style={styles.errorTextStyle}>{errortext}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handleSubmitPress}>
        <Text style={styles.buttonTextStyle}>LOGIN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Auth;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  SectionStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
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
    marginTop: 15,
    marginBottom: 40,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 14,
    marginLeft: 40,
  },
});
