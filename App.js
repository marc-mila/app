//This is an example code for Navigator// 
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Button, SafeAreaView, Dimensions } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { ViewPropTypes } from 'react-native'


//Import react-navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';



import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import { NavigationContainer } from '@react-navigation/native';

import MainPage from './pages/MainPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Wall from './pages/Wall'
import Details from './pages/Details'
import Book from './pages/Book'
import NovaReservaWall from './pages/NovaReservaWall';
import ProfileS from './pages/ProfileS'
import Producte from './pages/Producte'
import DetailsProducte from './pages/DetailsProducte';
import AboutS from './pages/AboutS'




 const {width} = Dimensions.get('window')



const Reutilitzacio = createStackNavigator({
  Wall: Wall,
  Details: Details,
  Book: Book,
  NovaReservaWall: NovaReservaWall,
  Producte: Producte,
  DetailsProducte: DetailsProducte
  
})


const Perfil = createStackNavigator({
  ProfileS : ProfileS,
})
 const About = createStackNavigator({
   AboutS: AboutS
 })




class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._boostrapAsync();
    
  }
  _boostrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(userToken ? 'AppC' : 'Auth');
  }

  render() {
    return(
      <View >
        <ActivityIndicator/>
      </View>
    )
  }
}


const DrawerMeta = ({ navigation }) => {
  return (
    <View style={{height:150, backgroundColor:'white'}}>
      <Text style={{marginLeft: 16, fontWeight:'bold', fontSize:14, marginTop:5}}
        onPress={async () => {
          await AsyncStorage.removeItem('token'); navigation.navigate('Auth'); 
        }}
        

      >Sign Out</Text>
    </View>
  );
};

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex:1}}>
    <View style={{height:150, backgroundColor:'white'}}>
      <View style={{marginTop:30, marginLeft:'10%'}}>
      <Image
          source={require('./assets/img/drawer.png')}
          style={styles.logo}
          resizeMode="contain"
      ></Image>
      </View>

    </View>
    <ScrollView>
      <DrawerItems {...props}  />
      <DrawerMeta {...props} />
    </ScrollView>
  </SafeAreaView>
)


const AuthStack = createStackNavigator({ 
  MainPage : MainPage,
  Login : Login,
  Signup : Signup

});

const AppDrawer = createDrawerNavigator({
  Reutilitzacio: Reutilitzacio,
  Perfil : Perfil,
  About: About
}, {
  contentComponent: CustomDrawerComponent,
  drawerWidth: width-width/4,
  drawerOpenRoute: 'DrawerOpen',
  drawerToggleRoute: 'DrawerToggle',
  drawerCloseRoute: 'DrawerClose',
  

});

const App = createAppContainer(createSwitchNavigator(
  
  {
    AuthLoading : AuthLoadingScreen,
    AppC : AppDrawer,
    Auth: AuthStack
  },
  { 
    initialRouteName : 'AuthLoading',
  }
  
));
export default App

const styles = StyleSheet.create({
  logo:{
    width: 70,
    height: 70,
    marginLeft: '25%',
    marginTop: '10%'
  },})