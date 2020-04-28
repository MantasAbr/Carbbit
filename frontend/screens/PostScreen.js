import * as React from 'react';
import { Button, View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import DatePicker from 'react-native-datepicker'
import Header from '../components/Header';
import { Dropdown } from 'react-native-material-dropdown';
const jsonData = require('../assets/json_data/CarData');
import CheckBox from '@react-native-community/checkbox';
import moment from "moment";

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    width: 150,
    justifyContent: "flex-start",
    textAlignVertical: 'top'
  }
});

export default class PostScreen extends React.Component {
  
  state = {
    reiksme: null,
    time: new Date(),
    image: '',
    descriptionInput: null,
    availableFromDate: "select date",
    availableToDate: "select date",
    brands: [],
    models: [],
    firstDropDownValue: null,
    secondDropDownValue: null,
    isPrivate: false
  };

  handleChangeInput = (text) => {
    this.setState({ descriptionInput: text })
  }

  setSelection = (value) => {
    this.setState({isPrivate: value})
  }

  handleSubmit = () => {
    var data = {
      picture_uri: this.state.image,
      body: this.state.descriptionInput,
      available_date: this.state.availableFromDate,
      user_id: 1
      // kitam sprinte, kai auth padarysiu bus normalus user_id
    }
    fetch("http://192.168.56.1:3000/posts/", {
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
    if (this.state.availableFromDate != "select date") {
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
        <ScrollView>
          <Header/>
          <View style={{alignItems: 'center', paddingTop: 20}}>
            <View style={{height: 150, width: 150}}>
            <Dropdown
              label='Brand'
              data={this.state.brands}
              onChangeText={(value) => { this.setState({firstDropDownValue : value}); this.filterModelsByBrand(); } }
            />
            </View>
            <View style={{height: 150, width: 150}}>
            <Dropdown
              label='Model'
              onChangeText={(value) => {this.setState({secondDropDownValue: value})}}
              data={this.state.models}
            />
            </View>
            <Text style={{paddingTop: 30}} >Available date from: </Text>
            <DatePicker
              style={{width: 200}}
              mode="datetime"
              placeholder={this.state.availableFromDate}
              minDate={this.state.time}
              maxDate="2020-12-12"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              is24Hour={true}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => {this.setState({availableFromDate: date})}}
            />

            <View style={{paddingBottom: 50, paddingTop: 50, alignContent: 'center'}}>
              <Text> Available date until: </Text>
              <DatePicker
                style={{width: 200}}
                mode="datetime"
                placeholder={this.state.availableToDate}
                minDate={this.state.time}
                maxDate="2020-12-12"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour={true}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => {this.setState({availableToDate: date})}}
              />  
            </View>
            <View>
              <Text>Upload a picture</Text>
                <Button title="Upload an image" onPress={() => { this.pickImage(); } }/>
            </View>
            <Text style={{paddingTop: 30}}>Comments</Text>
            <View style={styles.textAreaContainer}>
              <TextInput onChangeText={this.handleChangeInput}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="e.g AC doesn't work"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                value={this.state.descriptionInput}
              />
            </View>
            <View>
              <Text>Set post to private?</Text>
            </View>
            <CheckBox
              value={this.state.isPrivate}
              onValueChange={this.setSelection}
            />
              <View style={{paddingTop: 30 }}>
              <Button title="Post!" onPress={this.postSuccessful}/>
            </View>
            </View>
            <View>
          </View>
        </ScrollView>
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