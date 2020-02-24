import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
const appstore = Platform.select({
  android: "Google Play Store",
  ios: "App Store",
  web: "--durniau ne ant webo--",
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Testas veikia su komandomis:</Text>
        <Text style={styles.instructions}>npm run web</Text>
        <Text style={styles.welcome}>arba</Text>
        <Text style={styles.instructions}>expo start</Text>

        {Platform.OS == 'web' ? <Text style={styles.instructions}>Testas: čia viskas veikia TIK ant webo seni</Text> : undefined}
        <Text style={styles.instructions}>{Platform.OS == 'ios' ? "Testas: čia veikia tik ant obuolio reikia Expo app iš " + appstore : undefined }</Text>
        <Text style={styles.instructions}>{Platform.OS == 'android' ? "Testas: čia veikia tik ant android reikia Expo app iš " + appstore : undefined }</Text>

        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
