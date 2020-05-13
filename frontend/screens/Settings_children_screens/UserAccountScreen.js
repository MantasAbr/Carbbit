import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, TextInput, ImageBackground, Modal, Alert, Image, ScrollView} from 'react-native';
import { TitilliumWeb } from '../../components/TitilliumWeb';
import Dimensions from '../../constants/Layout';
import IonicsIcon from '../../components/IonicsIcon';
import FontAwesomeIcon from '../../components/FontAwesomeIcon';
import Colors from '../../constants/Colors';

export default class UserAccountScreen extends React.Component{


    state = {

        name: 'John',
        surname: 'Doe',
        password: 'password',
        mail: 'Mail@mail.com',

        newName: '',
        newSurname: '',
        newPassword: '',
        newMail: '',

        nameChangeModal: false,
        emailChangeModal: false,
        passwordChangeModal: false,
        photoChangeModal: false,
    }

    handleNameChange = (text) => {
        this.setState({newName: text})
    }

    handleSurnameChange = (text) => {
        this.setState({newSurname: text})
    }

    handleEmailChange = (text) => {
        this.setState({newMail: text})
    }

    handlePasswordChange = (text) => {
        this.setState({newPassword: text})
    }

    updateName(newNameChoice, newSurnameChoice){
        this.setState({name: newNameChoice});
        this.setState({surname: newSurnameChoice});
        this.setState({newName: ''});
        this.setState({newSurname: ''});
    }

    updateMail(newMailChoice){
        this.setState({mail: newMailChoice});
        this.setState({newMail: ''});
    }

    updatePassword(newPasswordChoice){
        this.setState({password: newPasswordChoice});
        this.setState({newPassword: ''});
    }
   
