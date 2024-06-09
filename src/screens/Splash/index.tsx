import React, {useEffect} from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/MainNavigation';

import {getItem} from '../../api/localstorage';
import {Image, View} from 'native-base';

export interface SplashProps {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
}

const Splash: React.FC<SplashProps> = ({navigation}) => {
  useEffect(() => {
    const isLoggedIn = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      {/* <ImageBackground
        source={require('../../assets/images/Onboarding.png')}
        style={{flex: 1}}
      /> */}
      <View
        flex={1}
        bgColor={'white'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Image
          alt="logo"
          source={require('../../assets/images/icons/logo.png')}
          height={200}
          width={200}
          resizeMode="contain"
        />
      </View>
    </>
  );
};

export default Splash;
