import * as React from 'react'
import { TouchableOpacity, Platform, StyleSheet, View, Text, ImageBackground, Image, Alert} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import IonicsIcon from '../components/IonicsIcon'
import { TitilliumWeb } from '../components/TitilliumWeb'
import FontAwesomeIcon from '../components/FontAwesomeIcon';
import FontAwesome5Icon from '../components/FontAwesome5Icon';
import Colors from '../constants/Colors';
import Dimensions from '../constants/Layout';

export default function RegisterScreen({navigation}){

    const [inputName, setInputName] = React.useState('');
    const [inputEmail, setInputEmail] = React.useState('');
    const [inputPassword, setInputPassword] = React.useState('');
    const [inputConfirmationPassword, setInputConfirmationPassword] = React.useState('');

    return(
        <ImageBackground source={require('../assets/backgrounds/vilnius_bg.png')} 
                         style={styles.background}>

            <View style={styles.headerContainer}>
              
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                  <View>
                      <IonicsIcon name={"ios-arrow-back"} sizeOf={35} colorOf={'arrowIdle'}/>
                  </View> 
                </TouchableOpacity>                   
                <TitilliumWeb style={styles.title}>registracija</TitilliumWeb>
            </View>

             <View style={{alignSelf: 'center'}}>
                 <View style={styles.hairline}/>           
             </View> 
            
            <ScrollView keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>
                
                <View style={{marginVertical: 20}}/>
                <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <TitilliumWeb style={styles.inputBoxText}>vartotojo vardas</TitilliumWeb>
                    <View style={styles.inputContainerUpperHairline}/>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesomeIcon style={{marginVertical: 2, marginHorizontal: 2}}name={"user"} sizeOf={35}/>
                        <View style={{marginHorizontal: 5}}/>
                        <TextInput
                            onChangeText={text => setInputName(text)}
                            value={inputName}
                            style={styles.inputBox}
                            placeholder={"įvesti..."}
                            placeholderTextColor={Colors.hintText}
                        />
                    </View>
                </View>
                
                <View style={{marginVertical: 10}}/>
                <View style={styles.inputContainer}>
                    <TitilliumWeb style={styles.inputBoxText}>el. paštas</TitilliumWeb>
                    <View style={styles.inputContainerUpperHairline}/>
                    <View style={{flexDirection: 'row'}}>
                        <IonicsIcon style={{marginTop: 2, marginHorizontal: 2}} name={"ios-mail"} sizeOf={35}/>
                        <View style={{marginHorizontal: 4}}/>
                        <TextInput
                            onChangeText={text => setInputEmail(text)}
                            value={inputEmail}
                            style={styles.inputBox}
                            placeholder={"įvesti..."}
                            placeholderTextColor={Colors.hintText}
                        />
                    </View>
                </View>
                
                <View style={{marginVertical: 10}}/>
                <View style={styles.inputContainer}>
                    <TitilliumWeb style={styles.inputBoxText}>slaptažodis</TitilliumWeb>
                    <View style={styles.inputContainerUpperHairline}/>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesome5Icon style={{marginTop: 5, marginHorizontal: 2}}name={"user-shield"} sizeOf={27}/>
                        <View style={{marginHorizontal: 1}}/>
                        <TextInput
                            onChangeText={text => setInputPassword(text)}
                            value={inputPassword}
                            style={styles.inputBox}
                            placeholder={"įvesti..."}
                            placeholderTextColor={Colors.hintText}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={{marginVertical: 10}}/>
                <View style={styles.inputContainer}>
                    <TitilliumWeb style={styles.inputBoxText}>patvirtinkite slaptažodį</TitilliumWeb>
                    <View style={styles.inputContainerUpperHairline}/>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesome5Icon style={{marginTop: 5, marginHorizontal: 2}}name={"shield-alt"} sizeOf={30}/>
                        <View style={{marginHorizontal: 2.5}}/>
                        <TextInput
                            onChangeText={text => setInputConfirmationPassword(text)}
                            value={inputConfirmationPassword}
                            style={styles.inputBox}
                            placeholder={"įvesti..."}
                            placeholderTextColor={Colors.hintText}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                
                <View style={{marginVertical: 30}}/>

                <TouchableOpacity style={styles.button} 
                                    onPress={() => {
                                    if (checkInputs(inputName, inputEmail, inputPassword, inputConfirmationPassword)){
                                        navigation.reset({
                                            index: 0,
                                            routes: [
                                                {name: 'Root'}
                                            ]
                                        })
                                    }
                                }}>
                    <TitilliumWeb style={{fontSize: 26}}>registruotis</TitilliumWeb>
                </TouchableOpacity>

                <View style={{marginVertical: 120}}/>

                </View>
            </ScrollView>
        </ImageBackground>       
    )
}

function checkInputs(name, mail, pass, pass2){
    if (name === ''){
        alert("Vardas tuščias");
        return false;
    }
    if (mail === ''){ // TODO: email regex check
        alert("Email tuščias");
        return false;
    }
    if (pass === '' || pass2 === ''){
        alert("slaptažodis tuščias");
        return false;
    }
    if (pass === pass2){
        return true;
    }
    else{
        alert("Patvirtinimo slaptažodis neatitinka slaptažodžio");
        return false;
    }
}

function handleRegisterButton(navigation){
    navigation.navigate('Root')
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 25,
    },
    register: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
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
    inputBox: {
        height: 40,
        width: '88%',
        borderColor: Colors.buttonBorderColorBlack,
        borderBottomWidth: 1,
        fontSize: 15,         
    },
    button: {
        backgroundColor: Colors.buttonColor,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.buttonBorderColorBlack,
        height: '10%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 50.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBoxText: {
        fontSize: 20,
        paddingBottom: 3,
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