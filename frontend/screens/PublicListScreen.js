import * as React from 'react';
import { render } from 'react-dom';
import { Keyboard, Modal, View, KeyboardAvoidingView, ActivityIndicator, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, ImageBackground, Image, RefreshControl, ToastAndroid, AlertIOS } from 'react-native';
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
const screenHeight = Dimensions.window.height;

/*
    This is the screen for the main list of all public posts.
*/
export default class PublicList extends React.Component{

    state = {
        isLoading: false,
        inputValue: 'ieškoti...',
        showModal: false,
        showFilterModal: false,
        results: [
            {
                post_id: '',
                picture_uri: '',
                body: '',
                available_from_date: '',
                available_to_date: '',
                brand: '',
                model: '',
                user_id: '',
            }
        ],
        sel_picture: '',
        sel_post_id: '',
        sel_brand: '',
        sel_model: '',
        sel_available_from_date: '',
        sel_available_to_date: '',
        sel_price: 'TBI',
        sel_location: 'TBI',
        sel_body: '',
        sel_user_id: '',

        filterMinPrice: '',
        filterMaxPrice: '',
        filterCar: '',
        filterCity: '',
        filteringOptions: [
            {value: 'pigiausi viršuje',},
            {value: 'pigiausi apačioje',},
            {value: 'artimiausi viršuje',},
            {value: 'artimiausi apačioje',},
            {value: 'nuo A iki Z',},
            {value: 'nuo Z iki A',}
        ],
    };

    componentDidMount(){
        this.fetchJson();
    }

    fetchJson = () => {
        this.setState({isLoading: true});
        fetch('http://' + env.server.ip + ':' + env.server.port + '/posts/',{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({ isLoading: false, results: responseJson})
      })
      .catch((error) =>{
          console.error(error);
          this.setState({isLoading: false});
      });
    }

    fetchJson_byBrand = (brand) => {
        this.setState({isLoading: true}); // start loading new filtered data
        fetch('http://' + env.server.ip + ':' + env.server.port + '/posts/filterBrand/' + brand,{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response) => response.ok ? response.json() : // nested one-liner if, spaghettio
            Platform.OS === "android" ? ToastAndroid.show("įrašų nerasta", ToastAndroid.LONG) : AlertIOS.alert("įrašų nerasta"))
        .then((responseJson) => {
            this.setState({ isLoading: false, results: responseJson})
        })
        .catch((error) =>{
            console.error(error);
            this.setState({isLoading: false});
        });
    }

    getSelectedCarData = (item) => {
        this.setState({sel_post_id: item.post_id, 
                       sel_brand: item.brand, 
                       sel_model: item.model,
                       sel_picture: item.picture_uri,
                       sel_available_from_date: item.available_from_date,
                       sel_available_to_date: item.available_to_date,
                       sel_body: item.body,
                       sel_user_id: item.user_id});
    }

    handlePriceFromInput = (text) => {
        this.setState({ filterMinPrice: text})
    }

    handlePriceToInput = (text) => {
        this.setState({ filterMaxPrice: text})
    }

    handleCarInput = (text) => {
        this.setState({ filterCar: text})
    }

    handleCity = (text) => {
        this.setState({ filterMinDistance: text})
    }

    handleDistanceToInput = (text) => {
        this.setState({ filterMaxDistance: text})
    }

    handleFiltering = () => {
        this.setState({showFilterModal: false}) // remove popup
        this.fetchJson_byBrand(this.state.filterCar);
    }

