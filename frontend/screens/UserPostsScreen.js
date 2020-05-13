import * as React from 'react'
import { render } from 'react-dom';
import { Fragment, useState } from 'react'
import { Modal, TouchableOpacity, StyleSheet, View, ImageBackground, Image, Text, ActivityIndicator, TextInput, RefreshControl, AsyncStorage, Button} from 'react-native';
import moment from "moment";

import Dimensions from '../constants/Layout';
import Colors from '../constants/Colors';
import { TitilliumWeb } from '../components/TitilliumWeb';
import FontAwesome from '../components/FontAwesomeIcon';
import IonicsIcon from '../components/IonicsIcon';
import MaterialIcon from '../components/MaterialCommunityIcons'
import { ScrollView, FlatList } from 'react-native-gesture-handler';

const screenWidth = Dimensions.window.width;


import env from '../env/server';
export default class PublicList extends React.Component{
    
    state = {
        isLoading: false,
        results: [
            {
                post_id: '',
                picture_uri: '',
                body: '',
                available_from_date: '',
                available_to_date: '',
                brand: '',
                model: '',
                user_id: ''
            }
        ]
    };

    state = {
        isLoading: false,
        showPrivate: false,
        privateIconName: 'account-key-outline',
        publicPosts: 2,
        privatePosts: 1,
        publicPost: [
            {
                picture_uri: '',
                brand: "BMW", 
                model: "530", 
                availableFrom: "2020, 05, 10, 18, 27", 
                availableUntil: "2020, 05, 12, 15, 00",
                comment: "Lorem ipsum"
            },
            {
                picture_uri: '',
                brand: "Volkswagen", 
                model: "Golf", 
                availableFrom: "2020, 05, 10, 18, 27", 
                availableUntil: "2020, 05, 12, 15, 00",
                comment: "Lorem ipsum"
            }
        ],
        privatePost: [
            {
                picture_uri: '',
                brand: "Audi", 
                model: "A6", 
                availableFrom: "2020, 05, 10, 18, 27", 
                availableUntil: "2020, 05, 12, 15, 00",
                comment: "Lorem ipsum"
            }
        ],
    };

    componentDidMount(){
        this.fetchJson();
    }

