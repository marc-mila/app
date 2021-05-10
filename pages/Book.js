//This is an example code for Navigator// 

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
import Moment from 'moment'
var moment = require('moment-timezone');

//import react in our code. 
//import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Modal
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';

import {Title, TextInput, Button } from 'react-native-paper'

import { Dropdown } from 'react-native-material-dropdown-v2';

import AsyncStorage from '@react-native-async-storage/async-storage';

//import all the components we are going to use.

export default class NovaReservaWall extends Component {
  static navigationOptions = ({navigation}) =>  ({
    title: 'Reserva',
    //Sets Header text of Status Bar,
  });

  constructor(props){
    super(props);
    this.state = {
      idClient: '',
      name: '', 
      description: '', 
      weight: '', 
      category: '',
      picture: '',
      pic: '',
      reuse: false,
      date: '',
      hours: '',
      minutes: '' ,
      check: false,
      time: new Date(),
      vehicle: '',
      mode: 'date',
      shown: false,
      location: '', 
      isVisible: false,
      listProductes: [],
      prodId:0,
      locationList: []
      
  }
  this.displayModal = this.displayModal.bind(this);
}

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  

  
  showTimepicker = () => {
    this.setState({shown:true});
  };

  hideTimePicker = () => {
    this.setState({shown:false});
  }


  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    this.setState({
          hours:('0' + currentDate.getHours()).slice(-2), 
          minutes:('0' + currentDate.getMinutes()).slice(-2),  
          shown: false});
          if (this.state.hours && this.state.hours!='' 
        && this.state.minutes && this.state.minutes!='' 
        && this.state.date && this.state.date!=''){
          this.checkDateTime();
        }
    this.hideTimePicker();
    console.log(this.state.date);
    console.log(this.state.hours)
    console.log(this.state.minutes)
  };
  
  displayModal(show){
    this.setState({isVisible: show})
  }

  

  

  handleDateChange = (newDate) => {
    this.setState({date: newDate.toString().substring(0,10)})
    console.log(this.state.date);
    console.log(this.state.hours)
    console.log(this.state.minutes)
    if (this.state.hours && this.state.hours!='' 
        && this.state.minutes && this.state.minutes!='' 
        && this.state.date && this.state.date!=''){
          this.checkDateTime();
        }

  }

  checkDateTime(){
    console.log('date ' + this.state.date + ' time ' + this.state.hours + ':' + this.state.minutes)
    
    let date=moment().tz('Europe/Madrid').format('YYYY-MM-DD HH:mm ZZ')
    console.log(date)
    console.log('dia ' + date.slice(0,10))
    console.log('hora ' + date.slice(11,13))
    console.log('min ' + date.slice(14,16))
    
    if(this.state.date == date.slice(0,10) && (this.state.hours<date.slice(11,13) || this.state.hours==date.slice(11,13) && this.state.minutes<=date.slice(14,16))){
      Alert.alert('Error', 'No es pot realitzar la reserva en aquest horari')
    }
    else{

      let apiUrl = 'http://147.83.159.200:3001/checkHorari';
      fetch(apiUrl, {  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "date": this.state.date,
            "time": this.state.hours + ':' + this.state.minutes,
            
          })})
        .then(response => response.json())
        .then(data => {
          console.log('succ ')
          console.log(JSON.stringify(data.status))
          if (data.status==0){
            this.setState({check: true, vehicle:data.vehicle})
          }
          else{
            this.setState({check: false, date:'', hours:'', minutes:'', vehicle: ''})
            Alert.alert('Error', 'Dia i hora no disponible')
          }
          //console.log(response)
        }
        ).catch(err => {
        console.log('error')
        //console.log(err)
      } )
    }
  }

  componentDidMount(){

    
    AsyncStorage.getItem('token').then((value) => 
   fetch('http://147.83.159.200:3001/getUbicacio', 
   {headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + value
  },
  method: 'GET',})
      .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
      this.setState({ locationList: data });
  })
    
    //console.log(this.state.locationList)
  
    )}

  createReservaReutilitzar(){
    let apiUrl = 'http://147.83.159.200:3001/addReservaReutilitzar';

    AsyncStorage.getItem('token').then((value) => 
    fetch(apiUrl, {  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' :  'Bearer ' + value
      },
      method: 'POST',
      body: JSON.stringify({
        reserva: {
          date: this.state.date,
          time: this.state.hours + ':' + this.state.minutes,
          idClient: value,
          idVehicle: this.state.vehicle,
          idUbicacio: this.state.location
        },
        producte: [{id: this.props.navigation.getParam('id')}]
       }),
    }).then(
      response => {
        console.log('succ ')
        //console.log(response)
      }
      ).catch(err => {
      console.log('err ')
      //console.log(err)
    } ))}


  

  

  
 

  showState = () => {
    if (this.state.date && this.state.date !== ''
      && this.state.hours && this.state.hours !== ''
      && this.state.minutes && this.state.minutes !== ''
      && this.state.location && this.state.location !== ''){
        this.createReservaReutilitzar()
        this.displayModal(true);
      }
      else {
        Alert.alert('Error', 'Omple els camps abans de poder realitzar la reserva')
      }
 
  }
  
  
  render() {
    
    //metode per obtenir ubicacions
    
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
              onPress={() => {this.displayModal(false); this.props.navigation.navigate('Wall', {refresh: true})}}
            >
              <Text>Tornar al inici</Text>
              </Button>
              </View>
          </View>
        </Modal>
        <SafeAreaView>
        <ScrollView style={{marginBottom:10}}>
        
        
          <View style={{marginTop:'5%', alignSelf:'center', flexDirection:'column', flex:1, justifyContent:'center', alignItems:'center'}}>
          <Title style={{marginTop: '15%', marginBottom:'15%', alignSelf: 'center', fontWeight:'bold', textTransform:'uppercase'}} >
          Nova reserva PaP
        </Title>
        
        
        
        
        
       


        <View>
          <DatePicker
            format="YYYY-MM-DD"
            style = {{width: Dimensions.get('screen').width*0.85, marginTop: 15}}
            date={this.state.date}
            minDate={new Date()}
            placeholder="Data de recollida:"
            onDateChange={this.handleDateChange}
            />
         </View>
      <View style={{flex: 1, flexDirection:'row', marginTop: '10%', justifyContent:'space-between', alignItems:'center', alignSelf:'stretch', alignContent:'center'}}>
        {this.state.hours != '' && this.state.minutes != '' ?
        <TextInput style={{height:45, width: Dimensions.get('screen').width*0.5}} editable={false}>Hora de recollida: {this.state.hours}:{this.state.minutes}</TextInput> :
        <TextInput style={{height:45, width: Dimensions.get('screen').width*0.5}} editable={false}>Hora de recollida:</TextInput> }
        <Button icon="clock" onPress={this.showTimepicker} mode='contained' justifyContent='center' style={{height:45}}>HORA</Button>
        {this.state.shown && (
        <DateTimePicker
        
          testID="dateTimePicker"
          value={this.state.time}
          mode='time'
          is24Hour={true}
          minuteInterval={1}
          isVisible={this.state.shown}
          onCancel={this.hideTimePicker}
          display="default"
          onChange={this.onChange}
        />
      )}
      </View>
      <View style={{marginTop: '10%'}}>
      {/* <Dropdown style={{width:  Dimensions.get('screen').width*0.5, marginTop:10, marginLeft: Dimensions.get('screen').width*0.05}}
          label='Ubicació'
           data={loc}
           onChangeText={val => this.onChangeText('location', val)}
        
        /> */}
         <Dropdown style={{width:  Dimensions.get('screen').width*0.85}}
              label='Ubicació'
              data={this.state.locationList}              
              onChangeText={val => this.onChangeText('location', val)}
              />
        
      </View>
      
      <Button style={{alignSelf : 'center', bottom: 0,marginBottom:10, marginTop: '10%', width: Dimensions.get('screen').width*0.85}} mode='contained'  onPress={this.showState} >
          <Text style={styles.appButtonText}>RESERVA</Text>
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
  logo:{
    width: 140,
    height: 140,

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

  },
  text: {
    marginTop: 10,
  },
  

})