import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, SafeAreaView, ImageStore} from 'react-native';
import { WebView } from 'react-native-webview';
 import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImgToBase64 from 'react-native-image-base64';
import Axios from 'axios'
import FormData from 'form-data'
import * as File from "expo-file-system"
import {connect} from 'react-redux'

const IMGUR_CLIENT_ID = "b15555533adcf0c"
class Upload extends React.Component {
    constructor(props){
        super(props),
        this.state = {
            image: "https://i.imgur.com/D9e8kAK.jpg"       
        }
    }  

    _selectPicture = async() => {
         await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let lib = await ImagePicker.launchImageLibraryAsync()
         this.setState({image: lib.uri})        
    }

    _convertBase64 = (picture) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(picture)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    _uploadImage = async() => {  
        // let base64data = await new Promise((resolve, reject) => {
        //     ImageStore.getBase64ForTag("http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg", (data) => {
        //       resolve(data);
        //     });
        //   })

         let test = await File.readAsStringAsync(this.state.image, {encoding: "base64"})
        //  ImgToBase64.getBase64String('http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg')
                    // .then(base64String => doSomethingWith(base64String))
                    // .catch(err => doSomethingWith(err));


                
                    const formData = new FormData();
                    formData.append('image', test);
                    formData.append('type', 'base64');
                    try {
                      let response = await fetch('https://api.imgur.com/3/upload', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Authorization": 'Bearer ' + this.props.currentProfil.data.token,

                        //   Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                          Accept: 'application/json'
                        }
                      });
                      let json = await response.json();
                      console.log(json);
                      
                      return (json.success)
                    } catch {
                      return false;
                    }
    }

    componentDidMount = () => {

    }
    _button = async () => {
        // const base =  ImgToBase64.getBase64String(this.state.image)
        // .then(base64String => doSomethingWith(base64String))
        // .catch(err => doSomethingWith(err));

        this._uploadImage()
        
    }
    render(){
            return(
                <SafeAreaView style={{marginTop:20}}>
                    <View style={{flexDirection: "row", alignItems:"center", marginLeft:20}}>
                        <Image source={require('../image/imgur.jpeg')} style={{width:50, height: 50, borderRadius:40}} />
                        <Text style={{fontSize:18, color:"green", marginLeft:10}}>Imgur</Text>
                    </View>
                    <View style={styles.loginPage}>
                        <Image source={{uri: this.state.image}} style={{width:"90%", height:"60%", borderWidth:0.5, borderColor:"black", borderRadius:20}} />
                        <TouchableOpacity style={styles.button} onPress={() => {this._selectPicture()}}>
                            <Text style={styles.textButton}>+</Text>
                        </TouchableOpacity>
                        <Text>Ajouter votre photo</Text>
                        <Button title='Télécharger' onPress={() => {this._button()}}/>
                    </View>
                </SafeAreaView>
            )
    }
}

const styles = StyleSheet.create({
  loginPage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
  },

  button:{
    borderRadius: 50,
    backgroundColor: "#00BFFF",
    height:60,
    width:60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
  textButton:{
      color:"white",
      fontSize:40,
      fontWeight:"600"
  }
});

const mapStateToProps = (store) => {
  return {
      currentProfil: store.profil
  }
}

export default connect(mapStateToProps, undefined)(Upload)