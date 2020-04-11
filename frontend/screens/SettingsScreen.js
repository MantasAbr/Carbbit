import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text, ImageBackground, Alert, PixelRatio} from 'react-native';
import { ScrollView, TextInput} from 'react-native-gesture-handler';
import { TitilliumWeb } from '../components/TitilliumWeb';

export default class SettingsScreen extends React.Component{

    render(){
        return(
            <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
                             style={styles.background} blurRadius={5}>
            
            <ScrollView keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View style={{marginVertical: 15}}/>                   
                    <TitilliumWeb style={styles.title}>nustatymai</TitilliumWeb>

                    <View style={styles.hairline}/>
                    <View style={{marginVertical: 10}}/>

                    <TitilliumWeb style={styles.header}>pasirinkti kalbą</TitilliumWeb>
                    <TouchableOpacity style={styles.button} onPress={() => null} activeOpacity={0.4}>
                        <TitilliumWeb style={styles.languageText}>Lietuvių</TitilliumWeb>
                    </TouchableOpacity> 
                    <View style={{marginVertical: 23}}/>

                    <TitilliumWeb style={styles.header}>paskyros valdymas</TitilliumWeb>
                    <TouchableOpacity style={styles.buttonUpper} onPress={() => null} activeOpacity={0.4}>
                        <TitilliumWeb style={styles.basicText}>atsiminti prisijungimo duomenis</TitilliumWeb>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLower} onPress={() => null} activeOpacity={0.4}>
                        <TitilliumWeb style={styles.importantText}>Ištrinti paskyrą</TitilliumWeb>
                    </TouchableOpacity> 
                    <View style={{marginVertical: 23}}/>

                    <TitilliumWeb style={styles.header}>programėlės funkcijos</TitilliumWeb>
                    <TouchableOpacity style={styles.button} onPress={() => null} activeOpacity={0.4}>
                        <TitilliumWeb style={styles.basicText}>programėlės pranešimai</TitilliumWeb>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </ImageBackground>
        )
    }
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
    title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 1,
        paddingRight: 185,
    },
    hairline: {
        borderBottomWidth: 1,
        paddingTop: 4.5,
        borderColor: 'black',
        width: 315,
    },
    header: {
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 1,
        paddingBottom: 10,
        alignSelf: 'flex-start',
        paddingLeft: 15,
    },
    button: {
        backgroundColor: '#F5F3CB',
        borderWidth: 1,
        borderColor: '#6D6D6D',
        height: 41,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: '#F5F3CB',
        borderRightColor: '#F5F3CB',
    },
    // ---
    // Used so that buttons' lower and upper borders don't 
    // double if they're on top on one another
    buttonUpper: {
        backgroundColor: '#F5F3CB',
        borderWidth: 1,
        borderColor: '#6D6D6D',
        height: 41,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: '#F5F3CB',
        borderRightColor: '#F5F3CB',
    },
    buttonLower: {
        backgroundColor: '#F5F3CB',
        borderWidth: 1,        
        borderColor: '#6D6D6D',
        height: 40,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: '#F5F3CB',
        borderRightColor: '#F5F3CB',
        borderTopColor: '#F5F3CB',
    },
    buttonMiddle: {

    },
    // ---
    languageText: {
        fontSize: 17,
        color: '#CB9D3C',
        paddingLeft: 17,
    },
    basicText: {
        fontSize: 14,
        color: '#CB9D3C',
        paddingLeft: 17,
    },
    importantText: {
        fontSize: 14,
        color: '#D92626',
        paddingLeft: 17,
    },
});