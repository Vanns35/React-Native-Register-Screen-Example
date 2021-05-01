import React, { Component } from 'react';
import Navigation from './src/navigations/root';
import { enableScreens } from 'react-native-screens';

enableScreens();
export default class App extends Component {
  render() {
    return (
          < Navigation />
    );
  }
}