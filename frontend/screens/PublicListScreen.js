import * as React from 'react';
import { render } from 'react-dom';
import { Modal, View, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image, RefreshControl } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import moment from "moment";

import Dimensions from '../constants/Layout';
import Colors from '../constants/Colors';
import { TitilliumWeb } from '../components/TitilliumWeb';
import FontAwesome from '../components/FontAwesomeIcon';
import IonicsIcon from '../components/IonicsIcon';

import env from '../env/server';

const screenWidth = Dimensions.window.width;

/*
    This is the screen for the main list of all public posts.
*/
export default class PublicList extends React.Component{

    state = {
        isLoading: false,
        inputValue: 'ieškoti...',
        showModal: false,
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
                                {/*<Text style={{fontWeight:"bold"}}>{item.brand} {item.model}</Text>
                                <Text>nuo {moment(item.available_to_date).format('YYYY-MM-DD, HH:mm')} </Text>
                                <Text>iki {moment(item.available_from_date).format('YYYY-MM-DD, HH:mm')}</Text>
                                <Text>{item.body}</Text>
                                <Image
                                    style={{ width: 150, height: 150 }}
                                    source={{ uri: item.picture_uri }} // isideti normaliu nuotrauku, kad veiktu
                                />*/}
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
                                        <TitilliumWeb style={{fontSize: 16}}>Atstumas: TBI km</TitilliumWeb>
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
                                            <TitilliumWeb style={styles.circleText}>Foto nerasta</TitilliumWeb>
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
                                        <TitilliumWeb style={styles.modalAutoPriceText}>Kaina: </TitilliumWeb>
                                        <View style={{marginLeft: 113}}/>
                                        <TitilliumWeb style={styles.modalAutoActualPriceText}>{this.state.sel_price} €</TitilliumWeb>
                                    </View>

                                    <View style={{marginVertical: 2}}/>

                                    <View style={styles.modalInfoLine}>
                                        <View style={{marginLeft: 21}}/>
                                        <TitilliumWeb style={styles.modalAutoPriceText}>Atstumas: </TitilliumWeb>
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
                                        <TitilliumWeb style={styles.modalButtonText}>Susisiekti</TitilliumWeb>
                                    </TouchableOpacity>

                                    <View style={{marginVertical: 10}}/>

                                    <TouchableOpacity style={styles.modalButton} onPress={() => this.setState({showModal: false})}>                                
                                        <TitilliumWeb style={styles.modalButtonText}>Grįžti</TitilliumWeb>
                                    </TouchableOpacity>

                                    <View style={{marginVertical: 13}}/>
                                </ScrollView>
                                <View style={styles.modalHairline}/>
                            </View>                            
                        </View>
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
        marginLeft: -5,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
})