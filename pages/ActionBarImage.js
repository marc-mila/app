import React from 'react';

import {View, Image,TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionBarImage = ({ navigation }) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" color="#00000" size={50} 
          
        
      />
      </TouchableOpacity>
    </View>
  );
};

export default ActionBarImage;
