import React, {useEffect} from 'react';
import {ImageBackground, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/MainNavigation';
import {useSelector} from 'react-redux';

export interface SplashProps {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
}

const Splash: React.FC<SplashProps> = ({navigation}) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    const isLoggedIn = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      if (isAuthenticated) {
        navigation.replace('App', {screen: 'Home'});
      } else {
        navigation.replace('Auth', {screen: 'Login'});
      }
    };
    isLoggedIn();
  }, [navigation, isAuthenticated]);

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