    render() {
        if(this.state.isLoading){
            return(
                <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
                                style={styles.background}>
                    <View style={{flex:1,padding:20}}>
                        <ActivityIndicator/>
                    </View>
                </ImageBackground>
            )
        }
        return(
            <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
                                style={styles.background}>

                {/* "Skelbimai" eilė */}
                <View style={styles.postContainer}>
                    <TitilliumWeb style={styles.title}>skelbimai</TitilliumWeb>
                    <View style={{marginLeft: 140}}/>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Notifications")}>
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
                                   value={this.state.inputValue} maxLength={25} />
                        <View style={{marginHorizontal: 3}}/>
                        <TouchableOpacity style={styles.filterIcon} onPress={() => this.setState({showFilterModal: true})}>
                            <FontAwesome name={"filter"} sizeOf={25} colorOf={"iconColor"}/>
                        </TouchableOpacity>                               
                        <View style={{marginLeft: 7}}/>
                    </View>

                    <View style={styles.hairline}/>
                                     
                </View>


                <View style={styles.listContainer}>
                
                    <FlatList
                        refreshControl={ // pulldown refresh
                            <RefreshControl
                                isLoading={this.state.isLoading}
                                onRefresh={this.fetchJson}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        data={this.state.results}
                        renderItem={({item}) =>
                            <View style={{paddingBottom: 15}}>
                                <TouchableOpacity style={styles.carContainer} onPress={() => {this.getSelectedCarData(item), this.setState({showModal: true})}}>

                                    {/* Foto komponentas */}
                                    <View style={styles.circle}>
                                        <View style={styles.carIconBehind}>
                                            <IonicsIcon name={"ios-car"} sizeOf={70} colorOf={"iconColor"}/>
                                        </View>
                                                                              
                                        <Image
                                            style={styles.carIconBehind}
                                            source={{uri: item.picture_uri}}
                                        />                      
                                    </View>

                                    {/* Info komponentas */}
                                    <View style={styles.carNameAndDistance}>
                                        <TitilliumWeb style={{fontSize: 16}}>{item.brand} {item.model}</TitilliumWeb>
                                        <View style={{marginVertical: 3}}/>
                                        <TitilliumWeb style={{fontSize: 16}}>Kaina: TBI €</TitilliumWeb>
                                        <View style={{marginVertical: 3}}/>
                                        <TitilliumWeb style={{fontSize: 16}}>Miestas: TBI</TitilliumWeb>
                                    </View>

                                    {/* Ikona */}
                                    <View style={styles.arrowIcon}>
                                        <IonicsIcon name={"ios-arrow-forward"} sizeOf={45} colorOf={"arrowIdle"} />
                                    </View>                                 

                                
                                </TouchableOpacity>                       
                            </View>}
                            keyExtractor={item => item.id}
                />

                    {/* Pop-up'as pasirinktos mašinos */}    
                    <Modal transparent={true} visible={this.state.showModal} animationType={'fade'}>
                        <View style={{backgroundColor: '#000000aa', flex: 1}}>
                            
                            <View style={styles.modal}>                                
                                <View style={styles.modalHairline}/>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                
                                    <View style={{marginVertical: 5}}/>

                                    <View style={styles.modalCircle}>
                                        <View style={styles.modalCarIconBehind}>
                                            <IonicsIcon name={"ios-car"} sizeOf={150} colorOf={"iconColor"}/>
                                            <TitilliumWeb style={styles.circleText}>foto nerasta</TitilliumWeb>
                                        </View>
                                    
                                        <Image
                                            style={styles.modalCarIconBehind}
                                            source={{uri: this.state.sel_picture}}
                                        />                                    
                                    </View>

                                    <View style={{marginVertical: 5}}/>
                                    <View style={styles.modalHairline}/>
                                    <View style={{marginVertical: 5}}/>

                                    <View style={styles.modalCarNameContainer}>
                                        <TitilliumWeb style={styles.modalBrandName}>{this.state.sel_brand}</TitilliumWeb>
                                        <TitilliumWeb style={styles.modalModelName}>{this.state.sel_model}</TitilliumWeb>
                                    </View>

                                    <View style={{marginVertical: 10}}/>

                                    <View style={styles.modalDateContainer}>                             
                                        <TitilliumWeb style={styles.modalDateFrom}>nuo {moment(this.state.sel_available_to_date).format('YYYY-MM-DD, HH:mm')} </TitilliumWeb>
                                        <TitilliumWeb style={styles.modalDateUntil}>iki {moment(this.state.sel_available_from_date).format('YYYY-MM-DD, HH:mm')}</TitilliumWeb>
                                    </View>

                                    <View style={{marginVertical: 5}}/>
                                    <View style={styles.modalHairline}/>
                                    <View style={{marginVertical: 5}}/>

                                    <View style={styles.modalInfoLine}>
                                        <View style={{marginLeft: 21}}/>
                                        <TitilliumWeb style={styles.modalAutoPriceText}>kaina: </TitilliumWeb>
                                        <View style={{marginLeft: 113}}/>
                                        <TitilliumWeb style={styles.modalAutoActualPriceText}>{this.state.sel_price} €</TitilliumWeb>
                                    </View>

                                    <View style={{marginVertical: 2}}/>

                                    <View style={styles.modalInfoLine}>
                                        <View style={{marginLeft: 21}}/>
                                        <TitilliumWeb style={styles.modalAutoPriceText}>atstumas: </TitilliumWeb>
                                        <View style={{marginLeft: 63}}/>
                                        <TitilliumWeb style={styles.modalAutoActualPriceText}>{this.state.sel_location} km</TitilliumWeb>
                                    </View>

                                    <View style={{marginVertical: 5}}/>
                                    <View style={styles.modalHairline}/>
                                    <View style={{marginVertical: 5}}/>

                                    <TitilliumWeb style={styles.modalComment}>{this.state.sel_body}</TitilliumWeb>


                                    <View style={{marginVertical: 5}}/>
                                    <View style={styles.modalHairline}/>
                                    <View style={{marginVertical: 5}}/>

                                    <View style={{marginVertical: 13}}/>

                                    <TouchableOpacity style={styles.modalButton} 
                                                      onPress={() => {this.setState({showModal: false}),
                                                      console.log('Vartotojas nori susiekti su nuomininku'), 
                                                      this.props.navigation.navigate('Chats')}}>                                
                                        <TitilliumWeb style={styles.modalButtonText}>susisiekti</TitilliumWeb>
                                    </TouchableOpacity>

                                    <View style={{marginVertical: 10}}/>

                                    <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({showModal: false})}>                                
                                        <TitilliumWeb style={styles.modalButtonText}>grįžti</TitilliumWeb>
                                    </TouchableOpacity>

                                    <View style={{marginVertical: 13}}/>
                                </ScrollView>
                                <View style={styles.modalHairline}/>
                            </View>                            
                        </View>
                    </Modal>

                    {/* Pop-up'as filtravimui ir rikiavimui*/}
                    <Modal transparent={true} visible={this.state.showFilterModal} animationType={'fade'}>
                        {/* https://reactnative.dev/docs/keyboardavoidingview nice meme */}
                        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{marginBottom: 0, paddingBottom: 0, backgroundColor: '#000000aa', flex: 1}}>
                            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.filterModal}>
                                <View style={styles.filterModalHairline}/>
                                <View style={{height:'100%'}}>
                                <ScrollView keyboardShouldPersistTaps='always'>
                                
