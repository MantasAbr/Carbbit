import * as React from 'react'
import { TouchableOpacity, Platform, StyleSheet, View, Text, ImageBackground, Image} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function RegisterScreen({navigation}){

    const [inputName, setInputName] = React.useState('');
    const [inputEmail, setInputEmail] = React.useState('');
    const [inputPassword, setInputPassword] = React.useState('');
    const [inputConfirmationPassword, setInputConfirmationPassword] = React.useState('');

    return(
        <ImageBackground source={require('../assets/backgrounds/vilnius_bg.png')} 
                         style={styles.background} blurRadius={5}>
            <View>
                <ScrollView keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>

                    <Text style={styles.register}>Registracija</Text>
                    <Separator/>

                    <Text>Vardas</Text>
                    <TextInput
                        onChangeText={text => setInputName(text)}
                        value={inputName}
                        style={styles.inputBox}
                    />
                    <Separator/>

                    <Text>El. paštas</Text>
                    <TextInput
                        onChangeText={text => setInputEmail(text)}
                        value={inputEmail}
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

                    <Text>Patvirtinkite slaptažodį</Text>
                    <TextInput
                        onChangeText={text => setInputConfirmationPassword(text)}
                        value={inputConfirmationPassword}
                        style={styles.inputBox}
                        secureTextEntry={true}
                    />
                    <Separator/>

                    <TouchableOpacity style={styles.button} 
                                      onPress={() => {{inputName === '' || inputEmail === '' ||
                                                       inputPassword === '' || inputConfirmationPassword === ''
                                                       ? alert("Neužpildyti visi registracijos laukai")
                                                       : handleRegisterButton(navigation)}; 
                                                      {inputPassword === inputConfirmationPassword 
                                                       ? handleRegisterButton(navigation)
                                                       : alert("Patvirtinimo slaptažodis neatitinka slaptažodžio")}}}>
                        <Text>Prisijungti</Text>
                    
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </ImageBackground>       
    )
}

function Separator() {
    return <View style={styles.separator} />;
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
    button: {
        backgroundColor: '#EEECD4',
        borderWidth: 2,
        borderColor: 'black',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});