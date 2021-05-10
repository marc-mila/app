//This is an example code for Navigator// 
import React, { Component } from 'react';
import { Dimensions } from 'react-native';

//import react in our code. 
import { StyleSheet, View, Text,  SafeAreaView, ScrollView, Image} from 'react-native';
import {Title, TextInput, Button } from 'react-native-paper'

import AsyncStorage from '@react-native-async-storage/async-storage';


//import all the components we are going to use.

 export default class DetailsProducte extends Component {
   static navigationOptions = {
     title: 'Detalls del producte',
     //Sets Header text of Status Bar
   }
   constructor(props){
    super(props);
    this.state = {
      imageUrl: '',
    }}

   componentDidMount(){
     //console.log(this.props.navigation.getParam('pic'))
    let imageName = this.props.navigation.getParam('pic');
    console.log(imageName)
    let apiUrl = 'http://147.83.159.200:3001/downloadImage/' + imageName
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
        //let blob = response.blob()
        //download(response.url, imageName)
        //let file = new Blob([response.blob()], {type:'image/jpeg'});

        this.setState({imageUrl: response.url})


      }
      ).catch(err => {
      console.log('err ')
      console.log(err)
    }) )}
   


   delete(){
    //borrar 
    console.log('url to delete ' + this.props.navigation.getParam('pic'))
    let apiUrl = 'http://147.83.159.200:3001/delete/' + this.props.navigation.getParam('pic')
    AsyncStorage.getItem('token').then((value) => 
    fetch(apiUrl, {  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + value
      },
      method: 'DELETE',
    }).then(
      response => {
        console.log('succ ')
        console.log(JSON.stringify(response.url))
        //let blob = response.blob()
        //download(response.url, imageName)
        //let file = new Blob([response.blob()], {type:'image/jpeg'});

        //this.setState({imageUrl: response.url})


      }
      ).catch(err => {
      console.log('err ')
      console.log(err)
    } ))
    this.props.navigation.state.params.deleteProduct(this.props.navigation.getParam('id'));
    this.props.navigation.navigate('NovaReservaWall')
     
   }
   render() {
     const { navigate } = this.props.navigation;
       //const { name, type, desc } = this.props.navigation.navigate.params;

    
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
         <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>descripció: {this.props.navigation.getParam('desc')}</TextInput>
         <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>pes: {this.props.navigation.getParam('pes')}</TextInput>
         <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>categoria: {this.props.navigation.getParam('cat')}</TextInput>
         <Image
                source={{uri: this.state.imageUrl}}
                style={{width:Dimensions.get('screen').width*0.85, height:Dimensions.get('screen').width*0.85, resizeMode:'contain', marginTop: 10}} /> 
         <Button style={{alignSelf : 'center', bottom: 0,marginBottom:10, marginTop: 15, width: Dimensions.get('screen').width*0.85, backgroundColor:'red'}} icon="delete" mode='contained' onPress={() => this.delete()}>
          <Text>Esborrar</Text>
          
        </Button>
        <Button style={{alignSelf : 'center', bottom: 0,marginBottom:10, marginTop: 15, width: Dimensions.get('screen').width*0.85}} mode='contained' onPress={() => this.props.navigation.navigate('NovaReservaWall')}>
          <Text>Tornar</Text>
          
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
    marginTop: '30%',
    
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
 });


