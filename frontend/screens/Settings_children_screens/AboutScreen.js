import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text, ImageBackground, Modal, Alert, Image} from 'react-native';
import { TitilliumWeb } from '../../components/TitilliumWeb';
import IonicsIcon from '../../components/IonicsIcon';
import FontAwesomeIcon from '../../components/FontAwesomeIcon';
import Colors from '../../constants/Colors';

export default function AboutScreen({navigation}){
    return(
        <ImageBackground source={require('../../assets/backgrounds/vilnius_bg.png')} 
        style={styles.background} blurRadius={5}>

            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <View>
                        <IonicsIcon name={"ios-arrow-back"} sizeOf={35} colorOf={'arrowIdle'}/>
                    </View> 
                </TouchableOpacity>                   
                <TitilliumWeb style={styles.title}>apie programėlę</TitilliumWeb>
            </View>


            <View style={styles.container}>
                <View style={styles.hairline}/>
                <View style={{marginVertical: 20}}/>

                <View style={styles.aboutSection}>
                    <TitilliumWeb style={styles.aboutText}>A React app that tries to be AirBNB for cars.</TitilliumWeb>
                    <View style={{marginVertical: 5}}/> 
                    <TitilliumWeb style={styles.aboutText}>Based on React Native with Expo and Express.js.</TitilliumWeb>
                    <View style={{marginVertical: 18}}/> 
                    <TitilliumWeb style={{fontSize: 20}}>Project team members and roles: </TitilliumWeb>
                    <View style={styles.hairline}/>

                    <View style={styles.creatorList}>
                        <TitilliumWeb style={styles.aboutText}>Laurynas: Database & API (user), server;</TitilliumWeb>
                        <TitilliumWeb style={styles.aboutText}>Mantas: Front-end, Design, UI & UX;</TitilliumWeb> 
                        <TitilliumWeb style={styles.aboutText}>Nedas: Back-end functions, Android quality;</TitilliumWeb>         
                        <TitilliumWeb style={styles.aboutText}>Paulius: Back-end support, iOS quality;</TitilliumWeb>
                        <TitilliumWeb style={styles.aboutText}>Lukas: DevOps, management, security, server.</TitilliumWeb>
                    </View>                        
                </View>                
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
    aboutText: {
        fontSize: 18,        
    },
    aboutSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    creatorList: {
        marginTop: 10,
    },
});