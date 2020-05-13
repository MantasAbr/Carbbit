import * as React from 'react';
import { Image, TouchableOpacity, View, TextInput, StyleSheet, ScrollView, Alert, ImageBackground, AsyncStorage} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
const jsonData = require('../assets/json_data/CarData');
import moment from "moment";

import IonicsIcon from '../components/IonicsIcon'
import { TitilliumWeb } from '../components/TitilliumWeb'
import FontAwesomeIcon from '../components/FontAwesomeIcon';
import Colors from '../constants/Colors';
import Dimensions from '../constants/Layout';

import env from '../env/server'

export default class PostScreen extends React.Component {

  screenWidth = Math.round(Dimensions.window.width);
  
  state = {
    time: new Date(),
    image: '',
    descriptionInput: null,
    availableFromDate: "pasirinkite datą",
    availableToDate: "pasirinkite datą",
    brands: [],
    models: [],
    firstDropDownValue: null,
    secondDropDownValue: null,
    isPrivate: false,
    priceInput: null,
    locationInput: null,
    addressInput: null,
    radioButtonName: 'ios-close-circle',  
  };

  handleChangeInput = (text) => {
    this.setState({ descriptionInput: text })
  }

  handlePriceInput = (text) => {
    this.setState({ priceInput: text})
  }

  handleLocationInput = (text) => {
    this.setState({ locationInput: text})
  }

  handleAddressInput = (text) => {
    this.setState({ addressInput: text})
  }

  setSelection = (value) => {
    this.setState({isPrivate: value})
  }

  handleSubmit = async () => {
    const userID = await AsyncStorage.getItem('user_id');
    var data = {
      picture_uri: this.state.image,
      body: this.state.descriptionInput,
      available_from_date: moment(this.state.availableFromDate).format('YYYY-MM-DD, HH:mm'),
      available_to_date: moment(this.state.availableToDate).format('YYYY-MM-DD, HH:mm'),
      brand: this.state.firstDropDownValue,
      model: this.state.secondDropDownValue,
      is_private: this.state.isPrivate,
      user_id: userID
    }
    fetch('http://' + env.server.ip + ':' + env.server.port + '/posts/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(response) {
        if (response.status >= 400) {
          console.log('Couldn\'t post..')
        }
        return response.json();
    }).then(function(data) {
        console.log(data)    
        if(data == "success"){
           console.log('Posted!')
        }
    }).catch(function(err) {
        console.log(err)
    });
    
