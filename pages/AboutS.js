import React, { Component} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView, Modal, Button as Button2, Dimensions, TouchableOpacity} from 'react-native';
import GridList from 'react-native-grid-list';
import {TextInput, Image} from 'react-native'

import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  //TextInput,
  Button
} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ActionBarImage from './ActionBarImage'




export default class AboutS extends Component {

 constructor(props) {
    super(props);
    this.state = {
      width: 110,
      text: 'APP elaborada per els membres del TFG sobre Gestió de Residus Intel·ligents:',
      text1: 'Marc Milà Martos \nJordi Saparra Buira',
      text2: 'Per a qualsevol incidència, contacteu amb:',
      text3: 'milamartosmarc5@gmail.com \njordi.saparra.buira@gmail.com',
      data: ''

    };

  }

 

 static navigationOptions = ({navigation }) => ({
    title: 'About',
    //Sets Header text of Status Bar
    gestureEnabled : false,
    headerLeft : () => <ActionBarImage navigation={navigation} />,


  });
 
 



  render(){
    return (
		<View style={styles.MainContainer}>
      <TextInput
      editable={false}
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            value={this.state.text, this.state.text}

            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
          />
        <TextInput
      editable={false}
            style={styles.TextInputStyleClass1}
            underlineColorAndroid="transparent"
            value={this.state.text, this.state.text1}

            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
          />
          <TextInput
      editable={false}
            style={styles.TextInputStyleClass2}
            underlineColorAndroid="transparent"
            value={this.state.text, this.state.text2}

            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
          />
          <TextInput
      editable={false}
            style={styles.TextInputStyleClass3}
            underlineColorAndroid="transparent"
            value={this.state.text, this.state.text3}

            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
          />
          <Image
          source={require('../assets/img/recycle-img.png')}
          style={styles.logo}
          resizeMode="contain"
        />	
        
		</View>
	  
);
}}


const styles = StyleSheet.create({
  MainContainer :{
 
    flex:1,
    paddingTop: (Platform.OS) === 'ios' ? 40 : 40,
    //justifyContent: 'center',
    margin:20
      
    },
   
    TextInputStyleClass:{
   
      textAlign: 'center',
      borderWidth: 5,
      borderColor: 'green',
      borderBottomColor: 'white',
      borderRadius:10 ,
      borderBottomLeftRadius:0,
      borderBottomRightRadius:0,
      backgroundColor : "#FFFFFF",
      height: 80,
      color: 'black',
      fontSize: 17,
       
      },
      TextInputStyleClass1:{
   
        textAlign: 'center',
        borderWidth: 5,
        borderColor: 'green',
        borderTopColor: 'white',
        borderBottomColor: 'white',
        borderRadius:10 ,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
        borderBottomLeftRadius:0,
      borderBottomRightRadius:0,
        backgroundColor : "#FFFFFF",
        height: 80,
        color: 'black',
        fontSize: 17,
        fontWeight:'bold'
         
        },
        TextInputStyleClass2:{
   
          textAlign: 'center',
          borderWidth: 5,
          borderColor: 'green',
        borderTopColor: 'white',
        borderBottomColor: 'white',
        borderRadius:10 ,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
        borderBottomLeftRadius:0,
      borderBottomRightRadius:0,
        borderEndColor: 'green',
          backgroundColor : "#FFFFFF",
          height: 80,
          color: 'black',
          fontSize: 17,
           
          },
          TextInputStyleClass3:{
   
            textAlign: 'center',
            borderWidth: 5,
            borderColor: 'green',
            borderTopColor: 'white',
            borderRadius:10 ,
            borderTopLeftRadius:0,
      borderTopRightRadius:0,
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            backgroundColor : "#FFFFFF",
            height: 80,
            color: 'black',
            fontSize: 17,
            fontWeight:'bold'
             
            },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    //flexDirection: 'row',
    //flexWrap: 'wrap',
    paddingTop: 20,

  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  logo:{
    width: 250,
    height: 250,
    marginLeft: '15%',
    marginTop: '10%'
  }
});