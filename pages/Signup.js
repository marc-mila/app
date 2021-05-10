//This is an example code for Navigator// 
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
//import react in our code. 



import {Title, TextInput, Button } from 'react-native-paper'
//import react in our code. 

import {
  View,
  Button as Button2,
  StyleSheet,
  Text
} from 'react-native'
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//import all the components we are going to use.

export default class Signup extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    //Sets Header text of Status Bar
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '', surname: '', password: '', email: '', phone_number: ''
        };
  }
  
  
    

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
 

  createClient(){
    console.log(this.state.registerDate)
    let apiUrl = 'http://147.83.159.200:3001/signup';
    fetch(apiUrl, {  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        "nom": this.state.name,
        "cognom": this.state.surname,
        "mail": this.state.email,
        "telefon" :  this.state.phone_number,
        "contrasenya" : this.state.password,

      }),
    }).then(response => response.json())
    .then(
      data => {
        console.log('succ ')
        //console.log(response)
        if (data.message=='usuari creat correctament'){
          Alert.alert('Felicitats!', 'S\'ha registrat correctament')
        }else{
          Alert.alert('Error!', 'No s\'ha registrat correctament')

        }
      }
      ).catch(err => {
      console.log('err ')
      //console.log(err)
    } )}


  access = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.name && this.state.name!='' 
      && this.state.surname && this.state.surname!=''
      && this.state.password && this.state.password!=''
      && this.state.email && this.state.email!=''
      && this.state.phone_number && this.state.phone_number!=''){
        if (this.state.email.match(mailformat) && this.state.password.length>7){
          this.createClient()
          this.props.navigation.navigate('MainPage')
        } else{
        Alert.alert('Error', 'Introdueix un mail o una contrasenya correcta(més de 8 caràcters)')}

      }
      else{
        Alert.alert('Error', 'Omple els camps abans de poder registrar-te correctament')
      }
  }
    
  
  render() {
    
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
    <View style={{flex:1, marginTop:'20%', alignItems:'center'}}>        
    <Title>Registra't!</Title>
        <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop:20}}
          mode='outlined'
          placeholder='Nom'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop:20}}
        mode='outlined'
          placeholder='Cognoms'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('surname', val)}
        />
        <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop:20}}
        mode='outlined'
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop:20}}
        mode='outlined'
          placeholder='Contrasenya'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop:15}}
        mode='outlined'
          placeholder='Telefon'
          autoCapitalize="none"
          keyboardType='numeric'
          placeholderTextColor='black'
          underlineColorAndroid='transparent'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <View style={{marginTop: 20, flex:1}}>
        
        
        </View>
        <Button
          mode='contained'
          onPress={this.access}
          style={{marginTop:20, width:Dimensions.get('screen').width*0.85, marginBottom:20}}
        ><Text style={styles.appButtonText}>Registra't!</Text></Button>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})