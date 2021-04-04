import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList} from 'react-native';

export default class PhotoUser extends React.Component {
    render(){
        const user= this.props.user
            return(
                <View style={styles.loginPage}>
                    <View style={{ alignItems: 'center',justifyContent: 'center'}}>
                        <Image source={{uri: user.image}} style={{width:130, height:130,borderWidth:0.5, borderColor:"black", marginLeft:0.5}} />
                    </View>
                </View>
            )
    }
}

const styles = StyleSheet.create({
  loginPage: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