    this.props.navigation.goBack();
}
  generateBrands = () => {
    let count = Object.keys(jsonData).length;
    let aray = []
    for (let index = 0; index < count; index++) {
      var element = {};
      element.value = jsonData[index].brand;
      aray.push(element);
    }
    this.setState({brands: aray});
  }

  postSuccessful = () => {
    if (this.state.availableFromDate != "pasirinkite datą" && this.state.availableToDate != "pasirinkite datą" &&
    this.state.image != '' && this.state.descriptionInput != null && this.state.firstDropDownValue != null &&
    this.state.secondDropDownValue != null) {
        Alert.alert('Post is ready!', 'Post it?', [
          {text: 'NO', onPress: () => console.log('post cancelled'), style: 'default'},
          {text: 'OK', onPress: this.handleSubmit},
        ]);
    }else{
      Alert.alert('Error!', 'All fields must be filled.', [
        {text: 'OK', onPress: () => console.log('empty fields, not posted.')},
      ]);
    }
  }

  filterModelsByBrand = () => {

    let count = Object.keys(jsonData).length;
    let aray = []

    for(let i = 0; i < count; i++)
    {
      if(jsonData[i].brand == this.state.firstDropDownValue)
      {
        for (let index = 0; index < Object.keys(jsonData[i].models).length; index++) {
          var element = {};
          element.value = jsonData[i].models[index];
          aray.push(element);
        }
      }
    }
    this.setState({models: aray})
  }
  
  render() { 
    return (
      <ImageBackground source={require('../assets/backgrounds/klaipeda_bg.png')} 
                       style={styles.background} blurRadius={5}>
        
          <View style={styles.headerContainer}>
              
              <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                  <View>
                      <IonicsIcon name={"ios-arrow-back"} sizeOf={35} colorOf={'arrowIdle'}/>
                  </View> 
              </TouchableOpacity>                   
              <TitilliumWeb style={styles.title}>naujas skelbimas</TitilliumWeb>
          </View>

          <View style={{alignSelf: 'center'}}>
            <View style={styles.hairline}/>           
          </View>

        
        <ScrollView keyboardDismissMode={'on-drag'} showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 20}}/>
          <View style={styles.container}>

            <TouchableOpacity style={styles.circle} onPress={() => { this.pickImage(); } } >
              
              <View style={styles.circleContainer}>
                <View style={styles.circleTextContainer}>
                  <TitilliumWeb style={styles.circleText}>Įkelti automobilio</TitilliumWeb>
                  <TitilliumWeb style={styles.circleText}>nuotrauka</TitilliumWeb>
                </View>

                <View style={styles.iconContainer}>
                  <IonicsIcon name={"ios-car"} sizeOf={50} colorOf={"iconColor"}/>
                  <FontAwesomeIcon style={{marginTop: 13, marginLeft: 7}}name={"plus"} sizeOf={25} colorOf={"iconColor"}/>
                </View>
              </View>             
            </TouchableOpacity>

            <View style={{marginVertical: 10}}/>
            <TitilliumWeb style={styles.header}>automobilio informacija</TitilliumWeb>

            <View style={styles.brandAndMakeContainer}>

            <View style={{marginHorizontal: 10}}/>

              <View style={styles.brandAndMakeSelection}>
                <Dropdown
                  baseColor='black'
                  label='markė'
                  pickerStyle={styles.dropdownPickerStyle}
                  data={this.state.brands}
                  onChangeText={(value) => { this.setState({firstDropDownValue : value}); this.filterModelsByBrand(); } }
                />
              </View>

              <View style={{marginHorizontal: 10}}/>

              <View style={styles.brandAndMakeSelection}>
                <Dropdown
                  baseColor='black'
                  label='modelis'
                  pickerStyle={styles.dropdownPickerStyle}
                  onChangeText={(value) => {this.setState({secondDropDownValue: value})}}
                  data={this.state.models}
                />
              </View>

              <View style={{marginHorizontal: 10}}/>

            </View>

            <View style={{marginVertical: 65}}/>
            <TitilliumWeb style={styles.header}>nuomos laiko intervalas</TitilliumWeb>
            <View style={styles.calendarContainer}>
              <View style={styles.calendarComponent}>
                <View style={styles.calendarHeader}>
                  <TitilliumWeb style={{fontSize: 15}}>nuo</TitilliumWeb>
                </View>

                <DatePicker
                  style={styles.calendarInputStyle}
                  mode="datetime"
                  placeholder={this.state.availableToDate}
                  minDate={this.state.time}
                  maxDate="2020-12-12"
                  confirmBtnText="Patvirtinti"
                  cancelBtnText="Atšaukti"
                  is24Hour={true}
                  showIcon={false}
                  onDateChange={(date) => {this.setState({availableToDate: date})}}
                  customStyles={{
                    placeholderText :{
                      color: Colors.hintText,
                      fontSize: 15,                     
                    },
                    dateInput: {
                      borderWidth: 0,
                      borderColor: Colors.buttonBorderColorBlack,
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: -15,
                    }
                  }}
                />

              </View>

              <View style={styles.calendarComponent}>
                <View style={styles.calendarHeader}>
                  <TitilliumWeb style={{fontSize: 15}}>iki</TitilliumWeb>
                </View>
              
                <DatePicker
                  style={styles.calendarInputStyle}
                  mode="datetime"
                  placeholder={this.state.availableFromDate}
                  minDate={this.state.time}
                  maxDate="2020-12-12"
                  confirmBtnText="Patvirtinti"
                  cancelBtnText="Atšaukti"
                  is24Hour={true}
                  showIcon={false}
                  onDateChange={(date) => {this.setState({availableFromDate: date})}}
                  customStyles={{
                    placeholderText :{
                      color: Colors.hintText,
                      fontSize: 15,                     
                    },
                    dateInput: {
                      borderWidth: 0,
                      borderColor: Colors.buttonBorderColorBlack,
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: -15,
                    }
                  }}               
                />
              </View> 
            </View>

            <View style={{marginVertical: 10}}/>
            <TitilliumWeb style={styles.header}>nuomos kaina</TitilliumWeb>


            <View style={styles.priceContainer}>
              <View style={styles.priceInputContainer}>
                <FontAwesomeIcon name={"money"} sizeOf={30} colorOf={"iconColorGray"} style={styles.moneyIcon}/>

                <TextInput onChangeText={this.handlePriceInput}
                style={styles.priceInputField}
                underlineColorAndroid="transparent"
                placeholder="suma už pasirinktą laiko tarpą"
                placeholderTextColor={Colors.hintText}               
                multiline={false}
                value={this.state.priceInput}
                keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{marginVertical: 10}}/>
            <TitilliumWeb style={styles.header}>automobilio vieta</TitilliumWeb>

            <View style={styles.locationContainer}>
              <View style={styles.locationInputContainer}>
                <FontAwesomeIcon name={"location-arrow"} sizeOf={30} colorOf={"iconColorGray"} style={styles.navIcon}/>

                <TextInput onChangeText={this.handleAddressInput}
                style={styles.locationInputField}
                underlineColorAndroid="transparent"
                placeholder="adresas"
                placeholderTextColor={Colors.hintText}               
                multiline={false}
                value={this.state.addressInput}
                />
              </View>
            </View>



            <View style={{marginVertical: 10}}/>
            <TitilliumWeb style={styles.header}>komentarai</TitilliumWeb>
            <View style={styles.commentContainer}>
              <TextInput onChangeText={this.handleChangeInput}
                style={styles.commentField}
                underlineColorAndroid="transparent"
                placeholder="pvz. neveikia kondicionierius"
                placeholderTextColor={Colors.hintText}               
                multiline={true}
                numberOfLines={7}
                value={this.state.descriptionInput}
                maxLength={200}
              />
            </View>


            <View style={{marginVertical: 20}}/>
            <View style={styles.privateContainer}>              
              <TouchableOpacity style={styles.checkBox} value={this.state.isPrivate} 
                                onPress={() => {if(this.state.isPrivate === false){
                                                this.setState({isPrivate: true})
                                                this.setState({radioButtonName: 'ios-checkmark-circle'})
                                            }
                                              if(this.state.isPrivate === true){
                                                this.setState({isPrivate:  false})
                                                this.setState({radioButtonName: 'ios-close-circle'})
                                            }}} 
                                      activeOpacity={0.5}>
                <IonicsIcon name={this.state.radioButtonName} sizeOf={30} colorOf={"arrowIdle"} />
              </TouchableOpacity>

              <TitilliumWeb style={{fontSize: 16, color: Colors.importantText}}>privatus skelbimas?</TitilliumWeb>
            </View>

            <View style={{marginVertical: 30}}/>
            <TouchableOpacity style={styles.createButtonContainer} onPress={this.postSuccessful}>
              <FontAwesomeIcon style={{marginTop: 2}}name={"plus"} sizeOf={25} colorOf={"iconColor"}/>
              <View style={{marginHorizontal: 5}}/>
              <TitilliumWeb style={{fontSize: 22, marginTop: -3}}>sukurti</TitilliumWeb>                         
            </TouchableOpacity>

            <View style={{marginVertical: 30}}/>

            
            </View>
          </ScrollView>
      </ImageBackground>

        
                   
    );
    }


  componentDidMount() {
    this.getPermissionAsync();
    this.generateBrands();
  }
  

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to upload a picture!');
      }
    }
  };

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri});
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
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
      width: 347,
  },
  backButton: {
      marginLeft: -80,
      paddingHorizontal: 10,
      paddingTop: 5,        
  },
  circle: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: 150,
    height: 150,
    borderRadius: 150/2,
    borderWidth: 1,
    borderColor: Colors.photoCircle,
  },
  circleContainer: {
    flexDirection: 'column',
  },
  circleTextContainer: {
    marginTop: 35,
  },
  circleText: {
    alignSelf: 'center',
    color: Colors.hintText,
    fontSize: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
  },
  header: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 1,
    paddingBottom: 10,
    alignSelf: 'flex-start',
    paddingLeft: 15,
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
  buttonContainer: {
      flexDirection: 'row',        
  },
  icon: {
      marginTop: 2,
  },
  brandAndMakeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: Colors.buttonBorderColorBlack,
    borderWidth: 1,
    backgroundColor: Colors.containerColor,
    width: 347,
    height: 70,
  },
  brandAndMakeSelection: {
    width: 140, 
    justifyContent: 'center',
    marginTop: -5,
  },
  dropdownPickerStyle: {
    backgroundColor: Colors.containerColor, 
    marginTop: 86, 
    width: 142, 
    height: 135, 
    marginLeft: 15,
    borderColor: Colors.buttonBorderColorBlack,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: Colors.buttonBorderColorBlack,
    borderWidth: 1,
    backgroundColor: Colors.containerColor,
    width: 347,
    height: 50,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  moneyIcon: {
    marginTop: 8,
    marginLeft: 40,
    height: 27,
  },
  priceInputField: {
    width: 210,
    color: Colors.blackText,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.hairline,
    fontSize: 15,
    marginLeft: 12,
    marginTop: 10,
  },
  locationContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: Colors.buttonBorderColorBlack,
    borderWidth: 1,
    backgroundColor: Colors.containerColor,
    width: 347,
    height: 50,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  navIcon: {
    marginTop: 8,
    marginLeft: 40,
    height: 27,
  },
  locationInputField: {
    width: 210,
    color: Colors.blackText,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.hairline,
    fontSize: 15,
    marginLeft: 18,
    marginTop: 10,
  },
  calendarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: Colors.buttonBorderColorBlack,
    borderWidth: 1,
    backgroundColor: Colors.containerColor,
    width: 347,
    height: 100,
  },
  calendarInputStyle: {
    width: 140,
  },
  calendarComponent: {
    flexDirection: 'column',
    marginTop: -7,
    marginLeft: 21,
  },
  calendarHeader: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.buttonBorderColorBlack,
    width: 140,
    marginBottom: 8,
  },
  commentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: Colors.buttonBorderColorBlack,
    borderWidth: 1,
    backgroundColor: Colors.containerColor,
    width: 347,
    height: 150,
  },
  commentField: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.buttonBorderColorBlack,
    width: 300,
    height: 120,
  },
  privateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: Colors.buttonBorderColorBlack,
    borderWidth: 1,
    backgroundColor: Colors.containerColor,
    width: 200,
    height: 50,
  },
  checkBox: {
    width: 35,
    height: 35,
    paddingLeft: 2,
    paddingRight: 5,
    paddingVertical: 2,
  },
  createButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: Colors.buttonBorderColorBlack,
    borderWidth: 1,
    backgroundColor: Colors.containerColor,
    width: 170,
    height: 60,
    borderRadius: 10,
  }
})