import React, { Component} from 'react';
import {View, StyleSheet, ScrollView, Modal, Dimensions, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment'

import {
  Avatar,
  Title,
  Caption,
  Text,
  TextInput,
  Button
} from 'react-native-paper';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ActionBarImage from './ActionBarImage'




export default class ProfileS extends Component {

 constructor(props) {
    super(props);
    this.state = {
      width: 110,
      name: '',
      surname: '',
      user: '',
      phone: '',
      date: '',
      historial: [],
      mail: '',
      isVisible: false,
      item : '',
      porta : 0,
      reutilitzar: 0

    };
    this.displayModal = this.displayModal.bind(this);

  }


  getRegPorta(){
    var porta = 0
    for(let i = 0; i < this.state.historial.length; i++){
      if (this.state.historial[i].tipus == 'porta'){
        porta=porta+1
      }
    
  }
  return porta;
}

getRegReutilitzar(){
  var reut = 0
  for(let i = 0; i < this.state.historial.length; i++){
    if (this.state.historial[i].tipus == 'reutilitzar'){
      reut=reut+1
    }
  
}
return reut;
}


 componentDidMount = async() => {
    
  const {navigation} = this.props
  this.focusListener = navigation.addListener("didFocus", () => {
    AsyncStorage.getItem('token').then((value) => 
   fetch('http://147.83.159.200:3001/getUsuari', 
   {headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + value
  },
  method: 'GET',})
   
   .then(response => response.json())
   //.then(data => console.log(data))
   .then(data => {
     console.log(data)
     this.setState({ name: data[0].nom, surname: data[0].cognom, mail: data[0].mail, phone: data[0].telefon, date: data[0].dataRegistre });
     
 }))
   
 
   AsyncStorage.getItem('token').then((value) => 
   fetch('http://147.83.159.200:3001/getHistorial',{
     headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + value
  },
  method: 'GET',})
   .then(response => response.json())
   //.then(data => console.log(data))
   .then(data => {
     console.log(data)
     this.setState({ historial: data });
     
 }))

    
 
  
  

})}

updateHistorial(){
  AsyncStorage.getItem('token').then((value) => 
   fetch('http://147.83.159.200:3001/getHistorial',{
     headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + value
  },
  method: 'GET',})
   .then(response => response.json())
   //.then(data => console.log(data))
   .then(data => {
     console.log(data)
     this.setState({ historial: data });
     
 }))
}

ListEmptyView() {
  console.log('showing')
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex:1, margin: 10}}>

      <Text style={{textAlign: 'center', fontWeight:'bold'}}> No has realitzat cap reserva encara!</Text>
      <Icon style={{ alignSelf:'center', marginTop:50}}
      name={"alert-decagram"}
      size={50} color='black' />

    </View>

  );
}




