import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Platform, ImageBackground, Image, Alert} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { TitilliumWeb } from '../components/TitilliumWeb';
import { Dimensions } from "react-native";
import IonicsIcon from '../components/IonicsIcon';


export default class SettingsScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {screenWidth: '', rememberInfo: false, radioButtonName: 'ios-radio-button-off'}
    }

    screenWidth = Math.round((Dimensions.get('window').width))

    handleDeletion = () => {

    fetch("http://192.168.56.1:3000/ratings/" + 5, { // po auth user_id
    method: 'DELETE', 
    })
    .then(res => res.text())
    .then(res => console.log(res))
    
    fetch("http://192.168.56.1:3000/posts/" + 5, { // po auth user_id
    method: 'DELETE', 
    })
    .then(res => res.text())
    .then(res => console.log(res))

    fetch("http://192.168.56.1:3000/users/" + 5, { // po auth user_id
        method: 'DELETE', 
      })
      .then(res => res.text())
      .then(res => console.log(res))
    }

    handleUpdate = () => {
        var data = {
        first_name: "vardas2", 
        email: "email2",
        password: "slaptazodis",

        }
        console.log('labas')
        fetch("http://192.168.56.1:3000/users/1", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
            console.log('Couldn\'t update..')
            }
            return response.json();
        }).then(function(data) {
            console.log(data)    
            if(data == "success"){
            console.log('updated!')
            }
        }).catch(function(err) {
            console.log(err)
        });
    }

    render(){
        return(
            <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
                             style={styles.background} blurRadius={5}>
            
            <ScrollView keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    {/* --------- */}
                    <View style={{marginVertical: 15}}/>                   
                    <TitilliumWeb style={styles.title}>nustatymai</TitilliumWeb>

                    <View style={styles.hairline}/>
                    {/* Šitą sekciją būtų logiškiau išmesti prieš ScrollView */}

                    <View style={{marginVertical: 10}}/>

                    <TitilliumWeb style={styles.header}>pasirinkti kalbą</TitilliumWeb>           
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('LanguageSettings')} activeOpacity={0.5}>
                        <View style={styles.buttonContainer}>
                            <Image source={require('../assets/custom_icons/lt_circle.png')} style={styles.flagCircle}/>
                            <TitilliumWeb style={styles.languageText}>Lietuvių</TitilliumWeb>                            
                            <View style={{marginLeft: this.screenWidth - 170}}/>                           
                            <View style={styles.icon}>
                                <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                            </View>                                                   
                        </View>
                    </TouchableOpacity> 

                    <View style={{marginVertical: 23}}/>

                    <TitilliumWeb style={styles.header}>paskyros valdymas</TitilliumWeb>

                    <TouchableOpacity style={styles.buttonUpper} onPress={() => this.props.navigation.navigate('UserAccountScreen')} activeOpacity={0.5}>
                        <View style={styles.buttonContainer}>
                            <TitilliumWeb style={styles.basicText}>profilio nustatymai</TitilliumWeb>
                            <View style={{marginLeft: this.screenWidth - 173}}/>
                            <View style={styles.icon}>
                                <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                            </View>
                        </View>                            
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLower} onPress={() => {if(this.state.rememberInfo === false){
                                                                                    this.setState({rememberInfo: true})
                                                                                    this.setState({radioButtonName: 'ios-radio-button-on'})
                                                                                }
                                                                                if(this.state.rememberInfo === true){
                                                                                    this.setState({rememberInfo:  false})
                                                                                    this.setState({radioButtonName: 'ios-radio-button-off'})
                                                                                }}} 
                                      activeOpacity={0.5}>
                        <View style={styles.buttonContainer}>
                            <TitilliumWeb style={styles.basicText}>atsiminti prisijungimo duomenis</TitilliumWeb>
                            <View style={{marginLeft: this.screenWidth - 264}}/>
                            <View style={styles.icon}>
                                <IonicsIcon name={this.state.radioButtonName} sizeOf={30} colorOf={"arrowIdle"} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLower} onPress={() => {this.deleteAccountAlert();}} activeOpacity={0.5}>
                        <View style={styles.buttonContainer}>
                            <TitilliumWeb style={styles.importantText}>ištrinti paskyrą</TitilliumWeb>
                        </View>
                    </TouchableOpacity>  

                    <View style={{marginVertical: 23}}/>

                    <TitilliumWeb style={styles.header}>programėlės funkcijos</TitilliumWeb>
                    <TouchableOpacity style={styles.buttonUpper} onPress={() => null} activeOpacity={0.5}>
                        <View style={styles.buttonContainer}>
                            <TitilliumWeb style={styles.basicText}>programėlės pranešimai</TitilliumWeb>
                            <View style={{marginLeft: this.screenWidth - 208}}/>
                            <View style={styles.icon}>
                                <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLower} onPress={() => this.props.navigation.navigate('AboutScreen')} activeOpacity={0.5}>
                        <View style={styles.buttonContainer}>
                            <TitilliumWeb style={styles.basicText}>apie programėlę</TitilliumWeb>
                            <View style={{marginLeft: this.screenWidth - 158}}/>
                            <View style={styles.icon}>
                                <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                            </View>
                        </View>
                    </TouchableOpacity>


