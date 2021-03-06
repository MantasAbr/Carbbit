import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text, ImageBackground, Modal, Alert, Image} from 'react-native';
import { TitilliumWeb } from '../../components/TitilliumWeb';
import IonicsIcon from '../../components/IonicsIcon';
import FontAwesomeIcon from '../../components/FontAwesomeIcon';
import Colors from '../../constants/Colors';
import Dimensions from '../../constants/Layout';


export default function LanguageScreen({navigation}){

    return(
        <ImageBackground source={require('../../assets/backgrounds/kaunas_bg.png')} 
        style={styles.background} blurRadius={5}>
            
            
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <View>
                        <IonicsIcon name={"ios-arrow-back"} sizeOf={35} colorOf={'arrowIdle'}/>
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
                        {/* <Image source={require('../../assets/custom_icons/lt_circle.png')} style={styles.flagCircle}/> */}
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
        borderColor: Colors.hairline,
        width: 315,
    },
    backButton: {
        marginLeft: -80,
        paddingHorizontal: 10,
        paddingTop: 5,     
    },
    buttonUpper: {
        backgroundColor: Colors.buttonColor,
        borderWidth: 1,
        borderColor: Colors.buttonBorderColorBlack,
        height: 60,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: Colors.buttonColor,
        borderRightColor: Colors.buttonColor,
        borderBottomColor: Colors.buttonColor,
    },
    buttonLower: {
        backgroundColor: Colors.buttonColor,
        borderWidth: 1,        
        borderColor: Colors.buttonBorderColorBlack,
        height: 60,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: Colors.buttonColor,
        borderRightColor: Colors.buttonColor,
        borderTopColor: Colors.buttonColor,
    },
    languageText: {
        fontSize: 17,
        color: Colors.defaultText,
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
        borderColor: Colors.buttonBorderColorBlack,
        borderTopWidth: StyleSheet.hairlineWidth,
        width: Math.round((Dimensions.window.width) - 95), 
    },
    lineBetweenButtonsBackground: {
        backgroundColor: Colors.buttonColor,
        borderColor: Colors.buttonColor,
        width: 95,
    },
    flagCircle: {
        resizeMode: 'contain',
        width: 40,
        height: 40,
        marginLeft: 25,
    },
});
