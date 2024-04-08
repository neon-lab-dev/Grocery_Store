import React from 'react';
import style from './style';
import {Text, View} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';

interface HomeProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Home'>;
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const gotoSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={style.container}>
      <Text> Home Screen</Text>
      <Text onPress={gotoSearch}>Press to go to Search</Text>
    </View>
  );
};

export default Home;
