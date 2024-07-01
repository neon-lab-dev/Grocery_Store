import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/MainNavigation';
import * as Animatable from 'react-native-animatable';
import {getItem} from '../../api/localstorage';
import {horizontalScale, verticalScale} from '../../assets/scaling.ts';

export interface SplashProps {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
}

const {height} = Dimensions.get('window');

const Splash: React.FC<SplashProps> = ({navigation}) => {
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSecondImage(true), 1380);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const isLoggedIn = async () => {
      await new Promise(resolve => setTimeout(resolve, 3500));
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
    <View style={styles.container}>
      {showSecondImage && (
        <Animatable.Image
          source={require('../../assets/images/SplashScreen/Kasera.png')}
          animation="zoomIn"
          duration={2500}
          style={styles.newImage}
        />
      )}
      <Animatable.Image
        source={require('../../assets/images/SplashScreen/G.png')}
        animation={bottomToTopBounceThenRightAndShrink}
        duration={3700}
        style={[styles.image]}
      />
    </View>
  );
};

const bottomToTopBounceThenRightAndShrink = {
  0: {
    translateY: height,
    translateX: 0,
    scale: 1,
  },
  0.5: {
    translateY: 0,
    translateX: 0,
    scale: 1,
  },
  0.7: {
    translateY: 50,
    translateX: 0,
    scale: 0.9,
  },
  0.8: {
    translateY: 0,
    translateX: 0,
    scale: 0.9,
  },
  1: {
    translateY: 0,
    translateX: 177 - 70,
    scale: 0.8,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  hidden: {
    display: 'none',
  },
  image: {
    width: horizontalScale(65),
    height: verticalScale(100),
    position: 'absolute',
    zIndex: 1,
    top: '52%',
    left: '50%',
    marginLeft: horizontalScale(-35),
    marginTop: verticalScale(-60),
    transform: [{translateX: -50}, {translateY: -30}],
  },
  newImage: {
    left: horizontalScale(64),
    // width: horizontalScale(180),
    width: horizontalScale(180),
    height: verticalScale(38),
    position: 'absolute',
    zIndex: 0,
  },
});

export default Splash;
