import Axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView} from 'react-native';
import FormData from 'form-data'
import {connect} from 'react-redux'

const IMGUR_CLIENT_ID = "b15555533adcf0c"

class PhotoDetailFavoris extends React.Component {
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
    
    _vote = async() => {
        const formData = new FormData();

        try{
          var response =await fetch('https://api.imgur.com/3/gallery/dy51Sor/vote/veto', {
            method: 'POST',
            headers: {
              "Authorization": 'Bearer ' + this.props.currentProfil.data.token,
              "Accept": 'application/json'
            },
            body:formData
          });
          let json = await response.json();
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
              "Authorization": 'Bearer ' + this.props.currentProfil.data.token,
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
        const widthX = fav.width / 10
        const heightX = fav.height / 10
        // console.log(fav);
        
            return(
                <SafeAreaView style={styles.loginPage}>
                    <View style={{ alignItems: 'center',justifyContent: 'center'}}>
                        <Image source={{uri: "https://i.imgur.com/" + fav.cover + ".jpg"}} style={{width:widthX, height:heightX,borderWidth:0.5, borderColor:"black", marginLeft:0.5}} />
                    </View>
                    <Text style={{marginTop:50}}>{fav.title}</Text>
                    <Text>Auteur: {fav.account_url}</Text>
                    <Button title="vote" onPress={() => {this._vote()}} />
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

const mapStateToProps = (store) => {
  return {
      currentProfil: store.profil
  }
}

export default connect(mapStateToProps, undefined)(PhotoDetailFavoris)