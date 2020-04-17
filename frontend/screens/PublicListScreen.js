import * as React from 'react';
import { render } from 'react-dom';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Platform, Dimensions, Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { TitilliumWeb } from '../components/TitilliumWeb';
import IonicsIcon from '../components/IonicsIcon';
import FontAwesome from '../components/FontAwesomeIcon';


const screenWidth = Math.round((Dimensions.get('window').width))
/*
    This is the screen for the main list of all public posts.
*/
export default class PublicList extends React.Component{

    constructor(props){
        super(props);
        this.state = {isLoading: true, inputValue: 'ieškoti...', showModal: false}
        

        //Reikia reset'int navigation'a, kad negrizt atgal i login arba register
        //props.navigation.reset(); ?? 
    }
   
/*     async componentDidMount(){
        try {
        
            // change IP to your PC's internal IP that's running Docker
            const response = await fetch('192.168.1.66:3000/'); // TODO: change to ENV variables or something?
            //console.log(response);
            const responseJson = await response.json();
            console.log(responseJson);
            this.setState({
                isLoading: false,
                dataSource: responseJson,
            }, function () {
                //new state
            });
        }
        catch (error) {
            console.error(error);
        }
    } */

   

    render(){
/*         if(this.state.isLoading){
            return(               
                <View style={{flex:1,padding:20}}>
                    <ActivityIndicator/>
                </View>                
            )
        } */

        const cars = [{make: 'Volkswagen',  model: 'Passat',    distance: 26,   id: 1}, 
                      {make: 'Volvo',       model: 'V70',       distance: 22,   id: 2}, 
                      {make: 'Toyota',      model: 'Auris',     distance: 6,    id: 3},
                      {make: 'Citroen',     model: 'C3',        distance: 12,   id: 4},
                      {make: 'BMW',         model: '318i',      distance: 36,   id: 5}]

        return(
            <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
                                 style={styles.background} blurRadius={5}>

                {/* "Skelbimai" eilė */}
                <View style={styles.postContainer}>
                    <TitilliumWeb style={styles.title}>skelbimai</TitilliumWeb>
                    <View style={{marginLeft: 160}}/>
                    <TouchableOpacity onPress={() => null}>
                        <View style={styles.bellIcon}>
                            <FontAwesome name={"bell"} sizeOf={25} colorOf={"iconColor"}/>
                        </View> 
                    </TouchableOpacity>
                    <View style={{marginLeft: -5}}/>                                                        
                </View>


                
                {/* "Ieškoti" eilė */}
                <View>
                    <View style={styles.hairline}/>
                    <View style={{marginVertical: 5}}/>

                    <View style={styles.searchContainer}>
                        <IonicsIcon name={"ios-search"} sizeOf={30} colorOf={"iconColor"}/>
                        <View style={{marginHorizontal: 5}}/>                   
                        <TextInput style={styles.searchInput} clearTextOnFocus={true}  
                                   onChangeText={(text) => this.setState({inputValue: text})} 
                                   value={this.state.inputValue} />
                        <View style={{marginHorizontal: 3}}/>          
                        <FontAwesome name={"filter"} sizeOf={25} colorOf={"iconColor"}/>
                        <View style={{marginLeft: 7}}/>
                    </View>

                    <View style={styles.hairline}/>
                    <View style={{marginVertical: 10}}/>                 
                </View>  

                {/* Auto lentelės */}
                <View style={styles.listContainer}>                    
                    <FlatList                       
                        data={cars}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={{paddingBottom: 15}}>
                                <TouchableOpacity style={styles.carContainer} onPress={() => this.setState({showModal: true})}>

                                    {/* Foto komponentas */}
                                    <View style={styles.circle}>
                                        <View style={styles.carIconBehind}>
                                            <IonicsIcon name={"ios-car"} sizeOf={55} colorOf={"iconColor"}/>
                                        </View>
                                    </View>

                                    {/* Info komponentas */}
                                    <View style={styles.carNameAndDistance}>
                                        <TitilliumWeb>{item.make} {item.model}</TitilliumWeb>
                                        <View style={{marginVertical: 10}}/>
                                        <TitilliumWeb>Atstumas: {item.distance} km</TitilliumWeb>
                                    </View>

                                    {/* Ikona */}
                                    <View style={styles.arrowIcon}>
                                        <IonicsIcon name={"ios-arrow-forward"} sizeOf={45} colorOf={"arrowIdle"} />
                                    </View>                                 
                                    
                                </TouchableOpacity>   
                            </View>
                           
                        )}
                    />                   
                </View>

                {Platform.OS == "web" ? <TitilliumWeb>Note: pop up'o per web'a nerodo, nes otherwise jis uzkloja list'a negraziai, ziurek per telefona</TitilliumWeb> : undefined}
                {Platform.OS != "web" ? 
                <Modal transparent={true} visible={this.state.showModal} animationType={'fade'}>
                    <View style={{backgroundColor: '#000000aa', flex: 1}}>
                        <View style={styles.modal}>
                            <TitilliumWeb style={{alignSelf: 'center'}}>Info apie auto (WIP)</TitilliumWeb>
                            <View style={{marginVertical: 20}}/>
                            <TouchableOpacity style={styles.modalGoBackButton} onPress={() => this.setState({showModal: false})}>                                
                                <TitilliumWeb style={{alignSelf: 'center'}}>Grįžti</TitilliumWeb>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                : undefined}                     
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    listContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 1,
        marginLeft: -5,
    },
    bellIcon: {
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    hairline: {
        borderBottomWidth: 1,
        paddingTop: 4.5,
        borderColor: 'black',
        width: 315,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    postContainer: {
        flexDirection: 'row',
        marginTop: 30.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        color: '#8B8B8B',
        fontSize: 16,
        width: 225,
    },
    carContainer: {
        borderWidth: 1,
        borderColor: /* '#6D6D6D', */ 'black',
        height: 80,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        width: screenWidth,
        flexDirection: 'row',
    },
    circle: {
        marginHorizontal: 16,
        marginVertical: 10,
        width: 60,
        height: 60,
        borderRadius: 60/2,
        borderWidth: 1,
        borderColor: /* '#6D6D6D' */ 'black',
    },
    carIconBehind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: -2,
        width: '100%',
        height: '100%'
    },
    carNameAndDistance: {
        flexDirection: 'column',
        alignSelf: 'center',
        width: 200,
    },
    arrowIcon: {
        alignSelf: 'center',
        marginLeft: screenWidth - 330,
    },
    modal: {
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
    modalGoBackButton: {
        backgroundColor: '#F5F3CB',
        borderWidth: 1,
        borderColor: 'black',
        height: 50,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10, 
    },
})