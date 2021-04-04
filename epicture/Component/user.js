import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList, SafeAreaView} from 'react-native';
import PhotoUser from './photoUser'
import Axios from 'axios'
import {connect} from 'react-redux'


const IMGUR_CLIENT_ID = "b15555533adcf0c"

class User extends React.Component {
    constructor(props){
        super(props),
        this.state = {
            login: 0,
            username: "rj012",
            textUser: "",
            accountImgData: [],
            accountData:[],
            data:[]
        }
    }



    _photoUser= async() => {   
        return  Axios.get(`https://api.imgur.com/3/account/${this.props.currentProfil.data.username}/images`, {
            method: 'GET',
            headers: { 
            'Authorization': `Bearer ${this.props.currentProfil.data.token}`, 
            },
            }).then((response) => {
                
                response.data.data.map((res, index) => {
                    var tab = this.state.accountImgData
                    tab.push({"id": index, "image":res.link})
                    this.setState({accountImgData: tab});
                })
            }).catch((error) => {
                console.log(error);
            });
    }  

    componentDidMount = async() => {
        await Axios.get(`https://api.imgur.com/3/account/${this.props.currentProfil.data.username}`, {
            headers: { 
            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`, 
            },}).then((response) => {
                this.setState({accountData: response.data});
            }).catch((error) => {
                console.log(error)
        });
    this._photoUser()
    } 

    render(){
        const accountData = this.state.accountData
        if(accountData.data != undefined)       
            return(
                <SafeAreaView style={styles.loginPage}>
                    <View style={{flexDirection: "row", alignItems:"center"}}>
                        <Image source={require('../image/imgur.jpeg')} style={{width:50, height: 50, borderRadius:40, marginLeft:20}} />
                        <Text style={{fontSize:18, color:"green", marginLeft:10}}>Imgur</Text>
                    </View>
                    <View style={{marginTop:30, alignItems: 'center',justifyContent: 'center'}}>
                        <Image source={{uri: accountData.data.avatar}} style={{width:200, height:200,borderRadius:100}} />
                        <Text style={{fontSize:20, fontWeight:"600"}}>{accountData.data.url}</Text>
                        <Text style={{fontSize:16}}>{accountData.data.reputation_name}</Text>
                    </View>
                    <View style={{marginTop:50, alignItems: 'center',}}>
                        <FlatList 
                        data={this.state.accountImgData}
                        KeyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <PhotoUser user={item} />}
                        numColumns={3}
                        />
                    </View>
                </SafeAreaView>
            )
        else
        return(
            <View>
                <Text>Chargement ...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  loginPage: {
    marginTop:15

    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

const mapStateToProps = (store) => {
    return {
        currentProfil: store.profil
    }
}
export default connect(mapStateToProps, undefined)(User)