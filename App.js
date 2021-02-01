import React, { Component, useEffect } from 'react';
import Router from './src/router';
import { StyleSheet, View, Text } from 'react-native';
import { LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
    LogBox.ignoreAllLogs();
  }

  render() {
    return (
      <Router />
    )
  }

}