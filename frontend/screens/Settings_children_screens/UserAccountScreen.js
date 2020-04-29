import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text, ImageBackground, Modal, Alert, Image, ScrollView} from 'react-native';
import { TitilliumWeb } from '../../components/TitilliumWeb';
import {Dimensions } from "react-native";
import IonicsIcon from '../../components/IonicsIcon';
import FontAwesomeIcon from '../../components/FontAwesomeIcon';

export default function UserAccountScreen({navigation}){

    const user = {name: "John", surname: "Doe", password: "password", mail: "Mail@mail.com"};
    
    return(        
        <ImageBackground source={require('../../assets/backgrounds/vilnius_bg.png')} 
        style={styles.background} blurRadius={5}>
            <ScrollView keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>

                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <View>
                            <IonicsIcon name={"ios-arrow-back"} sizeOf={35} colorOf={'arrowIdle'}/>
                        </View> 
                    </TouchableOpacity>                   
                    <TitilliumWeb style={styles.title}>vartotojo nustatymai</TitilliumWeb>
                </View>

                <View style={styles.container}>
                    <View style={styles.hairline}/>
                    <View style={{marginVertical: 10}}/>

                    <View style={styles.photoAndNameComponent}>
                        <View style={styles.photoCircle}>
                            <View style={styles.userBehind}>
                                <FontAwesomeIcon name={"user"} sizeOf={80} colorOf={'black'}/>
                            </View>
                        </View>
                        <TitilliumWeb style={styles.userName}>{user.name} {user.surname}</TitilliumWeb>
                        <TitilliumWeb style={styles.userMail}>{user.mail}</TitilliumWeb>
                    </View>
                    
                    <View style={{marginVertical: 10}}/>
                    <View style={styles.hairline}/>
                    <View style={{marginVertical: 15}}/>

                    <TitilliumWeb style={styles.header}>pakeisti vartotojo informaciją</TitilliumWeb>

                    <TouchableOpacity style={styles.buttonUpper} onPress={() => null} activeOpacity={0.5}>
                            <View style={styles.buttonContainer}>
                                <TitilliumWeb style={styles.basicText}>vardo pakeitimas</TitilliumWeb>
                                <View style={{marginLeft: Math.round((Dimensions.get('window').width)) - 160}}/>
                                <View style={styles.icon}>
                                    <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                                </View>
                            </View>                             
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLower} onPress={() => null} activeOpacity={0.5}>
                            <View style={styles.buttonContainer}>
                                <TitilliumWeb style={styles.basicText}>el. pašto pakeitimas</TitilliumWeb>
                                <View style={{marginLeft: Math.round((Dimensions.get('window').width)) - 177}}/>
                                <View style={styles.icon}>
                                    <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                                </View>
                            </View>                             
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLower} onPress={() => null} activeOpacity={0.5}>
                            <View style={styles.buttonContainer}>
                                <TitilliumWeb style={styles.basicText}>slaptažodžio pakeitimas</TitilliumWeb>
                                <View style={{marginLeft: Math.round((Dimensions.get('window').width)) - 203}}/>
                                <View style={styles.icon}>
                                    <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                                </View>
                            </View>                             
                    </TouchableOpacity>                                    
                </View>
            </ScrollView>
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
        marginLeft: 30,
    },
    hairline: {
        borderBottomWidth: 1,
        paddingTop: 8.5,
        borderColor: 'black',
        width: 315,
    },
    backButton: {
        marginLeft: -45,
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
    header: {
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 1,
        paddingBottom: 10,
        alignSelf: 'flex-start',
        paddingLeft: 15,
    },
    photoAndNameComponent: {
        flexDirection: 'column',
        alignSelf: 'center',
    },
    photoCircle: {
        marginHorizontal: 16,
        marginVertical: 10,
        width: 100,
        height: 100,
        borderRadius: 100/2,
        borderWidth: 1,
        borderColor: /* '#6D6D6D' */ 'black',
    },
    userBehind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: -2,
        width: '100%',
        height: '100%'
    },
    userName: {
        alignSelf: 'center',
        fontSize: 30,
    },
    userMail: {
        alignSelf: 'center',
        fontSize: 19,

    },
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
    buttonContainer: {
        flexDirection: 'row',        
    },
    icon: {
        marginTop: 2,
    },
    basicText: {
        fontSize: 15,
        color: '#CB9D3C',
        paddingLeft: 15,
        marginTop: 5
    },
});