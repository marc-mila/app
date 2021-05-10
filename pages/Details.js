//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 
import { StyleSheet, View, Image, Text, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import {Title, TextInput, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

//import all the components we are going to use.

 export default class Details extends Component {
   static navigationOptions = {
     title: 'Detalls de la reserva',
     //Sets Header text of Status Bar
     
   };
   render() {
     const { navigate } = this.props.navigation;
       //const { name, type, desc } = this.props.navigation.navigate.params;
       let img = ''
       let apiUrl = 'http://147.83.159.200:3001/downloadImage/' + this.props.navigation.getParam('img')
       AsyncStorage.getItem('token').then((value) => 
       fetch(apiUrl, {  
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + value
          },
          method: 'GET',
        }).then(
          response => {
            console.log('succ ')
            console.log(JSON.stringify(response.url))
            img = response.url
          }
          ).catch(err => {
          console.log('err ')
          console.log(err)
        }))
    
 
      
      return (
        <View style={styles.container}>
          <SafeAreaView>
          <ScrollView style={{marginBottom:10}}>
          <View style={{marginTop:'5%', alignSelf:'center', flexDirection:'column', flex:1, justifyContent:'space-between'}}>     
          <Title style={{marginTop: '10%', marginBottom: '10%', alignSelf: 'center', fontWeight:'bold', textTransform:'uppercase'}} >
              Detalls del producte
              </Title>    
          <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>identificador: {this.props.navigation.getParam('id')}</TextInput>
           <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>nom: {this.props.navigation.getParam('name')}</TextInput>
           <TextInput multiline={true} numberOfLines={3} style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>descripció: {this.props.navigation.getParam('desc')}</TextInput>
           <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>pes: {this.props.navigation.getParam('pes')}</TextInput>
        <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>categoria: {this.props.navigation.getParam('type')}</TextInput>
           <Image style={{width:Dimensions.get('screen').width*0.85, height:Dimensions.get('screen').width*0.85, resizeMode:'contain', marginTop: 10}} source={{uri: "http://147.83.159.200:3001/downloadImage/" + this.props.navigation.getParam('img')}} />
           
          <Button style={{alignSelf : 'center', bottom: 0,marginBottom:10, marginTop: 15, width: Dimensions.get('screen').width*0.85}} icon='check' mode='contained' onPress={() => this.props.navigation.navigate('Book', {id:this.props.navigation.getParam('id')})}>
            <Text>Reserva</Text>
            
          </Button>
          </View>
          </ScrollView>
          </SafeAreaView>
          </View>
          
       );
   }
 }
 const styles = StyleSheet.create({
   container: {
     flex: 1,
  
   },
   appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: '30%'
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
 });


