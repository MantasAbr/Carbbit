import * as React from 'react';
import { render } from 'react-dom';
import { Keyboard, Modal, View, ActivityIndicator, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, ImageBackground, Image, RefreshControl } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import moment from "moment";
import { Dropdown } from 'react-native-material-dropdown';

import Dimensions from '../constants/Layout';
import Colors from '../constants/Colors';
import { TitilliumWeb } from '../components/TitilliumWeb';
import FontAwesome from '../components/FontAwesomeIcon';
import IonicsIcon from '../components/IonicsIcon';

import env from '../env/server';

const screenWidth = Dimensions.window.width;

export default class NotificationsScreen extends React.Component{

    state = {
        isLoading: false,
        messages: [
            {
                isSeen: false,
                isRating: false,
                isInformative: true,
                messageBody: 'jūsų nuomos laikas baigėsi',
            },{
                isSeen: false,
                isRating: true,
                isInformative: false,
                messageBody: 'gautas 5 žvaigždučių įvertinimas',
            }
        ]           
    }



    render(){
        if(this.state.isLoading){
            return(
                    <ImageBackground source={require('../assets/backgrounds/siauliai_bg.png')} 
                                    style={styles.background}>
                        <View style={{flex:1,padding:20}}>
                        </View>
                    </ImageBackground>
            )            
        }
        else{
            return(
                <ImageBackground source={require('../assets/backgrounds/siauliai_bg.png')} 
                                 style={styles.background}>
                    <View style={styles.headerContainer}>
              
                        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                            <View>
                                <IonicsIcon name={"ios-arrow-back"} sizeOf={35} colorOf={'arrowIdle'}/>
                            </View> 
                        </TouchableOpacity>                   
                        <TitilliumWeb style={styles.title}>pranešimai</TitilliumWeb>
                    </View>

                    <View style={{alignSelf: 'center'}}>
                        <View style={styles.hairline}/>           
                    </View>


                    <View style={{marginVertical: 10}}/>

                    <TitilliumWeb style={styles.header}>nauji pranešimai</TitilliumWeb> 
                    <View style={styles.listContainer}>
                    <FlatList                        
                        showsVerticalScrollIndicator={false}
                        data={this.state.messages}
                        renderItem={({item}) => 
                            <View style={{paddingBottom: 15}}>
                            <TouchableOpacity style={styles.messageContainer}>
                                {/* Foto komponentas */}
                                <View style={styles.circle}>
                                    <View style={styles.userIconBehind}>
                                        <FontAwesome name={"user"} sizeOf={70} colorOf={"iconColor"}/>
                                    </View>                    
                                </View>

                                {/* Info komponentas */}
                                <View style={styles.messageBody}>
                                    <TitilliumWeb style={{fontSize: 16}}>{item.messageBody}</TitilliumWeb>
                                </View>

                                {/* Ikona */}
                                <View style={styles.arrowIcon}>
                                    <IonicsIcon name={"ios-arrow-forward"} sizeOf={45} colorOf={"arrowIdle"} />
                                </View>   
                            </TouchableOpacity>
                            </View>
                    }
                    />
                    </View>
                   
                </ImageBackground>
            )
        }
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
    headerContainer: {
        flexDirection: 'row',
        marginTop: 50.5,
        alignItems: 'flex-start',
        marginLeft: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 1,
        marginLeft: 10,
    },
    hairline: {
        borderBottomWidth: 1,
        paddingTop: 8.5,
        borderColor: Colors.hairline,
        width: 347,
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 1,
        paddingBottom: 10,
        alignSelf: 'flex-start',
        paddingLeft: 15,
    },
    listContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginVertical: -1,
    },
    messageContainer: {
        borderWidth: 1,
        borderColor: Colors.buttonBorderColorBlack,
        height: 110,
        borderLeftColor: Colors.buttonBorderColorTransparent,
        borderRightColor: Colors.buttonBorderColorTransparent,
        width: screenWidth,
        flexDirection: 'row',
        backgroundColor: Colors.containerColorTransparent,
    },
    circle: {
        marginHorizontal: 16,
        marginVertical: 10,
        width: 90,
        height: 90,
        borderRadius: 90/2,
        borderWidth: 1,
        borderColor: Colors.photoCircle,
    },
    userIconBehind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 90/2,
        width: '100%',
        height: '100%'
    },
    messageBody: {
        flexDirection: 'column',
        alignSelf: 'center',
        width: 200,
    },
    arrowIcon: {
        alignSelf: 'center',
        marginLeft: screenWidth - 360,
    },
});