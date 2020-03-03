import * as React from 'react';
import { TouchableOpacity, Platform, StyleSheet, View, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
  });
  const appstore = Platform.select({
    android: "Google Play Store",
    ios: "App Store",
    web: "--durniau ne ant webo--",
  });

export default function HomeScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Testas veikia su komanda:</Text>
            <Text style={styles.instructions}>expo start</Text>

            {Platform.OS == 'web' ? <Text style={styles.instructions}>Testas: čia viskas veikia TIK ant webo seni</Text> : undefined}
            <Text style={styles.instructions}>{Platform.OS == 'ios' ? "Testas: čia veikia tik ant obuolio reikia Expo app iš " + appstore : undefined }</Text>
            <Text style={styles.instructions}>{Platform.OS == 'android' ? "Testas: čia veikia tik ant android reikia Expo app iš " + appstore : undefined }</Text>

            <Text style={styles.instructions}>{instructions}</Text>

            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <MonoText>Labas</MonoText>
                <TouchableOpacity onPress={handleButton_getData} style={styles.helpLink}>
                    <Text style={styles.helpLinkText}></Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

function handleButton_getData(){
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  });
  