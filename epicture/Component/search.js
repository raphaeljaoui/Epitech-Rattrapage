import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList, SafeAreaView} from 'react-native';
import PhotoUser from './photoUser'
import Axios from 'axios'
import PhotoSearch from './photoSearch'

const IMGUR_CLIENT_ID = "b15555533adcf0c"

export default class Search extends React.Component {
    constructor(props){
        super(props),
        this.state = {
            type:"time",
            search: '',
            searchImage:[]
        }
    }  

    _photoSearch = async() => {   
        await Axios.get(`https://api.imgur.com/3/gallery/search/${this.state.type}/month/1?q=${this.state.search}`, {
            headers: { 
            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`, 
            },
            }).then((response) => {
                this.setState({searchImage: response.data});                
            }).catch((error) => {
                console.log(error);
            });
    }  

    _displayDetailFavoris = (fav) => {
        this.props.navigation.navigate("PhotoDetailFavoris", {fav})
    }

    // componentDidMount = () => {
    //     this._photoSearch()
    //     } 

    render(){
        
            return(
                <SafeAreaView style={styles.loginPage}>
                     <View style={{flexDirection: "row", alignItems:"center"}}>
                        <Image source={require('../image/imgur.jpeg')} style={{width:50, height: 50, borderRadius:40, marginLeft:20}} />
                        <Text style={{fontSize:18, color:"green", marginLeft:10}}>Imgur</Text>
                    </View>
                    <View style={{marginTop:30, alignItems: 'center',justifyContent: 'center'}}>
                        <TextInput 
                        style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1, borderRadius:20 }}
                        onChangeText={text => this.setState({search: text})}
                        value={this.state.search}
                        placeholder = " Recherche ..."
                        />
                        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <Button title="Time" onPress={() => {this.setState({type:"time"})}} />
                            <Button title="Viral" onPress={() => {this.setState({type:"viral"})}} />
                            <Button title="Top" onPress={() => {this.setState({type:"top"})}} />
                        </View>
                        <Button title="RECHERCHER" onPress={() => {this._photoSearch()}} />
                    </View>
                    <View style={{marginTop:50, alignItems: 'center',}}>
                        <FlatList 
                            data={this.state.searchImage.data}
                            KeyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => <PhotoSearch fav={item}/>}
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