                                <TitilliumWeb style={styles.filterModalHeader}>kaina</TitilliumWeb>
                                
                                <View style={styles.filterModalContainer}>                        
                                    <TextInput onChangeText={this.handlePriceFromInput}
                                    style={styles.filterPriceInputField}
                                    underlineColorAndroid="transparent"
                                    placeholder="nuo"
                                    placeholderTextColor={Colors.hintText}               
                                    multiline={false}
                                    value={this.state.filterMinPrice}
                                    keyboardType="numeric"
                                    maxLength={8}/>

                                    <TitilliumWeb style={{marginTop: -2, marginLeft: 4, color: Colors.hintText, fontSize: 16}}>€</TitilliumWeb>
                                    <TitilliumWeb style={{marginHorizontal: 16}}>–</TitilliumWeb>

                                    <TextInput onChangeText={this.handlePriceToInput}
                                    style={styles.filterPriceInputField}
                                    underlineColorAndroid="transparent"
                                    placeholder="iki"
                                    placeholderTextColor={Colors.hintText}               
                                    multiline={false}
                                    value={this.state.filterMaxPrice}
                                    keyboardType="numeric"
                                    maxLength={8}/>
                                    <TitilliumWeb style={{marginTop: -2, marginLeft: 2, color: Colors.hintText, fontSize: 16}}>€</TitilliumWeb>
                                </View>
                                
                                <View style={{marginVertical: 10}}/>
                                <TitilliumWeb style={styles.filterModalHeader}>automobilis</TitilliumWeb>

                                <View style={styles.filterModalContainer}>
                                <TextInput onChangeText={this.handleCarInput}
                                    style={styles.filterCarInputField}
                                    underlineColorAndroid="transparent"
                                    placeholder="įveskite raktažodį..."
                                    placeholderTextColor={Colors.hintText}
                                    multiline={false}
                                    value={this.state.filterCar}
                                    keyboardType="default"
                                    maxLength={30}/>
                                </View>

                                <View style={{marginVertical: 10}}/>
                                <TitilliumWeb style={styles.filterModalHeader}>miestas</TitilliumWeb>

                                <View style={styles.filterModalContainer}>                        
                                    <TextInput onChangeText={this.handleCity}
                                    style={styles.filterCarInputField}
                                    underlineColorAndroid="transparent"
                                    placeholder="įveskite miestą..."
                                    placeholderTextColor={Colors.hintText}
                                    multiline={false}
                                    value={this.state.filterCity}
                                    />
                                </View>

                                <View style={{marginVertical: 10}}/>
                                <View style={styles.filterModalHairline}/>
                                <View style={{marginVertical: 10}}/>

                                <View style={styles.filterModalContainer}>
                                    <View style={styles.filterSortBoxStyle}>                                    
                                        <Dropdown
                                        baseColor='black'
                                        label='rikiuoti pagal'
                                        pickerStyle={styles.dropdownPickerStyle}
                                        data={this.state.filteringOptions}
                                        />
                                    </View>
                                </View>