    fetchPosts = () => {
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


    handleDeletion = async (key) => {
        console.log(key)
        fetch('http://' + env.server.ip + ':' + env.server.port + '/posts/' + key, {
        method: 'DELETE', 
        })
        .then(res => res.text())
        .then(res => console.log(res))
        this.fetchJson()
    }


    updatePost = async (key) => { 
        const userID = await AsyncStorage.getItem('user_id');

            var data = {
                picture_uri: 'atnaujinom',
                body: 'atnaujinom',
                available_from_date: moment(this.state.availableFromDate).format('YYYY-MM-DD, HH:mm'),
                available_to_date: moment(this.state.availableToDate).format('YYYY-MM-DD, HH:mm'),
                brand: 'atnaujinom3',
                model: 'atnaujinom',
                is_private: false,
                user_id: userID
            }
            fetch('http://' + env.server.ip + ':' + env.server.port + '/posts/' + key, {
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
            this.fetchJson()
    }

    fetchJson = async () => {
        const userID = await AsyncStorage.getItem('user_id');
        this.setState({isLoading: true});
        fetch('http://' + env.server.ip + ':' + env.server.port + '/posts/user/' + userID,{
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

    render() {
        if(this.state.isLoading){
            return(
                <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
                                style={styles.background} blurRadius={5}>
                    <View style={{flex:1,padding:20}}>
                        <ActivityIndicator/>
                    </View>
                </ImageBackground>
            )
        }
        else{
            return(
            <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
            style={styles.background} blurRadius={5}>
                {/* "Skelbimai" eilė */}
                <View style={styles.postContainer}>
                    <TitilliumWeb style={styles.title}>jūsų skelbimai</TitilliumWeb>
                    <View style={{marginHorizontal: 35}}/>
                    <TouchableOpacity value={this.state.showPrivate} 
                                      onPress={() => {if(this.state.showPrivate === false){
                                        this.setState({showPrivate: true})
                                        this.setState({privateIconName: 'account-key'})
                                    }
                                      if(this.state.showPrivate === true){
                                        this.setState({showPrivate:  false})
                                        this.setState({privateIconName: 'account-key-outline'})
                                    }}} >
                        <View style={styles.bellIcon}>
                            <MaterialIcon name={this.state.privateIconName} sizeOf={28} colorOf={"iconColor"}/>
                        </View> 
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => null}>
                        <View style={styles.bellIcon}>
                            <FontAwesome name={"bell"} sizeOf={25} colorOf={"iconColor"}/>
                        </View> 
                    </TouchableOpacity>
                    <View style={{marginLeft: -5}}/>                                                        
                </View>

                <View>
                    <View style={styles.hairline}/>
                    <View style={{marginVertical: 5}}/>

                    <TouchableOpacity style={styles.newCarIconContainer} onPress={() => this.props.navigation.navigate("Post")}>
                        <View style={styles.newCarIcon}>
                            <IonicsIcon name={"ios-car"} sizeOf={50} colorOf={"iconColor"}/>
                        </View>
                        <FontAwesome style={styles.plusIcon} name={"plus"} sizeOf={25} colorOf={"iconColor"}/>
                        <TitilliumWeb style={styles.newPostText}>sukurti naują...</TitilliumWeb>
                    </TouchableOpacity>  


                    <View style={styles.hairline}/>                                     
                </View>

                
                {/*Refresh control'o reikia, reference yra publicPosts branche PublicListScreen*/}                    
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{marginVertical: 20}}/>
                    <TitilliumWeb style={styles.title}>vieši skelbimai</TitilliumWeb>

                    <ReturnPublicList numberOfPublicPosts={this.state.publicPosts} 
                                      car={this.state.publicPost}/>

                    <View style={{marginVertical: 20}}/>
                    
                    <ReturnPrivateList numberOfPrivatePosts={this.state.privatePosts} 
                                       car={this.state.privatePost}
                                       isAllowedToShow={this.state.showPrivate}/>
                </ScrollView>                
            </ImageBackground> 
            )
        }
    }
}

function ReturnPublicList(props){

    const [popUp, setPopUp] = useState(false);

    //Tikrai ne pats geriausias budas info susidet apie einamaji auto, 
    //bet nezinau kaip 'graziai' padaryt
    //cia dar id's reikia
    const [carPhoto, setCarPhoto] = useState('');
    const [carBrand, setCarBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carAvailableFrom, setCarAvailableFrom] = useState('');
    const [carAvailableTo, setCarAvailableTo] = useState('');
    const [carComment, setCarComment] = useState('');

    if(props.numberOfPublicPosts > 0){
        return(
           
            
            <Fragment>
            <View style={{marginVertical: 10}}/>
            <FlatList data={props.car} scrollEnabled={false}
            renderItem={({item}) => 
                <View style={{paddingBottom: 15}}>
                <TouchableOpacity style={styles.carContainer} 
                                  onPress={() => {setPopUp(true), setCarPhoto(item.picture_uri)
                                                  setCarBrand(item.brand), setCarModel(item.model),
                                                  setCarAvailableFrom(item.availableFrom), 
                                                  setCarAvailableTo(item.carAvailableTo), 
                                                  setCarComment(item.comment)}}>

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
                        <TitilliumWeb style={{fontSize: 16}}>Atstumas: TBI km</TitilliumWeb>
                    </View>

                    {/* Ikona */}
                    <View style={styles.arrowIcon}>
                        <IonicsIcon name={"ios-arrow-forward"} sizeOf={45} colorOf={"arrowIdle"} />
                    </View>                                 
                
                </TouchableOpacity>                       
                </View>

                
            } 
            />

            <Modal transparent={true} visible={popUp} animationType={'fade'}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                    
                    <View style={styles.modal}>                                
                        <View style={styles.modalHairline}/>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        
                            <View style={{marginVertical: 7}}/>

                            <TitilliumWeb style={styles.modalPostTypeText}>viešas skelbimas</TitilliumWeb>

                            <View style={{marginVertical: 7}}/>

                            <View style={styles.modalCircle}>
                                <View style={styles.modalCarIconBehind}>
                                    <IonicsIcon name={"ios-car"} sizeOf={150} colorOf={"iconColor"}/>
                                    <TitilliumWeb style={styles.circleText}>foto nerasta</TitilliumWeb>
                                </View>
                            
                                {/*<Image
                                    style={styles.modalCarIconBehind}
                                    source={{uri: this.state.sel_picture}}
                                />*/}                                    
                            </View>

                            <View style={{marginVertical: 5}}/>
                            <View style={styles.modalHairline}/>
                            <View style={{marginVertical: 5}}/>

                            <View style={styles.modalCarNameContainer}>
                                <TitilliumWeb style={styles.modalBrandName}>{carBrand}</TitilliumWeb>
                                <TitilliumWeb style={styles.modalModelName}>{carModel}</TitilliumWeb>
                            </View>

                            <View style={{marginVertical: 10}}/>

                            <View style={styles.modalDateContainer}>                             
                                <TitilliumWeb style={styles.modalDateFrom}>nuo {moment(carAvailableFrom).format('YYYY-MM-DD, HH:mm')} </TitilliumWeb>
                                <TitilliumWeb style={styles.modalDateUntil}>iki {moment(carAvailableTo).format('YYYY-MM-DD, HH:mm')}</TitilliumWeb>
                            </View>

                            <View style={{marginVertical: 5}}/>
                            <View style={styles.modalHairline}/>
                            <View style={{marginVertical: 5}}/>

                            <View style={styles.modalInfoLine}>
                                <View style={{marginLeft: 21}}/>
                                <TitilliumWeb style={styles.modalAutoPriceText}>kaina: </TitilliumWeb>
                                <View style={{marginLeft: 113}}/>
                                <TitilliumWeb style={styles.modalAutoActualPriceText}>TBI €</TitilliumWeb>
                            </View>

                            <View style={{marginVertical: 2}}/>

                            <View style={styles.modalInfoLine}>
                                <View style={{marginLeft: 21}}/>
                                <TitilliumWeb style={styles.modalAutoPriceText}>atstumas: </TitilliumWeb>
                                <View style={{marginLeft: 63}}/>
                                <TitilliumWeb style={styles.modalAutoActualPriceText}>TBI km</TitilliumWeb>
                            </View>

                            <View style={{marginVertical: 5}}/>
                            <View style={styles.modalHairline}/>
                            <View style={{marginVertical: 5}}/>

                            <TitilliumWeb style={styles.modalComment}>{carComment}</TitilliumWeb>


                            <View style={{marginVertical: 5}}/>
                            <View style={styles.modalHairline}/>
                            <View style={{marginVertical: 5}}/>

                            <View style={{marginVertical: 13}}/>
                            
                            <TouchableOpacity style={styles.modalButton} 
                                            onPress={() => {setPopUp(false), console.log("išrintas skelbimas")}}>                                
                                <TitilliumWeb style={styles.modalButtonImportantText}>ištrinti skelbimą</TitilliumWeb>
                            </TouchableOpacity>

                            <View style={{marginVertical: 10}}/>

                            <TouchableOpacity style={styles.modalButton} 
                                            onPress={() => {setPopUp(false), console.log("skelbimas pakeistas į privatų")}}>                                
                                <TitilliumWeb style={styles.modalButtonYellowText}>padaryti privatų</TitilliumWeb>
                            </TouchableOpacity>

                            <View style={{marginVertical: 10}}/>

                            <TouchableOpacity style={styles.modalButton} onPress={() => setPopUp(false)}>                                
                                <TitilliumWeb style={styles.modalButtonText}>grįžti</TitilliumWeb>
                            </TouchableOpacity>

                            <View style={{marginVertical: 13}}/>
                            
                        </ScrollView>
                        <View style={styles.modalHairline}/>
                    </View>                            
                </View>
            </Modal>

            </Fragment>
        )
    }
    else{
        return(
            <TitilliumWeb style={styles.noPostsMessage}>skelbimų nerasta...</TitilliumWeb>
        )
    }
}

function ReturnPrivateList(props){

    const [popUp, setPopUp] = useState(false);

    //Tikrai ne pats geriausias budas info susidet apie einamaji auto, 
    //bet nezinau kaip 'graziai' padaryt
    //cia dar id's reikia
    const [carPhoto, setCarPhoto] = useState('');
    const [carBrand, setCarBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carAvailableFrom, setCarAvailableFrom] = useState('');
    const [carAvailableTo, setCarAvailableTo] = useState('');
    const [carComment, setCarComment] = useState('');

    if(props.isAllowedToShow){
        if(props.numberOfPrivatePosts > 0){
            return(
            <Fragment>
                <TitilliumWeb style={styles.title}>privatūs skelbimai</TitilliumWeb>
                <View style={{marginVertical: 10}}/>
                <FlatList data={props.car} scrollEnabled={false}
                renderItem={({item}) => 
                    <View style={{paddingBottom: 15}}>
                    <TouchableOpacity style={styles.carContainer} 
                                      onPress={() => {setPopUp(true), setCarPhoto(item.picture_uri)
                                                      setCarBrand(item.brand), setCarModel(item.model),
                                                      setCarAvailableFrom(item.availableFrom), 
                                                      setCarAvailableTo(item.carAvailableTo), 
                                                      setCarComment(item.comment)}}>
    
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
                            <TitilliumWeb style={{fontSize: 16}}>Atstumas: TBI km</TitilliumWeb>
                        </View>
    
                        {/* Ikona */}
                        <View style={styles.arrowIcon}>
                            <IonicsIcon name={"ios-arrow-forward"} sizeOf={45} colorOf={"arrowIdle"} />
                        </View>                                 
                    
                    </TouchableOpacity>                       
                    </View>
                } 
                />

            <Modal transparent={true} visible={popUp} animationType={'fade'}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                    
                    <View style={styles.modal}>                                
                        <View style={styles.modalHairline}/>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        
                            <View style={{marginVertical: 7}}/>

                            <TitilliumWeb style={styles.modalPostTypeText}>privatus skelbimas</TitilliumWeb>

                            <View style={{marginVertical: 7}}/>

                            <View style={styles.modalCircle}>
                                <View style={styles.modalCarIconBehind}>
                                    <IonicsIcon name={"ios-car"} sizeOf={150} colorOf={"iconColor"}/>
                                    <TitilliumWeb style={styles.circleText}>foto nerasta</TitilliumWeb>
                                </View>
                            
                                {/*<Image
                                    style={styles.modalCarIconBehind}
                                    source={{uri: this.state.sel_picture}}
                                />*/}                                    
                            </View>

                            <View style={{marginVertical: 5}}/>
                            <View style={styles.modalHairline}/>
                            <View style={{marginVertical: 5}}/>

                            <View style={styles.modalCarNameContainer}>
                                <TitilliumWeb style={styles.modalBrandName}>{carBrand}</TitilliumWeb>
                                <TitilliumWeb style={styles.modalModelName}>{carModel}</TitilliumWeb>
                            </View>

                            <View style={{marginVertical: 10}}/>

                            <View style={styles.modalDateContainer}>                             
                                <TitilliumWeb style={styles.modalDateFrom}>nuo {moment(carAvailableFrom).format('YYYY-MM-DD, HH:mm')} </TitilliumWeb>
                                <TitilliumWeb style={styles.modalDateUntil}>iki {moment(carAvailableTo).format('YYYY-MM-DD, HH:mm')}</TitilliumWeb>
                            </View>

                            <View style={{marginVertical: 5}}/>
                            <View style={styles.modalHairline}/>
                            <View style={{marginVertical: 5}}/>

                            <View style={styles.modalInfoLine}>
                                <View style={{marginLeft: 21}}/>
                                <TitilliumWeb style={styles.modalAutoPriceText}>kaina: </TitilliumWeb>
                                <View style={{marginLeft: 113}}/>
                                <TitilliumWeb style={styles.modalAutoActualPriceText}>TBI €</TitilliumWeb>
                            </View>

                            <View style={{marginVertical: 2}}/>

                            <View style={styles.modalInfoLine}>
                                <View style={{marginLeft: 21}}/>
                                <TitilliumWeb style={styles.modalAutoPriceText}>atstumas: </TitilliumWeb>
                                <View style={{marginLeft: 63}}/>
                                <TitilliumWeb style={styles.modalAutoActualPriceText}>TBI km</TitilliumWeb>
                            </View>

                            <View style={{marginVertical: 5}}/>
                            <View style={styles.modalHairline}/>
                            <View style={{marginVertical: 5}}/>

                            <TitilliumWeb style={styles.modalComment}>{carComment}</TitilliumWeb>


                            <View style={{marginVertical: 5}}/>
                            <View style={styles.modalHairline}/>
                            <View style={{marginVertical: 5}}/>

                            <View style={{marginVertical: 13}}/>
                            
                            <TouchableOpacity style={styles.modalButton} 
                                            onPress={() => {setPopUp(false), console.log("išrintas skelbimas")}}>                                
                                <TitilliumWeb style={styles.modalButtonImportantText}>ištrinti skelbimą</TitilliumWeb>
                            </TouchableOpacity>

                            <View style={{marginVertical: 10}}/>

                            <TouchableOpacity style={styles.modalButton} 
                                            onPress={() => {setPopUp(false), console.log("skelbimas pakeistas į viešą")}}>                                
                                <TitilliumWeb style={styles.modalButtonYellowText}>padaryti viešą</TitilliumWeb>
                            </TouchableOpacity>

                            <View style={{marginVertical: 10}}/>

                            <TouchableOpacity style={styles.modalButton} onPress={() => setPopUp(false)}>                                
                                <TitilliumWeb style={styles.modalButtonText}>grįžti</TitilliumWeb>
                            </TouchableOpacity>

                            <View style={{marginVertical: 13}}/>
                            
                        </ScrollView>
                        <View style={styles.modalHairline}/>
                    </View>                            
                </View>
            </Modal>


            </Fragment>
            )
        }
        else{
            return(
                <Fragment>
                    <TitilliumWeb style={styles.title}>privatūs skelbimai</TitilliumWeb>
                    <TitilliumWeb style={styles.noPostsMessage}>skelbimų nerasta...</TitilliumWeb>
                </Fragment> 
            )
        }
    }
    else{
        return(
            null
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
        letterSpacing: 1,
        marginLeft: 43,
    },
    bellIcon: {
        paddingHorizontal: 10,
        paddingTop: 5,
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
        marginTop: 30.5,
        alignItems: 'flex-start',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        color: Colors.hintText,
        fontSize: 18,
        width: 225,
    },
    newCarIconContainer: {
        flexDirection: 'row',
        height: 42,
        alignItems: 'flex-start',
        marginLeft: 30,
    },
    newCarIcon: {
        marginTop: -6,
    },
    plusIcon: {
        marginLeft: 5,
        marginTop: 7,
    },
    newPostText: {
        color: Colors.hintText,
        fontSize: 18,
        marginTop: 6,
        marginLeft: 10,
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
    noPostsMessage: {
        alignSelf: 'center',
        fontSize: 22,
        color: Colors.hintText,
        marginVertical: 20,
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
    modalButtonImportantText: {
        fontSize: 20,
        alignSelf: 'center',
        color: Colors.importantText,
    },
    modalButtonYellowText: {
        fontSize: 20,
        alignSelf: 'center',
        color: Colors.defaultText,
    },
    modalPostTypeText: {
        alignSelf: 'center',
        fontSize: 25,
    },
    crud_header: {
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 10
    }
})