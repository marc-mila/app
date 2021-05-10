//This is an example code for Navigator// 
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
//import react in our code. 
//import { StyleSheet, View, Text, Button} from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Button} from 'react-native-paper'
//import all the components we are going to use.

export default class MainPage extends Component {
  static navigationOptions = {
    title: 'TFG - GRI',
    //Sets Header text of Status Bar
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      
      <ScrollView>
      <View>
        <Image
          source={require('../assets/img/recycle-img.png')}
          style={styles.logo}
          resizeMode="contain"
        >
        </Image>
        <View style={{alignSelf:'center', marginTop:'25%'}}>
          <Button onPress={() =>navigate('Login')} mode='contained' icon='login' style={{width: Dimensions.get('screen').width*0.85, marginTop:10, backgroundColor:'#009688'}}>
          <Text style={styles.appButtonText}>Login</Text>
          </Button>  

          <Button onPress={() =>navigate('Signup')} mode='contained' icon='account-plus' style={{width: Dimensions.get('screen').width*0.85, marginTop:'10%', backgroundColor:'#3A59ff'}}>
          <Text style={styles.appButtonText}>Sign Up</Text>
          </Button>       
          </View>
      </View>
      </ScrollView>

  );
  }
}
const styles = StyleSheet.create({
    logo:{
      width: 280,
      height: 280,
      marginLeft: '15%',
      marginTop: '10%'
    },
    text: {
      color: 'white',
      marginTop: '-25%',
      marginLeft: '20%'
    },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
});