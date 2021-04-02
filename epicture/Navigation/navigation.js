import React from 'react'
import { StyleSheet, Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Upload from '../Component/upload'
import User from '../Component/user'
import Search from '../Component/search'
import Favoris from '../Component/favoris'
import PhotoDetailFavoris from '../Component/photoFavorisDetail'
import PhotoHomeFavoris from '../Component/photoHomeDetail'
import Home from '../Component/home'


const HomeStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: Home,
    navigationOptions:{
      headerShown: false
    }
  },
  PhotoDetail: {
    screen: PhotoHomeFavoris,
    navigationOptions:{
      headerShown: false
    }
  },
})
const FavorisStackNavigator = createStackNavigator({
  Favoris: {
    screen: Favoris,
    navigationOptions:{
      headerShown: false
    }
  },
  PhotoDetailFavoris: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: PhotoDetailFavoris,
    navigationOptions:{
    }
  }
})

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions:{
      headerShown: false
    }
  },
  PhotoDetailFavoris: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: PhotoDetailFavoris,
    navigationOptions:{
      headerShown: false
    }
  }
})

const ImgurTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../image/home.png')}
          style={styles.icon}/>
      }
    }
  },
    Upload: {
      screen: Upload,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../image/upload.png')}
            style={styles.icon}/>
        }
      }
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../image/recherche.png')}
            style={styles.icon}/>
        }
      }
    },
    Favoris: {
      screen: FavorisStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../image/favoris.png')}
            style={styles.icon}/>
        }
      }
    },
    User: {
      screen: User,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../image/user.png')}
            style={styles.icon}/>
        }
      }
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
  )
 
  const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
  })
  
  export default createAppContainer(ImgurTabNavigator)