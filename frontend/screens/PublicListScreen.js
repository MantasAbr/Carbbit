import * as React from 'react';
import { render } from 'react-dom';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
/*
    This is the screen for the main list of all public posts.
*/
export default class PublicList extends React.Component{

    state = {
        isLoading: true,
        results: [
            {
                post_id: '',
                picture_uri: '',
                body: '',
                available_date: '',
                user_id: ''
            }
        ]
    };

    componentDidMount(){
        this.fetchJson();
    }

    fetchJson(){
        fetch('http://192.168.56.1:3000/posts/',{ // pasikeisti i savo IP
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
                  data={this.state.results}
                  renderItem={({item}) =>
                      <View>
                      <Text>ID: {item.post_id} : {item.body}, {item.available_date}, {item.user_id}</Text>
                      <Image
                        style={{ width: 150, height: 150 }}
                        source={{ uri: item.picture_uri }} // isideti normaliu nuotrauku, kad veiktu
                      />
                      </View>}
                      keyExtractor={item => item.id}
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