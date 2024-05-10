import React, {useEffect} from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/MainNavigation';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {getItem} from '../../api/localstorage';

export interface SplashProps {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
}

const Splash: React.FC<SplashProps> = ({navigation}) => {
  useEffect(() => {
    const isLoggedIn = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const token = await getItem('token');
      if (token) {
        navigation.replace('App', {screen: 'Home'});
      } else {
        navigation.replace('Auth', {screen: 'Login'});
      }
    };
    isLoggedIn();
  }, [navigation]);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/Onboarding.png')}
        style={{flex: 1}}
      />
    </>
  );
};

export default Splash;
