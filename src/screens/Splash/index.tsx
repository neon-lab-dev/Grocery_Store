import React, {useEffect} from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

export interface SplashProps {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
  isLoggedIn: boolean;
}

const Splash: React.FC<SplashProps> = ({navigation, isLoggedIn}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigation.replace('App', {screen: 'Home'});
      } else {
        navigation.replace('Auth', {screen: 'Login'});
      }
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
