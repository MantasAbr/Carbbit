import React, {useState} from 'react';
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook';
import { TouchableOpacity, Platform, StyleSheet, View, Text, ImageBackground, Image, Button, Alert, AsyncStorage  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import env from '../env/server'

import IonicsIcon from '../components/IonicsIcon'
import { TitilliumWeb } from '../components/TitilliumWeb'
import FontAwesomeIcon from '../components/FontAwesomeIcon';
import Colors from '../constants/Colors';
import Dimensions from '../constants/Layout';



export default function HomeScreen({navigation}){

  const [userLoginState, setUserLoginState] = React.useState( { signedIn: false , first_name: '', email: '.'} );
  const [users, setUsers] = useState([
    { user_id: null, first_name: '', email: ''},
  ]);
  
  let found = false;

    return (
      <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
      style={styles.background}>
        <ScrollView  keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>      
          <View style={styles.logo}>
            <Image
              style={Dimensions.logoPresentation}
              source={require('../assets/images/carbbit.png')}
            />
          </View>

        
          <TouchableOpacity onPress={() => testas()}>
            <Text>TESTAS</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleButton_Login(navigation)} style={styles.button}>
            <TitilliumWeb style={{fontSize: 26}}>prisijungti</TitilliumWeb>    
          </TouchableOpacity>

          <View style={{marginVertical: 15}}/>

          <TouchableOpacity onPress={() => handleButton_Register(navigation)} style={styles.button}>
            <TitilliumWeb style={{fontSize: 26}}>registruotis</TitilliumWeb>
          </TouchableOpacity>

          <View style={{marginVertical: 25}}/>

          <TouchableOpacity onPress={() => logInGoogle()}>         
            <Image
              style={styles.logInAPIButtons}
              source={require('../assets/images/google.png')}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 15}}/>

          <TouchableOpacity onPress={() => logInFacebook()}>
            <Image
              style={styles.logInAPIButtons}
              source={require('../assets/images/facebook.png')}
            />
          </TouchableOpacity>
          
          </View>
      </ScrollView>
    </ImageBackground>
    )
    
    async function fetchJsonCheckIfEmailExists(Name, Email) {
      console.log('esam fetche()')
      console.log(Name)
      console.log(Email)
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
        if (users[index].email === Email) {
          console.log('radom email')
          console.log(users[index].email)
          console.log('su')
          console.log(userLoginState.email)
          console.log(users[index].user_id)

          _storeData(users[index].user_id, Name, Email)
          found = true;
          return true;
        }
      }
      }).then(() => {
        console.log('ziurim koks found')
        console.log(found)
      if (!found) {
        newUser(found, Name, Email);
      }

      }).catch((error) =>{
          console.error(error);
      });
    }

  function newUser(found, Name, Email) {
    console.log('esam newUser')
    console.log(Name)
    console.log(Email)
    if (found == false) {
      console.log(found);
      var data = {
        first_name: Name,
        email: Email,
        password: 'slaptazodis'
      };
      console.log('neradom');

      fetch('http://' + env.server.ip + ':' + env.server.port + '/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then((response)=>response.json())
      .then(function (responseJson) {
        console.log('kodel tu negali veikti')
        console.log(responseJson.id)
        console.log('Posted!')
        _storeData(responseJson.id, Name, Email)
      }).catch(function (err) {
        console.log(err);
      });
    }
  }

    async function testas() {
      try {
        await AsyncStorage.setItem('user_id', '1' );
        await AsyncStorage.setItem('username', 'vardas' );
        await AsyncStorage.setItem('email', 'email' );
        await AsyncStorage.setItem('password', 'slaptazodis' );
        navigation.reset({
          index: 0,
          routes: [
              {name: 'Root'}
          ]
      })

      } catch (error) {
        console.log(error)
      }
    };

    async function _storeData(id, Name, Email) {
      try {
        console.log('esam storeData')
        console.log(id)
        console.log(Name)
        console.log(Email)
        await AsyncStorage.setItem('user_id', id.toString() );
        await AsyncStorage.setItem('username', Name );
        await AsyncStorage.setItem('email', Email );
        await AsyncStorage.setItem('password', 'slaptazodis' );
        
        const value = await AsyncStorage.getItem('user_id');
        const value2 = await AsyncStorage.getItem('username');
        const value3 = await AsyncStorage.getItem('email');
        const value4 = await AsyncStorage.getItem('password');

        console.log(value)
        console.log(value2)
        console.log(value3)
        console.log(value4)

      } catch (error) {
        console.log(error)
      }
    };

    async function _retrieveData() {
      try {
        const value = await AsyncStorage.getItem('user_id');
        const value2 = await AsyncStorage.getItem('username');
        const value3 = await AsyncStorage.getItem('email');
        const value4 = await AsyncStorage.getItem('password');
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
      console.log('esam googlei')
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
          setUserLoginState({signedIn: true, first_name: result.user.name, email: result.user.email})
          console.log('state')
          console.log(userLoginState.first_name)
          console.log(userLoginState.email)
          fetchJsonCheckIfEmailExists(result.user.name, result.user.email)
          
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
          let name = response.json().name
          let email = response.json().email
          await setUserLoginState({signedIn: true, first_name: name, email: email})
          console.log('einam i fethca')
          console.log(name)
          console.log(email)
          fetchJsonCheckIfEmailExists(response.json().name, response.json().email)
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
  background: {
      width: '100%',
      height: '100%',
  },
  logo: {
    marginTop: '15%',
    marginBottom: '10%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.buttonColor,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.buttonBorderColorBlack,
    height: '9%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logInAPIButtons: {
    width: 350, 
    height: 50, 
    alignSelf: 'center', 
    borderRadius: 10, 
    borderColor: Colors.buttonBorderColorBlack,
    borderWidth: 1,
  }
});
  