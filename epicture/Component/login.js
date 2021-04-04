// import React, { Component } from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, Platform, SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';
import Axios from 'axios'
import {connect} from 'react-redux'
import * as  AuthSession from 'expo-auth-session';

const IMGUR_CLIENT_ID = "b15555533adcf0c"

class Login extends React.Component {
    constructor(props){
        super(props),
        this.state = {
            login: 0,
            username: "rj012",
            textUser: "",
            accountData: []
        }
    }
    
 loginImgur = async() => {
        let objLink = {
          authUrl: "https://api.imgur.com/oauth2/authorize?client_id=c3f76b9941e894d&response_type=token&state=accesToken",
          returnUrl: "exp://expo.io/Epicture"
        }
        let result = await AuthSession.startAsync(objLink);
        // var objString = await AsyncStorage.getItem("LOG_INFO");
        if (result.type == "cancel")
          return false;
        // if (objString == null) {
          const myObj = {
            connected: true,
            token: result['params']['access_token'],
            username: result['params']['account_username']
          };
          this.props.nav(false)
          this.setState({accountData: myObj});
          const action={type: "GET_PROFIL", value: myObj}
          this.props.dispatch(action)
        //   AsyncStorage.setItem("LOG_INFO", JSON.stringify(myObj));
        // } else {
          // var obj = JSON.parse(objString);
          // obj.connected = true
          // obj.token = result['params']['access_token']
          // obj.username = result['params']['account_username']
        //   AsyncStorage.setItem("LOG_INFO", JSON.stringify(obj));
        // }
        return true;
      }

    _loginPage= async() => {   
        await Axios.get(`https://api.imgur.com/3/account/${this.state.textUser}`, {
            headers: { 
            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`, 
            },}).then((response) => {
                this.setState({accountData: response.data});
                this.props.nav(false)
                const action={type: "GET_PROFIL", value: response.data}
                this.props.dispatch(action)
            }).catch((error) => {
                console.log(error)
        });
    }

    render(){
        if (this.state.login ==0){
            return (
                <SafeAreaView style={{height: "80%", width:"100%", overflow:"hidden"}}>
                {/* <WebView
                source = {{ uri: 'https://api.imgur.com/oauth2/authorize?client_id=b15555533adcf0c&response_type=token' }}      /> */}
                    {/* <Button title="login" onPress={() => { this.setState({login:1})}}/> */}

                    <Button title="LoginImgur" onPress={() => {this.loginImgur()}}/>
                </SafeAreaView>
            );
            
        }
        else if (this.state.login ==1){
            return(
                <View style={styles.loginPage}>
                    <Image source={require("../image/imgur.jpeg")} style={{width:80, height:80, marginTop:100, borderRadius:50}} />
                    <View style={{ marginTop:100, alignItems:"center"}}>
                    <Text style={{fontSize:18}}>Username</Text>
                    <TextInput 
                    style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1, borderRadius:50}}
                    onChangeText={user => this.setState({textUser: user})}
                    value={this.state.textUser}
                    placeholder ="Entrez votre username"
                    textAlign={'center'}
                    />
                    <TouchableOpacity onPress={() =>  {this._loginPage()}} style={{height:40, width:300, backgroundColor:"#5B6A12", borderRadius:50, marginTop:10, alignItems:"center", justifyContent:"center"}}>
                        <Text style={{color: "white"}}>Connection</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: '#B1BB81',
    alignItems: 'center',
    height: "100%",
    width:"100%"
  },
});

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
export default connect(undefined, mapDispatchToProps)(Login)