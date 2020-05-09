import * as React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, ImageBackground, Alert} from 'react-native';
import { ScrollView, TextInput} from 'react-native-gesture-handler';

import Layout from '../constants/Layout'

export default function LoginScreen({navigation}){

    const [inputName, setInputName] = React.useState('');
    const [inputPassword, setInputPassword] = React.useState('');

    return(
        <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
                         style={styles.background} blurRadius={5}>
            <View>
                <ScrollView  keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>
                    <Image
                        style={Layout.logoPresentation}
                        source={require('../assets/images/carbbit.png')}
                    />
                    <Text style={styles.login}>Prisijungimas</Text>
                    <Separator/>
                    
                    <Text>Vardas</Text>
                    <TextInput
                        onChangeText={text => setInputName(text)}
                        value={inputName}
                        style={styles.inputBox}
                        />
                    <Separator/>

                    <Text>Slaptažodis</Text>
                    <TextInput
                        onChangeText={text => setInputPassword(text)}
                        value={inputPassword}
                        style={styles.inputBox}
                        secureTextEntry={true}
                        />
                    <Separator/>
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
                        <Text>Prisijungti</Text>
                    </TouchableOpacity>
                
                    <Separator />

                </ScrollView>    
            </View>
        </ImageBackground>
    )
}

function checkInputs(name, pass){
    if (name === '' || pass === ''){
        alert("Nenurodytas vardas ir/arba slaptažodis");
        return false;
    }
    return true;
}

function Separator() {
    return <View style={styles.separator} />;
}

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
        width: 300,
        borderColor: 'black',
        borderWidth: 2,
        borderBottomWidth: 2,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        backgroundColor: '#EEECD4',        
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: '#EEECD4',
        borderWidth: 2,
        borderColor: 'black',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});