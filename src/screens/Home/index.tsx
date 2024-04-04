import React from 'react';
import style from './style';
import {Pressable, Text, View} from 'native-base';

const Home = ({navigation}) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={style.container}>
      <Text> Home Screen </Text>
      <Pressable onPress={openDrawer}>
        <Text>Open Settings</Text>
      </Pressable>
    </View>
  );
};

export default Home;