componentWillUnmount(){
  this.focusListener.remove();

}


 static navigationOptions = ({navigation }) => ({
    title: 'Perfil',
    //Sets Header text of Status Bar
    gestureEnabled : false,
    headerLeft : () => <ActionBarImage navigation={navigation} />,


  });
 
  deleteReserva(id){
    console.log('id: ' + id)
    fetch('http://147.83.159.200:3001/deleteReserva',{
     headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'DELETE',
  body: JSON.stringify({
    "id": id,
  })})
   .then(response => response.json())
   //.then(data => console.log(data))
       
 }

  displayModal(show, param){
    this.setState({isVisible: show})
    this.setState({item: param})
  }

  renderItem = ({ item, index }) => {
    var currentDate = new Date(item.date.slice(0,10));
    currentDate.setDate(currentDate.getDate() + 1)
    var isoDate = currentDate.toISOString().slice(0,10);
    console.log(currentDate, isoDate);
    //item.date = isoDate;
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: item.realitzada == 0 ? '#FF991E' : 'lightgreen',
          height: 80,
          width: Dimensions.get('screen').width,
          borderColor: 'black',
          borderRightWidth: 2,
          borderLeftWidth: 2,
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderRadius: 15
        }}>
        <TouchableOpacity  onPress={() => this.displayModal(true, item)}>
        <View style={{flexDirection:'row'}}><Text>Data i hora:</Text><Text style={{fontWeight:'bold'}}> {isoDate}, {item.time}</Text></View>
        <View style={{flexDirection:'row'}}><Text>Tipus:</Text><Text style={{fontWeight:'bold', textTransform:'capitalize'}}> {item.tipus}</Text></View>
        {item.realitzada==0 ?         
        <View style={{flexDirection:'row'}}><Text>Realitzada:</Text><Text style={{fontWeight:'bold'}}> A l'espera...</Text></View>
        : 
        <View style={{flexDirection:'row'}}><Text>Realitzada:</Text><Text style={{fontWeight:'bold'}}> Sí</Text></View>
      }
        </TouchableOpacity>
      </View>
    );
  };


  render(){
    
    return (
      <View style={{flex:1}}>
		<View style={styles.container}>

		  <View style={styles.userInfoSection}>
		    <View style={{flexDirection: 'row', marginTop: 15}}>
		      <Avatar.Image 
		        source={
              require('../assets/iconç.png')
		        }
            style={{backgroundColor:'white'}}
		        size={80}
		      />
		      <View style={{marginLeft: 20}}>
		        <Title style={[styles.title, {
		          marginTop:15,
		          marginBottom: 5,
		        }]}>{this.state.name} {this.state.surname}</Title>
		      </View>
		    </View>
		  </View>
            
	<View style={styles.userInfoSection}>
        
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{this.state.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{this.state.mail}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Registrat desde {Moment(this.state.date.slice(0,10)).format('DD-MM-YYYY')}</Text>
        </View>
        
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={styles.infoBox}>
            <Title>{this.getRegPorta()}</Title>
            <Caption>Reserves Porta</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{this.getRegReutilitzar()}</Title>
            <Caption>Reserves Reutilitzar</Caption>
          </View>
      </View>
      </View>
          <View style={styles.containerHistorial}>
          <Title style={{alignSelf:'center'}}>Historial</Title>
      <ScrollView>
          <FlatList
            style={{marginTop:10}}
            showSeparator
            data={this.state.historial}
            numColumns={1}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={{margin: 4}}/>}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={this.ListEmptyView}

        />

        </ScrollView>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <ScrollView>
            <View style={{alignSelf:'center', marginTop: 40}}>
              <Title style={{alignSelf:'center'}}>Dades de la reserva</Title>
              <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 30}} editable={false}>identificador: {this.state.item.id}</TextInput>
           <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>data: {Moment(this.state.item.date).format('YYYY-MM-DD')}</TextInput>
           <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>hora: {this.state.item.time}</TextInput>
           <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>ubicacio: {this.state.item.idUbicacio}</TextInput>
           <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>vehicle: {this.state.item.idVehicle}</TextInput>
           <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>tipus: {this.state.item.tipus}</TextInput>
           {this.state.item.realitzada == 0 ? <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>estat: No realitzada</TextInput> : 
           <TextInput style={{width: Dimensions.get('screen').width*0.85, marginTop: 10}} editable={false}>estat: Realitzada</TextInput>}

              <Button
                mode='contained'
                style={{marginTop: 30}}
                onPress={() => {console.log(this.state.item); this.displayModal(false, ''); this.props.navigation.navigate('ProfileS')}}
              ><Text style={styles.appButtonText}>Torna enrere!</Text></Button>
              <Button
                mode='contained'
                icon="delete"
                style={{marginTop: 30, backgroundColor:'red'}}
                onPress={() => {this.deleteReserva(this.state.item.id); this.updateHistorial(); this.displayModal(false, ''); this.props.navigation.navigate('ProfileS')}}
              ><Text style={styles.appButtonText}>Esborrar</Text></Button>
            </View>
            </ScrollView>
          </Modal>
          </View>


      



      
		</View>
	  
);
}}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    //flexDirection: 'row',
    //flexWrap: 'wrap',
    paddingTop: 20,

  },
  containerHistorial: {

      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      //flexDirection: 'row',
      //flexWrap: 'wrap',
  
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
    marginTop: 10,
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
  }
});
