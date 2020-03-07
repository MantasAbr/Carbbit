import * as React from 'react';
import { render } from 'react-dom';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class Database extends React.Component{

    constructor(props){
        super(props);
        this.state = {isLoading :true}
    }

    async componentDidMount(){
        try {
            /*
                Browser exception:

                Cross-Origin Request Blocked: 
                The Same Origin Policy disallows reading the remote resource at 
                https://stud.if.ktu.lt/~lukant3/get_data.php. 
                (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).
            */
           /* 
                naudoti local IP, ty cmd->ipconfig->192.168.0.101 ar kazkas panasaus ant lokalaus serverio (XAMPP, Docker)
                ne localhost ar 127.0.0.1 (neveiks ant mobile)
                pvz.: const response = await fetch('http://192.168.0.101/get_data.php'); // veikia jei Apache sukonfiguruotas pagal:
                https://enable-cors.org/server_apache.html
           */

           //TODO: avoid CORS, Express background api to fetch, foward here or smth...
           const response = await fetch('https://stud.if.ktu.lt/~lukant3/test.json'); // fake json file, php gets CORSed on mobile too
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
}