import * as React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, ImageBackground, Alert, AsyncStorage} from 'react-native';
import { ScrollView, TextInput} from 'react-native-gesture-handler';

import IonicsIcon from '../components/IonicsIcon'
import { TitilliumWeb } from '../components/TitilliumWeb'
import FontAwesomeIcon from '../components/FontAwesomeIcon';
import Colors from '../constants/Colors';
import Dimensions from '../constants/Layout';

export default function LoginScreen({navigation}){

    const [inputName, setInputName] = React.useState('');
    const [inputPassword, setInputPassword] = React.useState('');

    return(
        <ImageBackground source={require('../assets/backgrounds/klaipeda_bg.png')} 
                         style={styles.background}>

            <View style={styles.headerContainer}>
              
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                  <View>
                      <IonicsIcon name={"ios-arrow-back"} sizeOf={35} colorOf={'arrowIdle'}/>
                  </View> 
              </TouchableOpacity>                   
              <TitilliumWeb style={styles.title}>prisijungimas</TitilliumWeb>
            </View>

            <View style={{alignSelf: 'center'}}>
                <View style={styles.hairline}/>           
            </View>


            <ScrollView  keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>
                
                <View style={{marginVertical: 40}}/>
                <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <View style={styles.inputContainerUpperHairline}/>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesomeIcon  style={{marginVertical: 2, marginHorizontal: 2}}name={"user"} sizeOf={35}/>
                        <View style={{marginHorizontal: 5}}/>
                        <TextInput
                            onChangeText={text => setInputName(text)}
                            value={inputName}
                            style={styles.inputBox}
                            placeholder={"vardas..."}
                            placeholderTextColor={Colors.hintText}
                        />
                    </View>
                </View>

                <View style={{marginVertical: 30}}/>

                <View style={styles.inputContainer}>
                    <View style={styles.inputContainerUpperHairline}/>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesomeIcon  style={{marginTop: 2, marginLeft: 3}}name={"lock"} sizeOf={40}/>
                        <View style={{marginHorizontal: 5}}/>
                        <TextInput
                            onChangeText={text => setInputPassword(text)}
                            value={inputPassword}
                            style={styles.inputBox}
                            secureTextEntry={true}
                            placeholder={"slaptažodis..."}
                            placeholderTextColor={Colors.hintText}
                            />
                    </View>
                </View>

                <View style={{marginVertical: 40}}/>

                <TouchableOpacity style={styles.button} onPress={() => {
                    // set navigation head to Root (BottomNavbar component in App.js)
                    // navigation.reset CANNOT BE CALLED OUTSIDE OF return()
                    // or it won't work, but doesn't throw an error
                    checkInputs(inputName, inputPassword)
                    ? navigation.reset({
                        index: 0,
                        routes: [
                            {name: 'Root'}
                        ]
                    })
                    : undefined}
                    }>
                    <TitilliumWeb style={{fontSize: 26}}>tęsti</TitilliumWeb>
                </TouchableOpacity>
                </View>
            </ScrollView>    
        </ImageBackground>
    )
}

function checkInputs(name, pass){
    _retrieveData()
    if (name === '' || pass === ''){
        alert("Nenurodytas vardas ir/arba slaptažodis");
        return false;
    }
    return true;
}

async function _retrieveData() {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        console.log(value);
      }
    } catch (error) {
      console.log('klaida _retrieveData()')
      console.log(error)
    }
  };

function handleLoginButton(navigation){
    navigation.navigate('Root');
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 40,
      },
    login: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    inputBox: {
        height: 40,
        width: '88%',
        borderColor: Colors.buttonBorderColorBlack,
        borderBottomWidth: 1,
        fontSize: 15,      
    },
    background: {
        width: '100%',
        height: '100%',
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
        height: '20%',
        width: '55%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 50.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 27,
        fontWeight: '600',
        letterSpacing: 1,
        marginLeft: 15,
    },
    hairline: {
        borderBottomWidth: 1,
        paddingTop: 8.5,
        borderColor: Colors.hairline,
        width: 240,
    },
    backButton: {
        marginLeft: -30,
        paddingHorizontal: 10,
        paddingTop: 5,        
    },
    inputContainer: {
        width: '90%',
    },
    inputContainerUpperHairline: {
        borderBottomWidth: 1,
        borderColor: Colors.hairline,
        width: '100%',
    },
});