import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList,SafeAreaView} from 'react-native';
import PhotoFavoris from './photoFavoris'
import Axios from 'axios'
import {connect} from 'react-redux'

const IMGUR_CLIENT_ID = "b15555533adcf0c"

class Favoris extends React.Component {
    constructor(props){
        super(props),
        this.state = {
            login: 0,
            username: "rj012",
            accountFavData: []
        }
    }

    _photoUser= async() => {   
        await Axios.get(`https://api.imgur.com/3/account/${this.props.currentProfil.data.username}/favorites`, {
            headers: { 
            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`, 
            },
            }).then((response) => {
                this.setState({accountFavData: response.data});
            }).catch((error) => {
                console.log(error);
        });
    }  

    componentDidMount = () => {
        this._photoUser()
    }  
    
    _displayDetailFavoris = (fav) => {
        this.props.navigation.navigate("PhotoDetailFavoris", {fav})
    }

    render(){
            return(
                <SafeAreaView style={styles.loginPage}>
                    <View style={{flexDirection: "row", alignItems:"center"}}>
                        <Image source={require('../image/imgur.jpeg')} style={{width:50, height: 50, borderRadius:40, marginLeft:20}} />
                        <Text style={{fontSize:18, color:"green", marginLeft:10}}>Imgur</Text>
                    </View>
                    <View style={{marginTop:50, alignItems:"center"}}>
                     <Text style={{fontWeight:"bold", fontSize:40}}>Publication que vous aimez</Text>
                    </View>
                    <View style={{marginTop:50, alignItems: 'center', alignContent:"space-between", justifyContent:"space-between"}}>
                        <FlatList 
                        data={this.state.accountFavData.data}
                        KeyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <PhotoFavoris fav={item} displayDetailFavoris={this._displayDetailFavoris}/>}
                        numColumns={3}
                        />
                    </View>
                </SafeAreaView>
            )
    }
}

const styles = StyleSheet.create({
  loginPage: {
      marginTop:15
    // justifyContent: 'center',
  },
});

const mapStateToProps = (store) => {
    return {
        currentProfil: store.profil
    }
}
export default connect(mapStateToProps, undefined)(Favoris)
