import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text, ImageBackground, Modal, Alert} from 'react-native';
import { TitilliumWeb } from '../../components/TitilliumWeb';
import {Dimensions } from "react-native";
import IonicsIcon from '../../components/IonicsIcon';
import FontAwesomeIcon from '../../components/FontAwesomeIcon';


export default function LanguageScreen({navigation}){

    return(
        <ImageBackground source={require('../../assets/backgrounds/kaunas_bg.png')} 
        style={styles.background} blurRadius={5}>
            
            
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <View>
                        <IonicsIcon name={"ios-arrow-back"} sizeOf={35}/>
                    </View> 
                </TouchableOpacity>                   
                <TitilliumWeb style={styles.title}>pasirinkti kalbą</TitilliumWeb>
            </View>

            <View style={styles.container}>
                <View style={styles.hairline}/>
                <View style={{marginVertical: 40}}/>

                <TouchableOpacity style={styles.buttonUpper} onPress={() => null} activeOpacity={0.5}>
                    <View style={styles.buttonContainer}>
                        <FontAwesomeIcon name={"circle-thin"} sizeOf={40} colorOf={"black"} style={styles.languageCircle}/>
                        <TitilliumWeb style={styles.languageText}>Lietuvių</TitilliumWeb>
                    </View>
                </TouchableOpacity>
                <View style={styles.lineBetweenButtonsContainer}>
                    <View style={styles.lineBetweenButtonsBackground}/>
                    <View style={styles.lineBetweenButtons}/>
                </View> 
                <TouchableOpacity style={styles.buttonLower} onPress={() => null} activeOpacity={0.5}>
                    <View style={styles.buttonContainer}>
                        <FontAwesomeIcon name={"circle-thin"} sizeOf={40} colorOf={"black"} style={styles.languageCircle}/>
                        <TitilliumWeb style={styles.languageText}>Anglų</TitilliumWeb>
                    </View>
                </TouchableOpacity>
                
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 50.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 1,
        marginLeft: 51,
    },
    hairline: {
        borderBottomWidth: 1,
        paddingTop: 8.5,
        borderColor: 'black',
        width: 315,
    },
    backButton: {
        width: 20,
        height: 30,
        marginLeft: -70,
    },
    buttonUpper: {
        backgroundColor: '#F5F3CB',
        borderWidth: 1,
        borderColor: '#6D6D6D',
        height: 60,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: '#F5F3CB',
        borderRightColor: '#F5F3CB',
        borderBottomColor: '#F5F3CB',
    },
    buttonLower: {
        backgroundColor: '#F5F3CB',
        borderWidth: 1,        
        borderColor: '#6D6D6D',
        height: 60,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: '#F5F3CB',
        borderRightColor: '#F5F3CB',
        borderTopColor: '#F5F3CB',
    },
    languageText: {
        fontSize: 17,
        color: '#CB9D3C',
        alignSelf: 'center',
        marginLeft: 35,
    },
    languageCircle: {
        marginLeft: 25,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    lineBetweenButtonsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    lineBetweenButtons: {
        borderColor: '#6D6D6D',
        borderWidth: StyleSheet.hairlineWidth,
        width: Math.round((Dimensions.get('window').width) - 95), 
    },
    lineBetweenButtonsBackground: {
        backgroundColor: '#F5F3CB',
        borderColor: '#F5F3CB',
        width: 95,
    },
});
