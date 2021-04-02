import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Component/login'
import Navigation from './Navigation/navigation'
import store from './store'
import {Provider} from "react-redux"

export default class App extends React.Component {
  constructor(props){
    super(props),
    this.state = {
       state: true,
       profil: []
    }
}
  nav = (state) => {
    this.setState({
      state
    })
  }

  render(){
    return (
      <Provider store={store} style={styles.container}>
        {(this.state.state) ? <Login  nav={this.nav} /> : <Navigation />}
      </Provider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
