import React, {useState} from 'react';
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook';
//import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, Platform, StyleSheet, View, Text, ImageBackground, Image, Button, Alert, AsyncStorage  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import env from '../env/server'
import Layout from '../constants/Layout'

export default function HomeScreen({navigation}){

  const [userLoginState, setUserLoginState] = React.useState( { signedIn: false , first_name: '', email: ''} );
  const [users, setUsers] = useState([
    { user_id: null, first_name: '', email: ''},
  ]);
  let found = false;

    return (
        <View style={styles.container}>
            <Image
              style={Layout.logoPresentation}
              source={require('../assets/images/carbbit.png')}
            />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <TouchableOpacity onPress={() => handleButton_Login(navigation)} style={styles.helpLink}>
                    <Text style={styles.helpLinkText}>Prisijungti</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButton_Register(navigation)} style={styles.helpLink}>
                    <Text style={styles.helpLinkText}>Registruotis</Text>
                </TouchableOpacity>
                <View style={{width: 150 , alignSelf: 'center', paddingTop: 20}}>
                  <Button title="Sign in with Google" onPress={() => logInGoogle()} />
                </View>
                <View style={{width: 150 , alignSelf: 'center', paddingTop: 10}}>
                  <Button title="Sign in with Facebook" onPress={() => logInFacebook()} />
                </View>
            </ScrollView>
        </View>
    )
    
    async function fetchJsonCheckIfEmailExists() {
      await fetch('http://' + env.server.ip + ':' + env.server.port + '/users/',{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          })
      .then((response) => response.json())
      .then((responseJson) => {
          for(var i = 0; i < responseJson.length; i++) {
            setUsers(prevUsers => {
              return [
                { user_id: responseJson[i].user_id, first_name: responseJson[i].first_name, email: responseJson[i].email },
                ...prevUsers
              ];
            });
          }
      for (let index = 0; index < users.length; index++) {
        if (users[index].email == userLoginState.email) {
          _storeData(users[index].user_id)
          found = true;
          return;
        }
      }
      }).catch((error) =>{
          console.error(error);
      });
      console.log(found)
      if (!found) {
        newUser(found);
      }
    }

  function newUser(found) {
    if (found == false) {
      console.log(found);
      var data = {
        first_name: userLoginState.first_name,
        email: userLoginState.email,
        password: 'slaptazodis'
      };
      console.log('neradom');
      fetch('http://' + env.server.ip + ':' + env.server.port + '/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (response) {
        if (response.status >= 400) {
          console.log('Couldn\'t post..');
        }
        return response.json();
      }).then(function (data) {
        console.log('Posted!')
        console.log(data);
        _storeData(data.id)
      }).catch(function (err) {
        console.log(err);
      });
    }
  }

    async function _storeData(id) {
      try {
        await AsyncStorage.setItem('user_id', id.toString() );
        await AsyncStorage.setItem('username', userLoginState.first_name );
        await AsyncStorage.setItem('email', userLoginState.email );
      } catch (error) {
        console.log(error)
      }
    };

    async function _retrieveData() {
      try {
        const value = await AsyncStorage.getItem('user_id');
        const value2 = await AsyncStorage.getItem('username');
        const value3 = await AsyncStorage.getItem('email');
        if (value !== null) {
          console.log(value);
          console.log(value2);
          console.log(value3);
        }
      } catch (error) {
        console.log(error)
      }
    };

    async function logInGoogle() {
      try {
        const result = await Google.logInAsync({
          androidClientId:
            "661974583477-h63i69p7v0t07f5b9auth50jjf54jg5l.apps.googleusercontent.com",
          scopes: ["profile", "email"]
        })
    
        if (result.type === "success") {
          console.log('success')
          console.log(result.user.name)
          console.log(result.user.email)
          await setUserLoginState({signedIn: true, first_name: result.user.name, email: result.user.email})
          fetchJsonCheckIfEmailExists()
          navigation.reset({
            index: 0,
            routes: [
                {name: 'Root'}
            ]
        })
        } else {
          console.log("cancelled")
        }
      } catch (e) {
        console.log("error", e)
      }
    }

    async function logInFacebook() {
      try {
        await Facebook.initializeAsync('2847743641946575');
        const {
          type,
          token
        } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
        if (type === 'success') {
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          let name = await response.json().name
          let email = await response.json().email
          await setUserLoginState({signedIn: true, first_name: name, email: email})
          fetchJsonCheckIfEmailExists
        } else {
          console.log('Unable to login!')
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }
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
    },
    containeris: {
      paddingTop: 50,
      alignSelf: 'center'
    },
    containeris2: {
      alignSelf: 'center'
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
  