import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Platform, ImageBackground, Modal, Image} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { TitilliumWeb } from '../components/TitilliumWeb';
import {Dimensions } from "react-native";
import IonicsIcon from '../components/IonicsIcon';

export default class ChatScreen extends React.Component{

    render(){
        return(
            <ImageBackground source={require('../assets/backgrounds/alytus_bg.png')} 
            style={styles.background}>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
})