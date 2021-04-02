import Axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView} from 'react-native';
import FormData from 'form-data'

const IMGUR_CLIENT_ID = "b15555533adcf0c"

export default class PhotoHomeDetail extends React.Component {
    _sendCommentaire = () => {
        const formData = new FormData();
      
        return fetch('https://api.imgur.com/3/account/rj012/comments/best', {
            method:'GET',
            headers: { 
            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
            'Accept': 'application/json',
            },
            // body:formData
        }).then((response) => {
            // console.log(JSON.stringify(response));
            }).catch((error) => {
                console.log(error)
        });
    }
    
    _vote = async(vote) => {
        const formData = new FormData();

        try{
          var response =await fetch('https://api.imgur.com/3/gallery/hyjhL2H/vote/' + vote, {
            method: 'POST',
            headers: {
              "Authorization": 'Bearer ' + "b5a7b2bfc6e6ca1705dee5add06896660dc4957e",
              "Accept": 'application/json'
            },
            body:formData
          });
          let json = await response.json();
            console.log(json);
          return (json.success)
        } catch {
          return false;
        }
      }
    
      _favoris = async() => {
        const formData = new FormData();
        try{
          let response = await fetch('https://api.imgur.com/3/image/K3Bt6jm/favorite', {
            method:'POST',
            headers: {
              "Authorization": 'Bearer ' + "b5a7b2bfc6e6ca1705dee5add06896660dc4957e",
              'Accept': 'application/json',
            //   'Content-Type': 'application/json'
            //   "Accept": 'application/json'
            },
            // body:formData
          }).then(res=>{
               return(res.json());
          }).then(res=>{
              console.log(res);
          })
        }
        catch(error) {
            console.error(error);
          }
        //   let json = await response.json();
        //     console.log(json);
        //   return (json.success)
      }
    componentDidMount = () =>{
        this._sendCommentaire()
    }
    render(){
        const fav = this.props.navigation.state.params.fav
        const widthX = fav.width
        const heightX = fav.height

        console.log(fav);
        
            return(
                <SafeAreaView style={styles.loginPage}>
                    <View style={{ alignItems: 'center',justifyContent: 'center'}}>
                        <Image source={{uri: "https://i.imgur.com/" + fav.cover + ".jpg"}} style={{width:widthX, height:heightX,borderWidth:0.5, borderColor:"black", marginLeft:0.5}} />
                    </View>
                    <Text style={{marginTop:50}}>{fav.title}</Text>
                    <Text>Auteur: {fav.account_url}</Text>
                    <View style={{flexDirection:"row"}}>
                        <Button title="up" onPress={() => {this._vote("up")}} />
                        <Button title="veto" onPress={() => {this._vote("veto")}} />
                        <Button title="down" onPress={() => {this._vote("down")}} />
                    </View>
                    <Button title="favoris" onPress={() => {this._favoris()}} />

                </SafeAreaView>
            )
    }
}

const styles = StyleSheet.create({
  loginPage: {
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
