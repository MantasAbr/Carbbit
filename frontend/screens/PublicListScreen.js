import * as React from 'react';
import { render } from 'react-dom';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

/*
    This is the screen for the main list of all public posts.
*/
export default class PublicList extends React.Component{

    constructor(props){
        super(props);
        this.state = {isLoading :true}

        //Reikia reset'int navigation'a, kad negrizt atgal i login arba register
        //props.navigation.reset();
    }


    async componentDidMount(){
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
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex:1,padding:20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <View style={{flex:1,paddingTop:20}}>
                <Text style={crud_header.head}>Database:</Text>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) =>
                        <Text>ID: {item.id} : {item.username}, {item.email}, {item.date_registered}</Text>}
                        keyExtractor={({id}, index) => id}
                />
                <Text style={crud_header.head}>Insert:</Text>
                <TextInput style={crud_header.input}></TextInput>
                <TouchableOpacity style={crud_header.button} onPress={handleInsertButton}>
                    <Text>Insert</Text>
                </TouchableOpacity>
            </View>
        )
    }
}