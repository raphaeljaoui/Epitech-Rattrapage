import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity} from 'react-native';

export default class PhotoSearch extends React.Component {
    render(){
      const fav = this.props.fav
            return(
                <TouchableOpacity style={styles.loginPage}>
                    <View style={{ alignItems: 'center',justifyContent: 'center'}}>
                        <Image source={{uri: "https://i.imgur.com/" + fav.cover + ".jpg"}} style={{width:130, height:130,borderWidth:0.5, borderColor:"black", marginLeft:0.5}} />
                    </View>
                </TouchableOpacity>
            )
    }
}

const styles = StyleSheet.create({
  loginPage: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