    render(){   
    return(        
        <ImageBackground source={require('../../assets/backgrounds/vilnius_bg.png')} 
        style={styles.background} blurRadius={5}>

            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                    <View>
                        <IonicsIcon name={"ios-arrow-back"} sizeOf={35} colorOf={'arrowIdle'}/>
                    </View> 
                </TouchableOpacity>                   
                <TitilliumWeb style={styles.title}>vartotojo nustatymai</TitilliumWeb>
            </View>

            <View style={{alignSelf: 'center'}}>
                <View style={styles.hairline}/>           
            </View>   

            <ScrollView keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>
                <View style={{marginVertical: 10}}/>        
                <View style={styles.container}>
                    <View style={styles.photoComponent}>
                        <TouchableOpacity style={styles.photoCircle} onPress={() => this.setState({photoChangeModal: true})}>
                            <View style={styles.userBehind}>
                                <FontAwesomeIcon name={"user"} sizeOf={80} colorOf={'black'}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.nameComponent}>
                        <TitilliumWeb style={styles.userName}>{this.state.name}</TitilliumWeb>
                        <TitilliumWeb style={styles.userName}>{this.state.surname}</TitilliumWeb>
                        <TitilliumWeb style={styles.userMail}>{this.state.mail}</TitilliumWeb>
                    </View>    
                    
                    
                    <View style={{marginVertical: 10}}/>
                    <View style={styles.hairline}/>
                    <View style={{marginVertical: 15}}/>

                    <TitilliumWeb style={styles.header}>pakeisti vartotojo informaciją</TitilliumWeb>

                    <TouchableOpacity style={styles.buttonUpper} onPress={() => this.setState({nameChangeModal: true})} activeOpacity={0.5}>
                            <View style={styles.buttonContainer}>
                                <TitilliumWeb style={styles.basicText}>vardo pakeitimas</TitilliumWeb>
                                <View style={{marginLeft: Math.round((Dimensions.window.width) - 160)}}/>
                                <View style={styles.icon}>
                                    <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                                </View>
                            </View>                             
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLower} onPress={() => this.setState({emailChangeModal: true})} activeOpacity={0.5}>
                            <View style={styles.buttonContainer}>
                                <TitilliumWeb style={styles.basicText}>el. pašto pakeitimas</TitilliumWeb>
                                <View style={{marginLeft: Math.round((Dimensions.window.width) - 177)}}/>
                                <View style={styles.icon}>
                                    <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                                </View>
                            </View>                             
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLower} onPress={() => this.setState({passwordChangeModal: true})} activeOpacity={0.5}>
                            <View style={styles.buttonContainer}>
                                <TitilliumWeb style={styles.basicText}>slaptažodžio pakeitimas</TitilliumWeb>
                                <View style={{marginLeft: Math.round((Dimensions.window.width) - 203)}}/>
                                <View style={styles.icon}>
                                    <IonicsIcon name={"ios-arrow-forward"} sizeOf={30} colorOf={"arrowIdle"} />
                                </View>
                            </View>                             
                    </TouchableOpacity>                                    
                </View>
            </ScrollView>

            {/* Pop-up'as pakeisti vardą */}
            <Modal transparent={true} visible={this.state.nameChangeModal} animationType={'fade'}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                    <View style={styles.modalName}>
                        <View style={styles.modalHairline}/>

                        <View style={{marginVertical: 8}}/>

                        <TitilliumWeb style={styles.modalTitle}>jūsų vardas:</TitilliumWeb>
                        <TitilliumWeb style={styles.modalUserInfo}>{this.state.name}</TitilliumWeb>
                        <TitilliumWeb style={styles.modalUserInfo}>{this.state.surname}</TitilliumWeb>

                        <View style={{marginVertical: 5}}/>
                        <View style={styles.modalHairline}/>


                        <View style={{marginVertical: 8}}/>

                        <TitilliumWeb style={styles.modalTitle}>pakeisti vardą</TitilliumWeb>
                        <View style={{marginVertical: 5}}/>
                        <TextInput onChangeText={this.handleNameChange}
                        style={styles.modalInput}
                        underlineColorAndroid="transparent"
                        placeholder="įveskite..."
                        placeholderTextColor={Colors.hintText}               
                        multiline={false}
                        value={this.state.newName}
                        keyboardType="default"
                        />

                        <View style={{marginVertical: 5}}/>

                        <TitilliumWeb style={styles.modalTitle}>pakeisti pavardę</TitilliumWeb>
                        <View style={{marginVertical: 5}}/>
                        <TextInput onChangeText={this.handleSurnameChange}
                        style={styles.modalInput}
                        underlineColorAndroid="transparent"
                        placeholder="įveskite..."
                        placeholderTextColor={Colors.hintText}               
                        multiline={false}
                        value={this.state.newSurname}
                        keyboardType="default"
                        />

                        <View style={{marginVertical: 8}}/>
                        <View style={styles.modalHairline}/>

                        <View style={{marginVertical: 10}}/>

                        <TouchableOpacity style={styles.modalButton} 
                        onPress={() => {this.setState({nameChangeModal: false}), this.updateName(this.state.newName, this.state.newSurname)
                                        }}>
                            <TitilliumWeb style={styles.modalButtonProceedText}>atlikti pakeitimus</TitilliumWeb>
                        </TouchableOpacity>

                        <View style={{marginVertical: 10}}/>

                        <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({nameChangeModal: false})}>
                            <TitilliumWeb style={styles.modalButtonCancelText}>atšaukti</TitilliumWeb>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/* Pop-up'as pakeisti mail'ą */}
            <Modal transparent={true} visible={this.state.emailChangeModal} animationType={'fade'}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                    <View style={styles.modalMail}>
                        <View style={styles.modalHairline}/>

                        <View style={{marginVertical: 8}}/>

                        <TitilliumWeb style={styles.modalTitle}>jūsų paštas:</TitilliumWeb>
                        <TitilliumWeb style={styles.modalMailInfo}>{this.state.mail}</TitilliumWeb>

                        <View style={{marginVertical: 5}}/>
                        <View style={styles.modalHairline}/>


                        <View style={{marginVertical: 8}}/>

                        <TitilliumWeb style={styles.modalTitle}>pakeisti paštą</TitilliumWeb>
                        <View style={{marginVertical: 5}}/>
                        <TextInput onChangeText={this.handleEmailChange}
                        style={styles.modalInput}
                        underlineColorAndroid="transparent"
                        placeholder="įveskite..."
                        placeholderTextColor={Colors.hintText}               
                        multiline={false}
                        value={this.state.newMail}
                        keyboardType="default"
                        />

                        <View style={{marginVertical: 8}}/>
                        <View style={styles.modalHairline}/>

                        <View style={{marginVertical: 10}}/>

                        <TouchableOpacity style={styles.modalButton} 
                        onPress={() => {this.setState({emailChangeModal: false}), this.updateMail(this.state.newMail)
                                        }}>
                            <TitilliumWeb style={styles.modalButtonProceedText}>atlikti pakeitimus</TitilliumWeb>
                        </TouchableOpacity>

                        <View style={{marginVertical: 10}}/>

                        <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({emailChangeModal: false})}>
                            <TitilliumWeb style={styles.modalButtonCancelText}>atšaukti</TitilliumWeb>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Pop-up'as pakeisti slaptažodį */}
            {/* TODO uždėti ikona kokią, kurią tik paspaudus bus matomas passwordas, otherwise bus hidden */}
            <Modal transparent={true} visible={this.state.passwordChangeModal} animationType={'fade'}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                    <View style={styles.modalPassword}>
                        <View style={styles.modalHairline}/>

                        <View style={{marginVertical: 8}}/>

                        <TitilliumWeb style={styles.modalTitle}>jūsų slaptažodis:</TitilliumWeb>
                        <TitilliumWeb style={styles.modalPasswordInfo}>{this.state.password}</TitilliumWeb>

                        <View style={{marginVertical: 5}}/>
                        <View style={styles.modalHairline}/>


                        <View style={{marginVertical: 8}}/>

                        <TitilliumWeb style={styles.modalTitle}>pakeisti slaptažodį</TitilliumWeb>
                        <View style={{marginVertical: 5}}/>
                        <TextInput onChangeText={this.handlePasswordChange}
                        style={styles.modalInput}
                        underlineColorAndroid="transparent"
                        placeholder="įveskite..."
                        placeholderTextColor={Colors.hintText}               
                        multiline={false}
                        value={this.state.newPassword}
                        keyboardType="default"
                        secureTextEntry={true}
                        />

                        <View style={{marginVertical: 8}}/>
                        <View style={styles.modalHairline}/>

                        <View style={{marginVertical: 10}}/>

                        <TouchableOpacity style={styles.modalButton} 
                        onPress={() => {this.setState({passwordChangeModal: false}), this.updatePassword(this.state.newPassword)
                                        }}>
                            <TitilliumWeb style={styles.modalButtonProceedText}>atlikti pakeitimus</TitilliumWeb>
                        </TouchableOpacity>

                        <View style={{marginVertical: 10}}/>

                        <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({passwordChangeModal: false})}>
                            <TitilliumWeb style={styles.modalButtonCancelText}>atšaukti</TitilliumWeb>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> 

            {/* Pop-up'as pakeisti foto */}            
            <Modal transparent={true} visible={this.state.photoChangeModal} animationType={'fade'}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                    <View style={styles.modalPhoto}>
                        <TitilliumWeb>neturim user fotkiu displayinimo galimybes, tai kol kas nieko cia nera</TitilliumWeb>
                    <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({photoChangeModal: false})}>
                        <TitilliumWeb style={styles.modalButtonCancelText}>atšaukti</TitilliumWeb>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>                       

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
        borderColor: Colors.hairline,
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
    photoComponent: {
        flexDirection: 'column',
        alignSelf: 'center',
    },
    nameComponent: {
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
        borderColor: Colors.photoCircle,
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
    buttonContainer: {
        flexDirection: 'row',        
    },
    icon: {
        marginTop: 2,
    },
    basicText: {
        fontSize: 15,
        color: Colors.defaultText,
        paddingLeft: 15,
        marginTop: 5
    },
    modalName: {
        backgroundColor: Colors.containerColor, 
        flex: 1, 
        borderColor: Colors.buttonBorderColorBlack,
        borderWidth: 1.5, 
        marginVertical: 80,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginHorizontal: 40, 
        borderRadius: 10, 
    },
    modalMail: {
        backgroundColor: Colors.containerColor, 
        flex: 1, 
        borderColor: Colors.buttonBorderColorBlack,
        borderWidth: 1.5, 
        marginVertical: 145,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginHorizontal: 40, 
        borderRadius: 10, 
    },
    modalPassword: {
        backgroundColor: Colors.containerColor, 
        flex: 1, 
        borderColor: Colors.buttonBorderColorBlack,
        borderWidth: 1.5, 
        marginVertical: 140,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginHorizontal: 40, 
        borderRadius: 10, 
    },
    modalPhoto: {
        backgroundColor: Colors.containerColor, 
        flex: 1, 
        borderColor: Colors.buttonBorderColorBlack,
        borderWidth: 1.5, 
        marginVertical: 80,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginHorizontal: 40, 
        borderRadius: 10, 
    },
    modalButton: {
        backgroundColor: Colors.buttonColor,
        borderWidth: 1,
        borderColor: Colors.buttonBorderColorBlack,
        height: 50,
        width: 210,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
    },
    modalButtonProceedText: {
        color: Colors.defaultText,
        fontSize: 19,
    },
    modalButtonCancelText: {
        color: Colors.blackText,
        fontSize: 19,
    },
    modalHairline: {
        borderBottomWidth: 1,
        paddingTop: 4.5,
        borderColor: Colors.hairline,
        width: 210,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        alignSelf: 'flex-start',
        fontSize: 18,
        color: Colors.blackText,
        marginLeft: 20,
    },
    modalUserInfo: {
        alignSelf: 'center',
        fontSize: 30,
        color: Colors.blackText,
    },
    modalMailInfo: {
        alignSelf: 'center',
        fontSize: 20,
        color: Colors.blackText,
    },
    modalPasswordInfo: {
        alignSelf: 'center',
        fontSize: 25,
        color: Colors.blackText,
    },
    modalInput: {
        alignSelf: 'center',
        width: 190,
        borderBottomColor: Colors.buttonBorderColorGray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontSize: 18,
    },
});