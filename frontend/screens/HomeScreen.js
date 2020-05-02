import * as React from 'react';
import { TouchableOpacity, Platform, StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import { TitilliumWeb } from '../components/TitilliumWeb';

export default function HomeScreen({navigation}){
    return (
        <View style={styles.container}>
          <View style={styles.containeris}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/backgrounds/temp_logo.png')}
            />
          </View>
           <View style={{alignSelf: 'center'}}>
              <Text style={styles.title}>Autorent</Text>
          </View>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <TouchableOpacity onPress={() => handleButton_Login(navigation)} style={styles.helpLink}>
                    <Text style={styles.helpLinkText}>Prisijungti</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButton_Register(navigation)} style={styles.helpLink}>
                    <Text style={styles.helpLinkText}>Registruotis</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

function handleButton_Login(navigation){
  navigation.navigate('Login')
}

function handleButton_Register(navigation){
  navigation.navigate('Register')
}

const styles = StyleSheet.create({
    title: {
      color: '#20B2AA',
      fontWeight: 'bold',
      fontSize: 30,
      paddingBottom: 20
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containeris: {
      paddingTop: 50,
      alignSelf: 'center'
    },
    containeris2: {
      alignSelf: 'center'
    },
    tinyLogo: {
      width: 150,
      height: 150,
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
      paddingTop: 20,
      paddingVertical: 15,
      alignSelf: 'center'
    },
    helpLinkText: {
      fontSize: 25,
      color: '#2e78b7',
    },
    background: {
      width: '100%',
      height: '100%',
  },
  });
  