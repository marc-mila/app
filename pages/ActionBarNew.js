import React from 'react';

import {View, Image,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionBarNew = ({ navigation }) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => navigation.navigate('NovaReservaWall')}>
      <Icon style={{ marginLeft: 17}}
        name={"plus-circle"}
        size={50} color='green'
        style={{marginRight: 10}} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default ActionBarNew;