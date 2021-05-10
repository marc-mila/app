import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import ActionBarImage from './ActionBarImage'
import ActionBarNew from './ActionBarNew';
                                                                                                                    
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class Wall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 110,
      search: '',
      refresh: false,
      items : [
        // { "id": 1, "name": "rellotge", "type": "moble", "desc": "pala de padel sin uso, nueva a estrenar, la mejor de mundo", "img" : "1.jpg"},
        // { "id": 2, "name": "cotxe", "type": "deixalla", "desc": "lorem ipsum", "img" : "2.jpg"},
        // { "id": 3, "name": "platja", "type": "electrodomestic", "desc": "lorem ipsum", "img" : "3.jpg"},
        // { "id": 4, "name": "kusko", "type": "ferralla", "desc": "lorem ipsum", "img" : "4.jpg"}
      ],
      itemsMaster: [
        // { "id": 1, "name": "rellotge", "type": "moble", "desc": "pala de padel sin uso, nueva a estrenar, la mejor de mundo", "img" : "1.jpg"},
        // { "id": 2, "name": "cotxe", "type": "deixalla", "desc": "lorem ipsum", "img" : "2.jpg"},
        // { "id": 3, "name": "platja", "type": "electrodomestic", "desc": "lorem ipsum", "img" : "3.jpg"},
        // { "id": 4, "name": "kusko", "type": "ferralla", "desc": "lorem ipsum", "img" : "4.jpg"}
      ],
    };
  }

  static navigationOptions = ({navigation }) => ({
    title: 'Portal',
    //Sets Header text of Status Bar
    gestureEnabled : false,
    headerLeft : () => <ActionBarImage navigation={navigation} />,
    headerRight : () => <ActionBarNew navigation={navigation} />

  });

  

  componentDidMount(){
    const {navigation} = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      let apiUrl = 'http://147.83.159.200:3001/getProductesReutilitzar';
      AsyncStorage.getItem('token').then((value) => 

        fetch(apiUrl, 
        {headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + value
        },
        method: 'GET',})
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
          this.setState({ items: data, itemsMaster: data });
      }));
    })
    
    
  
  }

  componentWillUnmount(){
    this.focusListener.remove();
  
  }

 
  
  

  
  ListEmptyView() {
    console.log('showing')
    return (
      <View style={{justifyContent: 'flex-start', alignItems: 'center', flex:1, margin: 10}}>
 
        <Text style={{textAlign: 'center', fontWeight:'bold'}}> No hi ha cap producte disponible</Text>
        <Icon style={{ alignSelf:'center', marginTop:50}}
        name={"alert-decagram"}
        size={50} color='black' />
 
      </View>
 
    );
  }

  
  

  searchFilterFunction = async(text) => {
    // Check if searched text is not blank
    if (text!= '') {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = this.state.itemsMaster.filter(function (item) {
        const itemData = item.nom
          ? item.nom.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;

      });
      //console.log(newData)
      //setFilteredDataSource(newData);
      await this.setState({items: newData, search: text}, () =>
      console.log(
        'items:' + this.state.items + ' search: ' + this.state.search
      )
    )
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      await this.setState({items: this.state.itemsMaster, search:''}, () =>
      console.log(
        'items reset:' + this.state.items + ' search: ' + this.state.search
      )
    );
    }
  };
  
  

  renderItem = ({ item, index }) => {
    let img = ''
    let apiUrl = 'http://147.83.159.200:3001/downloadImage/' + item.idImatge
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
         //console.log('succ ')
         //console.log(JSON.stringify(response.url))
         img = response.url
       }
       ).catch(err => {
      //console.log('err ')
       //console.log(err)
     }))
    return(
      <TouchableOpacity
        style={{
          marginLeft: Dimensions.get('screen').width*0.05,
          padding: 10,
          backgroundColor: item.id%2 == 0 ? '#CFD7E0' : '#8F9296',
          height: 200,
          width: Dimensions.get('screen').width*0.9,
          alignItems:'center',
        }}
          onPress={() => {this.setState({refresh: true}); this.props.navigation.navigate('Details', {name: item.nom, pes: item.pes, type: item.idCategoria, desc: item.descripcio, id:item.id, img:item.idImatge})}}
          >
               <View style={{alignSelf:'center', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
               <Text style={{alignSelf: 'center', fontWeight: 'bold', textTransform: 'uppercase'}}>{item.nom} <Text style={{fontStyle:'italic', fontSize:8}}>{item.id}</Text></Text>
               <View style={{flexDirection: 'row', justifyContent:'center', alignContent:'center'}}>
               <Image style={{right: 30, alignSelf: 'center', resizeMode: 'contain', height: Dimensions.get('screen').width*0.9/2, width: Dimensions.get('screen').width*0.9/2 }} source={{uri: "http://147.83.159.200:3001/downloadImage/" + item.idImatge}} />


               <View style={{flexDirection:'row', right: 20}}>
               <View style={{flexDirection:'column'}}>

               <Text style={{marginTop: 25, fontWeight:'bold'}}>Categoria </Text>
               <Text style={{textTransform: 'capitalize'}}>{item.idCategoria}</Text>
               <Text style={{marginTop: 25, fontWeight:'bold'}}>Descripció</Text>
               <Text >{item.descripcio.slice(-10)}...</Text>
               </View>
               </View>
              </View>
              </View>
             </TouchableOpacity>
  
    
    );
      };

  
  render() {
    //width of child is 110
    //var dataSet = this.state.items
    //console.log(dataSet)
    const width = `${100 / parseInt(this.state.width / 110)}%`;
    return (
      <SafeAreaView>
      <View>
      <SearchBar
      style={{height: 50}}
      searchIcon={{ size: 20 }}
      platform='android'
      underlineColorAndroid
      cancelIcon
      onChangeText={(text) => this.searchFilterFunction(text)}
      onClear={() => this.searchFilterFunction('')}
      placeholder="Filtra productes per nom..."
      value={this.state.search}
    /></View> 
          <ScrollView style={{marginBottom:50}}>
          
          <FlatList 
            style={{backgroundColor:'white'}}
            showSeparator
            data={this.state.items}
            numColumns={1}
            renderItem={this.renderItem}
            ListEmptyComponent={this.ListEmptyView}
            ItemSeparatorComponent={() => <View style={{margin: 4}}/>}
            keyExtractor={(item, index) => item.id}
        />
        
        </ScrollView>
        </SafeAreaView>
       

    );
  }

  onLayout(e) {
    if (this.state.width !== e.nativeEvent.layout.width) {
      this.setState({
        width: e.nativeEvent.layout.width
      })
    }
  }
}

const numColumns = 1;
const size = Dimensions.get('window').width/2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 40,
    
  },
  MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 10
     
    },
  box: {
    width: 1.8*size,
    height: size,
    backgroundColor: 'green',


  },
  fixed: {
    position: 'absolute',
    top: 0,
    left:0,
    right:0,
    bottom:0
  },
  itemText: {
    margin: 10,
    color: 'white',
    fontSize: 24,
    backgroundColor: 'blue',
    width: '100%',
    height: 50
  },
  searchBar: {
    fontSize: 24,
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'white',
  },
  wrapper: {
    marginVertical: 10, 
    alignItems: 'center',
    marginLeft:'35%',

  }
});