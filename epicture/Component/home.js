import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList, SafeAreaView} from 'react-native';
import PhotoUser from './photoUser'
import Axios from 'axios'
import PhotoSearch from './photoHome'
import {connect} from 'react-redux'

const data = [
    {
        id:1,
        titre: "image1",
        description: "description", 
        image: "null"
    },
    {
        id:2,
        titre: "image1",
        description: "description", 
        image: "null"
    },
    {
        id:3,
        titre: "image1",
        description: "description", 
        image: "null"
    },
    {
        id:4,
        titre: "image1",
        description: "description", 
        image: "null"
    },
]

const IMGUR_CLIENT_ID = "b15555533adcf0c"

class Home extends React.Component {
    constructor(props){
        super(props),
        this.state = {
            search: '',
            searchImage:[]
        }
    }  

    _photoSearch = async() => {   
        await Axios.get(`https://api.imgur.com/3/gallery/top/top/month/1?showViral=true&mature=true&album_previews=true`, {
            headers: { 
            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`, 
            },
            }).then((response) => {
                this.setState({searchImage: response.data});                
            }).catch((error) => {
                console.log(error);
            });
    }  

    _displayDetailFavoris = (fav, token) => {
        this.props.navigation.navigate("PhotoDetail", {fav})
    }

    componentDidMount = () => {
        this._photoSearch()
        } 

    render(){
        // console.log(this.props.currentProfil.data);
            return(
                <SafeAreaView style={styles.loginPage}>
                     <View style={{flexDirection: "row", alignItems:"center"}}>
                        <Image source={require('../image/imgur.jpeg')} style={{width:50, height: 50, borderRadius:40, marginLeft:20}} />
                        <Text style={{fontSize:18, color:"green", marginLeft:10}}>Imgur</Text>
                    </View>
                    <View style={{marginTop:50, alignItems: 'center',}}>
                        <FlatList 
                            data={this.state.searchImage.data}
                            KeyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => <PhotoSearch fav={item} detail={this._displayDetailFavoris} token={this.props.currentProfil.data}/>}
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

    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

const mapStateToProps = (store) => {
    return {
        currentProfil: store.profil
    }
}

export default connect(mapStateToProps, undefined)(Home)