                                <View style={{marginVertical: 25}}/>

                                <TouchableOpacity style={styles.filterModalButton} onPress={this.handleFiltering}>                                
                                    <TitilliumWeb style={styles.filterModalButtonText}>tęsti</TitilliumWeb>
                                </TouchableOpacity>


                                </ScrollView>
                                </View>
                                <View style={styles.filterModalHairline}/>
                            </KeyboardAvoidingView>
                        </KeyboardAvoidingView>
                    </Modal>

                </View>
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
    marginVertical: -1,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 1,
        marginLeft: 20,
    },
    bellIcon: {
        paddingHorizontal: 25,
        paddingTop: 5,
        paddingBottom: 4,
    },
    hairline: {
        borderBottomWidth: 1,
        paddingTop: 4.5,
        borderColor: Colors.hairline,
        width: 315,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    postContainer: {
        flexDirection: 'row',
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    searchInput: {
        color: Colors.hintText,
        fontSize: 16,
        width: 225,
    },
    carContainer: {
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
    carIconBehind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 90/2,
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
        marginLeft: screenWidth - 360,
    },
    modal: {
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
        borderRadius: 10, 
    },
    modalCircle: {
        width: 210,
        height: 210,
        alignSelf: 'center',
        borderRadius: 210/2,
        borderWidth: 1,
        borderColor: Colors.photoCircle,
    },
    modalCarIconBehind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 210/2,
        width: '100%',
        height: '100%'
    },
    circleText: {
        alignSelf: 'center',
        color: Colors.hintText,
        fontSize: 16,
        marginTop: -30,
    },
    modalHairline: {
        borderBottomWidth: 1,
        borderColor: Colors.hairline,
        width: 210,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    modalCarNameContainer: {
        flexDirection: 'column',
        alignSelf: 'center',
        alignContent: 'center',
    },
    modalBrandName: {
        alignSelf: 'center',
        fontSize: 31,
    },
    modalModelName: {
        alignSelf: 'center',
        fontSize: 23,
    },
    modalDateContainer: {
        flexDirection: 'column',
        alignSelf: 'center',
        alignContent: 'center',
    },
    modalDateFrom: {
        alignSelf: 'center',
        fontSize: 17,
        color: Colors.defaultText,
    },
    modalDateUntil: {
        alignSelf: 'center',
        fontSize: 17,
        color: Colors.importantText,
    },
    modalInfoLine: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    modalAutoPriceText: {
        marginTop: 4,
        fontSize: 18,
        color: Colors.blackText,
    },
    modalAutoActualPriceText: {
        fontSize: 22,
        color: Colors.defaultText,
    },
    modalComment: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginHorizontal: 21,
    },
    modalButtonText: {
        fontSize: 20,
        alignSelf: 'center',
        color: Colors.blackText,
    },



    filterModal: {
        backgroundColor: Colors.containerColor, 
        borderColor: Colors.buttonBorderColorBlack,
        borderWidth: 1.5, 
        marginTop: '10%', //screenHeight*0.05, //screenHeight is a constant, and plain percentage can cause bugs
        paddingTop: 20,
        paddingHorizontal: 20,
        marginHorizontal: '10%', 
        borderRadius: 10,
        //height: '100%', // nezinau per daug laiko praleidau ir vis tiek nesupratau kodel apacioje tiek daug dead space
        marginBottom: '30%',
        paddingBottom: 0,
        flex: 1
    },
    filterModalButton: {
        backgroundColor: Colors.buttonColor,
        borderWidth: 1,
        borderColor: Colors.buttonBorderColorBlack,
        height: 50,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10, 
    },
    filterModalHairline: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.hairline,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    filterModalButtonText: {
        fontSize: 20,
        alignSelf: 'center',
        color: Colors.blackText,
    },
    filterModalHeader: {
        alignSelf: 'flex-start',
        // paddingTop: 10, // butu gerai kazkaip atskirti aiskiau, tik sitas su pirmu elementu nedraugauja
        paddingBottom: 10,
        fontSize: 16,
    },
    filterModalContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    filterPriceInputField: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.hairline,
        width: 72,
        height: 20,
    },
    filterCarInputField: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.hairline,
        width: '100%',
        height: 20,
    },
    dropdownPickerStyle: {
        backgroundColor: Colors.containerColor, 
        marginTop: 86, 
        width: 182, 
        height: 90, 
        marginLeft: 15,
        borderColor: Colors.buttonBorderColorBlack,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    filterSortBoxStyle: {
        width: '100%', 
        justifyContent: 'center',
        height: 50,
        marginTop: -8,
    },
    filterIcon: {
        
    }
})