{/*                     {Platform.OS == "web" ? <TitilliumWeb>Note: per web'a rodo modal (pop-up) screen'a. su telefonu jo taip apacioje nerodys</TitilliumWeb> : undefined}                                                                
                    <Modal transparent={true} visible={this.state.showModal} animationType={'fade'}>
                        <View style={{backgroundColor: '#000000aa', flex: 1}}>
                            <View style={styles.modal}>
                                <TouchableOpacity style={styles.modalDeleteButton} onPress={this.handleDeletion}>
                                    <TitilliumWeb style={styles.modalDeleteText}>ištrinti paskyrą</TitilliumWeb>
                                </TouchableOpacity>
                                <View style={{marginVertical: 13}}/>
                                <TouchableOpacity style={styles.modalCancelButton} onPress={() => this.setState({showModal: false})}>
                                    <TitilliumWeb style={styles.modalCancelText}>atšaukti</TitilliumWeb>
                                </TouchableOpacity>                                                         
                            </View>
                        </View>                                                               
                    </Modal> */}



                </View>
            </ScrollView>            
            </ImageBackground>
        )
    }

    deleteAccountAlert = () => {
        if(Platform.OS == 'web'){
            alert("Paskyrą ištrinta!")
        }
        else
        {
            Alert.alert('Ištrinti paskyrą?', null, [
                        {text: 'Ištrinti', onPress: () => console.log('ištrinta paskyra'), style: 'default'},
                        {text: 'Atšaukti', onPress: () => null, style: 'cancel'}]);
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
        height: 42,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: '#F5F3CB',
        borderRightColor: '#F5F3CB',
    },
    // ---
    // Used so that buttons' lower and upper borders don't 
    // double if they're on top of one another
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
    // ---
    languageText: {
        fontSize: 17,
        color: '#CB9D3C',
        paddingLeft: 19,
        marginTop: 4,
    },
    basicText: {
        fontSize: 15,
        color: '#CB9D3C',
        paddingLeft: 15,
        marginTop: 5
    },
    importantText: {
        fontSize: 15,
        color: '#D92626',
        paddingLeft: 15,
    },
    flagCircle: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        marginLeft: 25,
        marginTop: 2.5,
    },
    buttonContainer: {
        flexDirection: 'row',        
    },
    icon: {
        marginTop: 2,
    },
/*     modal: {
        backgroundColor: '#F5F3CB', 
        flex: 1, 
        borderColor: 'black',
        borderWidth: 1.5, 
        marginVertical: 250,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginHorizontal: 60, 
        borderRadius: 10, 
    },
    modalDeleteButton: {
        backgroundColor: '#F5F3CB',
        borderWidth: 1,
        borderColor: '#D92626',
        height: 50,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10, 
    },
    modalCancelButton:{
        backgroundColor: '#F5F3CB',
        borderWidth: 1,
        borderColor: '#6D6D6D',
        height: 50,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10, 
    },
    modalDeleteText: {
        fontSize: 17,
        color: '#D92626',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    modalCancelText: {
        fontSize: 15,
        color: '#6D6D6D',
        alignSelf: 'center',
        justifyContent: 'center',
    }, */
});