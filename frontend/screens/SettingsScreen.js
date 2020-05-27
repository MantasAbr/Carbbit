import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Platform, ImageBackground, Image, Alert, AsyncStorage} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { TitilliumWeb } from '../components/TitilliumWeb';
import Dimensions from '../constants/Layout';
import IonicsIcon from '../components/IonicsIcon';
import Colors from '../constants/Colors'
import env from '../env/server';

export default class SettingsScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {screenWidth: '', rememberInfo: false, radioButtonName: 'ios-radio-button-off'}
    }

    
    state = {
        user_id: null,
        name: '',
        password: '',
        mail: '',
    }

    componentDidMount(){
        this.getUserData()
    }

    getUserData = async () => {
        let name = await AsyncStorage.getItem('username');
        let email = await AsyncStorage.getItem('email');
        let userID = await AsyncStorage.getItem('user_id');
        let password = await AsyncStorage.getItem('password');
        this.setState({name: name, mail: email, user_id: userID, password: password})
    }

    screenWidth = Math.round(Dimensions.window.width);

    handleDeletion = async () => {

        fetch('http://' + env.server.ip + ':' + env.server.port + '/posts/user/' + this.state.user_id,{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          })
        .then((response) => response.json())
        .then((responseJson) => {
        
        let posts = new Array();

        for(var i = 0; i < responseJson.length; i++) {
            var obj = responseJson[i];
            posts.push(obj.post_id);
        }

        for (let index = 0; index < posts.length; index++) {
            this.deleteAssociatedPosts(posts[index]);
        }

      }).then(() => {
        console.log(this.state.user_id)
        console.log('ieinam')
        fetch('http://' + env.server.ip + ':' + env.server.port + '/users/' + this.state.user_id, {
        method: 'DELETE', 
        })
        .then(res => res.text())
        .then(res => console.log(res))
        
        this.setState({user_id: null, name: '', mail: '', password: ''})

        AsyncStorage.setItem('username', '');
        AsyncStorage.setItem('email', '' );
        AsyncStorage.setItem('password', '' );
        AsyncStorage.setItem('user_id', null);

      })
      .catch((error) =>{
          console.error(error);
      });
    }

    
        deleteAssociatedPosts = async (key) => {
        console.log(key)
        fetch('http://' + env.server.ip + ':' + env.server.port + '/posts/' + key, {
        method: 'DELETE', 
        })
        .then(res => res.text())
        .then(res => console.log(res))
        this.fetchJson()
    }

    render(){
        return(
            <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
                             style={styles.background}>

<           View style={styles.headerContainer}>
                <View style={{marginVertical: 15}}/>      
                <TitilliumWeb style={styles.title}>nustatymai</TitilliumWeb>
            </View>

            <View style={{alignSelf: 'center'}}>
                <View style={styles.hairline}/>           
            </View>   
            
            <ScrollView keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View style={{marginVertical: 10}}/>

                    {/*<TitilliumWeb style={styles.header}>pasirinkti kalbą</TitilliumWeb>           
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

                    <View style={{marginVertical: 23}}/>*/}

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
            alert("Paskyra ištrinta!")
        }
        else
        {
            Alert.alert('Ištrinti paskyrą?', null, [
                        {text: 'Ištrinti', onPress: () => this.handleDeletion(), style: 'default'},
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
    headerContainer: {
        flexDirection: 'row',
        marginTop: 33,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 1,
        paddingRight: 175,
    },
    hairline: {
        borderBottomWidth: 1,
        paddingTop: 4.5,
        borderColor: Colors.hairline,
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
        backgroundColor: Colors.buttonColor,
        borderWidth: 1,
        borderColor: Colors.buttonBorderColorBlack,
        height: 42,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: Colors.buttonColor,
        borderRightColor: Colors.buttonColor,
    },
    // ---
    // Used so that buttons' lower and upper borders don't 
    // double if they're on top of one another
    buttonUpper: {
        backgroundColor: Colors.buttonColor,
        borderWidth: 1,
        borderColor: Colors.buttonBorderColorBlack,
        height: 41,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: Colors.buttonColor,
        borderRightColor: Colors.buttonColor,
    },
    buttonLower: {
        backgroundColor: Colors.buttonColor,
        borderWidth: 1,        
        borderColor: Colors.buttonBorderColorBlack,
        height: 40,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderLeftColor: Colors.buttonColor,
        borderRightColor: Colors.buttonColor,
        borderTopColor: Colors.buttonColor,
    },
    // ---
    languageText: {
        fontSize: 17,
        color: Colors.languageText,
        paddingLeft: 19,
        marginTop: 4,
    },
    basicText: {
        fontSize: 15,
        color: Colors.defaultText,
        paddingLeft: 15,
        marginTop: 5
    },
    importantText: {
        fontSize: 15,
        color: Colors.importantText,
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