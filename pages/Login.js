import React, { Component } from 'react';
import { Text, Alert, Button as Button2, View, StyleSheet, Dimensions } from 'react-native';
import {TextInput, Title, Button} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';


export default class Login extends Component {

  static navigationOptions = {
    title: 'Login',
    //Sets Header text of Status Bar
    //headerLeft:  null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      passwd: '',
      secure: true
    };
  }

 
  onChangeText = (key, val) => {
    this.setState({ [key]: val })

  }
  
  _signInAsync = () => {
    console.log('signIn with ' + this.state.mail + ' ' + this.state.passwd)
    let apiUrl = 'http://147.83.159.200:3001/login';
    fetch(apiUrl, {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "mail": this.state.mail,
        "password": this.state.passwd
      })})

        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
          console.log('data ' + JSON.stringify(data))
          if (data.status==0){
            console.log('forward before func')
            this.forward(data)
          }else{
            Alert.alert('Login Incorrecte', '\nPer accedir, introdueixi les claus correctes')

          }

        })}

      
      
  
  
  forward = async (data) => {
     console.log('forward')
     console.log('token ' + data.token)
     await AsyncStorage.setItem('token', data.token)
     this.props.navigation.navigate('AppC');


   }

  access = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.mail && this.state.mail!='' && this.state.passwd && this.state.passwd!= ''){
      if (this.state.mail.match(mailformat) && this.state.passwd.length>7){
        this._signInAsync()
      }else{
      Alert.alert('Error', 'Introdueix un mail o una contrasenya correcta(més de 8 caràcters)')}

    }
    else{
      Alert.alert('Error', 'Omple els camps abans de poder iniciar sessió')
    }
  }
 

render() {
  
  const { navigate } = this.props.navigation;
    return (
      <ScrollView>
      <View style={{flex:1, marginTop:'40%', alignItems:'center'}}>
        <Title>
          Inicia sessió!
        </Title>
        
        <TextInput
          mode='outlined'
          style={{width: Dimensions.get('screen').width*0.85, marginTop:'10%'}}
          placeholder='Correu electronic'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('mail', val)}
        />
        <View style={{flexDirection:'row', marginTop:'10%', alignContent:'center', alignItems:'center', alignSelf:'center', justifyContent:'center'}}>
        <TextInput
          mode='outlined'
          style={{width: Dimensions.get('screen').width*0.75}}
          placeholder='Contrasenya'
          secureTextEntry={this.state.secure}
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('passwd', val)}
          
        />
        {
        typeof(this.state.secure)!=undefined &&
        <Icon style={{ marginLeft: 17}}
        name={this.state.secure ? "eye" : "eye-off"}
        size={20} color='black' 
        onPress={() => this.setState({secure: !this.state.secure})} />
        }
        
        </View>
        <Button
          mode='contained'
          onPress={this.access}
          style={{marginTop:'10%', width:Dimensions.get('screen').width*0.85}}
        ><Text style={styles.appButtonText}>Accedeix!</Text></Button>
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