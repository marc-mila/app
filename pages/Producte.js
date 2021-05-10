//This is an example code for Navigator// 

import React, { Component, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';

//import react in our code. 
//import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Modal
} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler';

import {Title, TextInput, Button } from 'react-native-paper'

import { Dropdown } from 'react-native-material-dropdown-v2';
import AsyncStorage from '@react-native-async-storage/async-storage';


//import all the components we are going to use.

export default class Producte extends Component {
  static navigationOptions = ({navigation}) =>  ({
    title: 'Nou Producte',
    //Sets Header text of Status Bar,
  });

  constructor(props){
    super(props);
    this.state = {
      name: '', 
      description: '', 
      weight: '', 
      category: '',
      picture: '',
      picturePath: '',
      pic: '',
      reuse: false,
      date: '',
      hours: '',
      minutes: '' ,
      time: new Date(),
      mode: 'date',
      shown: false,
      location: '', 
      isVisible: false,
      categoryList: []
      
  }
  this.displayModal = this.displayModal.bind(this);
}

componentDidMount(){
  let apiUrl = 'http://147.83.159.200:3001/getCategories';
  
  
   
        

  fetch(apiUrl, {  
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',

    },
    method: 'GET',
  })
  .then(response => response.json())
  //.then(data => console.log(data))
  .then(data => {
    this.setState({ categoryList: data });
})};

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  

  

  



  
  
  displayModal(show){
    this.setState({isVisible: show})
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });


    if (!result.cancelled) {
      this.setState({picture: result});
      this.setState({pic: true})
      let uriParts = this.state.picture.uri.split('/');
      let fileNameType = uriParts[uriParts.length - 1].split('.');
      let fileName = fileNameType[0];
      let fileType = fileNameType[1];
      this.setState({picturePath: fileName+'.'+fileType})      //console.log(this.state.picture);
    }
  };

  

  
  

  

  handleUploadPhoto = () => {

    console.log('in hUP')
    let apiUrl = 'http://147.83.159.200:3001/upload';
    let uri = this.state.picture;
    let uriParts = uri.uri.split('/');
    let fileNameType = uriParts[uriParts.length - 1].split('.');
    //obtenir next identificador producte
    let fileName = fileNameType[0];
    let fileType = fileNameType[1];
    this.setState({picturePath: fileName})
    console.log(fileName + ' ' + fileType)
    
     
          
    AsyncStorage.getItem('token').then((value) => 

        fetch(apiUrl, {  
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + value
          },
          method: 'POST',
          body: JSON.stringify({
						imgsource: uri.base64,
            name: fileName,
            type: fileType,

					}),
        }).then(
          response => {
            console.log('succ ')
            console.log(response)
          }
          ).catch(err => {
          console.log('err ')
          console.log(err)
        } ))}
    






  back() {
    if (this.state.name && this.state.name !== '' 
      && this.state.description && this.state.description !== ''
      && this.state.weight && this.state.weight !== ''
      && this.state.category && this.state.category !== ''
      && this.state.picturePath && this.state.picturePath !== ''){
        console.log('peticio a api + upload pic')
        this.handleUploadPhoto()
        this.props.navigation.state.params.newProduct(this.state.name, this.state.description, this.state.weight, this.state.category, this.state.picturePath);
        this.props.navigation.navigate('NovaReservaWall')
      }
      else {
        Alert.alert('Error', 'Omple els camps abans de poder afegir un producte')
      }
    



  }
  render() {
    let cat = [{
      value: 'Moble',
    }, {
      value: 'Electrodomestic',
    }, {
      value: 'Deixalla',
    }];
    
    let loc = [{
      id: 'C1',
      name: 'C1'
      },
      {
        id: 'C2',
        name: 'C2'
      },
      {
        id: 'C3',
        name: 'C3'
      },
      {
        id: 'C4',
        name: 'C4'
      },

    ]
    const { navigate } = this.props.navigation;
    const {pic} = this.state.pic;
    const {shown} = this.state.shown;
    const { location} = this.state.location; 
    
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          
          <View style={{flex:1}}>
          <Image
          source={require('../assets/img/recycle-img.png')}
          style={{width: 150, height: 150, alignSelf:'center', marginTop: '15%'}}
          resizeMode="contain"
        />
        <View style={{flexDirection:'column'}}>
            <Text style={{alignSelf:'center', fontWeight:'bold', textTransform:'uppercase', fontSize: 20, marginTop: '40%'}}>Reserva executada correctament</Text>
          
            <Button
              style={{width: Dimensions.get('screen').width*0.85, alignSelf: 'center', marginTop: '10%'}}
              mode = 'contained'
              onPress={() => {this.displayModal(false); this.props.navigation.navigate('Wall')}}
            >
              <Text>Tornar al inici</Text>
              </Button>
              </View>
          </View>
        </Modal>
      <SafeAreaView>
        <ScrollView style={{marginBottom:10}}>
        
        
          <View style={{marginTop:'5%', alignSelf:'center', flexDirection:'column', flex:1, justifyContent:'center'}}>
            <Title style={{marginTop: '15%', alignSelf: 'center', fontWeight:'bold', textTransform:'uppercase'}} >
            Nou Producte
            </Title>
            <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop:10}}
            placeholder='Nom del producte'
            autoCapitalize="none"
            placeholderTextColor='grey'
            onChangeText={val => this.onChangeText('name', val)}
            />
            <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop:10}}
            placeholder='Descripcio del producte'
            multiline={true}
            numberOfLines={4}
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='grey'
            onChangeText={val => this.onChangeText('description', val)}
            />
        
            <View style={{flexDirection:'row'}}>
              <TextInput style={{width: Dimensions.get('screen').width*0.3, marginTop:10}}
              placeholder='Pes'
              keyboardType='numeric'
              autoCapitalize="none"
              placeholderTextColor='grey'
              onChangeText={val => this.onChangeText('weight', val)}
              />
              <Dropdown style={{width:  Dimensions.get('screen').width*0.5, marginTop:10, marginLeft: Dimensions.get('screen').width*0.05}}
              label='Categoria'
              data={this.state.categoryList}              
              onChangeText={val => this.onChangeText('category', val)}
              />
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Button style={{alignSelf : 'center', bottom: 0, backgroundColor: "#AAB7B8",marginBottom:10, marginTop: 10, width: Dimensions.get('screen').width*0.85}} mode='outlined' onPress={this.pickImage}>
                <Text style={styles.picButtonText}>Afegeix una imatge</Text>  
              </Button>
              {this.state.picture != '' ? 
                <Image
                source={{uri:this.state.picture.uri}}
                style={{width:Dimensions.get('screen').width*0.85, height:Dimensions.get('screen').width*0.85, resizeMode:'cover'}} />
                : null
              }
            </View>
            <Button style={{alignSelf : 'center', bottom: 0,marginBottom:10, marginTop: 15, width: Dimensions.get('screen').width*0.85}} mode='contained' 
                      onPress={() => this.back()}
                      >
              <Text style={styles.appButtonText}>AFEGIR</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
  container: {
    flex: 1,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#3A59FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: '10%'
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  picButtonText: {
    fontSize: 14,
    color: "black",
    alignSelf: "center",



  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },
  text: {
    marginTop: 10,
  },
  

})