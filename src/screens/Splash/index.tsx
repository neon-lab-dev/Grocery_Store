import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/MainNavigation';
import * as Animatable from 'react-native-animatable';
import {getItem} from '../../api/localstorage';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling.ts';

export interface SplashProps {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
}

const {height} = Dimensions.get('window');

const Splash: React.FC<SplashProps> = ({navigation}) => {
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSecondImage(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const isLoggedIn = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
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
        <Animatable.Text
          animation={unfoldAnimation}
          duration={400}
          style={styles.newImage}>
          Kasera
        </Animatable.Text>
      )}
      <Animatable.Image
        source={require('../../assets/images/SplashScreen/G.png')}
        animation={bottomToTopBounceThenRightAndShrink}
        duration={1500}
        style={[styles.image]}
      />
    </View>
  );
};

const unfoldAnimation = {
  0: {
    translateY: 0,
    scaleX: 0,
  },
  1: {
    translateY: 0,
    scaleX: 1,
  },
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
  0.9: {
    translateY: 0,
    translateX: 0,
    scale: 0.9,
  },
  1: {
    translateY: 0,
    translateX: horizontalScale(155 - 70),
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
    width: horizontalScale(73),
    height: verticalScale(98),
    position: 'absolute',
    zIndex: 1,
    top: '52.4%',
    left: '50%',
    marginLeft: horizontalScale(-35),
    marginTop: verticalScale(-60),
    transform: [{translateX: -50}, {translateY: -30}],
  },
  newImage: {
    textAlign: 'center',
    left: horizontalScale(68),
    position: 'absolute',
    zIndex: 0,
    fontSize: scaleFontSize(55),
    fontFamily: 'Montserrat-Black',
    color: '#22C55E',
  },
});

export default Splash;
