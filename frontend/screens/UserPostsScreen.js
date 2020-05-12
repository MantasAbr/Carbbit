import * as React from 'react';
import { render } from 'react-dom';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image, RefreshControl, AsyncStorage, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import moment from "moment";

import env from '../env/server';
/*
    This is the screen for the main list of all public posts.
*/
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
        fetch('http://' + env.server.ip + ':' + env.server.port + '/posts/' + 100, {
        method: 'DELETE', 
        })
        .then(res => res.text())
        .then(res => console.log(res))
    }


    updatePost = async (key) => { 
        const userID = await AsyncStorage.getItem('user_id');

            var data = {
                picture_uri: 'atnaujinom',
                body: 'atnaujinom',
                available_from_date: moment(this.state.availableFromDate).format('YYYY-MM-DD, HH:mm'),
                available_to_date: moment(this.state.availableToDate).format('YYYY-MM-DD, HH:mm'),
                brand: 'atnaujinom',
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
        return(
            <ImageBackground source={require('../assets/backgrounds/kaunas_bg.png')} 
                                style={styles.background} blurRadius={5}>

                <View style={{flex:1,paddingTop:20}}>
                    <Text style={styles.crud_header} >Posts:</Text>
                    <FlatList
                        refreshControl={ // pulldown refresh
                            <RefreshControl
                                isLoading={this.state.isLoading}
                                onRefresh={this.fetchJson}
                            />
                        }
                        data={this.state.results}
                        renderItem={({item}) =>
                            <View style={{borderColor:'black', borderWidth: 1, marginTop: 30} }>
                                <Text style={{fontWeight:"bold"}}>{item.brand} {item.model}</Text>
                                <Text>nuo {moment(item.available_to_date).format('YYYY-MM-DD, HH:mm')} </Text>
                                <Text>iki {moment(item.available_from_date).format('YYYY-MM-DD, HH:mm')}</Text>
                                <Text>{item.post_id}</Text>
                                <Image
                                    style={{ width: 150, height: 150 }}
                                    source={{ uri: item.picture_uri }} // isideti normaliu nuotrauku, kad veiktu
                                />
                                <View style={{width: 100, height: 50, paddingTop: 20}}>
                                    <Button  color="#f194ff" title='Delete' onPress={() =>{this.handleDeletion(item.post_id)}}/>
                                </View>    
                                <View style={{width: 100, height: 50}}>
                                    <Button title='Update'onPress={() =>{this.updatePost(item.post_id)}}/>
                                </View>                                   
                            </View>}
                            keyExtractor={item => item.post_id}
                    />
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
  crud_header: {
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 10
    
  }
})