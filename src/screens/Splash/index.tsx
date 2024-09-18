import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from 'react-native';
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
      <View style={styles.content}>
        <Text style={styles.title}>Grocery Shop</Text>
        <Text style={styles.subtitle}>Your Local Market in Your Pocket!</Text>
      </View>
      <Text style={styles.version}>V - 2.0</Text>
    </View>
  );
};

// const unfoldAnimation = {
//   0: {
//     translateY: 0,
//     scaleX: 0,
//   },
//   1: {
//     translateY: 0,
//     scaleX: 1,
//   },
// };

// const bottomToTopBounceThenRightAndShrink = {
//   0: {
//     translateY: height,
//     translateX: 0,
//     scale: 1,
//   },
//   0.5: {
//     translateY: 0,
//     translateX: 0,
//     scale: 1,
//   },
//   0.7: {
//     translateY: 50,
//     translateX: 0,
//     scale: 0.9,
//   },
//   0.9: {
//     translateY: 0,
//     translateX: 0,
//     scale: 0.9,
//   },
//   1: {
//     translateY: 0,
//     translateX: horizontalScale(155 - 70),
//     scale: 0.8,
//   },
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9A31',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: verticalScale(20),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // This allows the content to take up available space
  },
  title: {
    fontSize: scaleFontSize(48),
    fontFamily: 'Inter_Black',
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
    lineHeight: verticalScale(58),
  },
  subtitle: {
    color: 'black',
    fontFamily: 'Inter_Black',
    fontWeight: '500',
    fontSize: scaleFontSize(12),
    lineHeight: verticalScale(14),
  },
  version: {
    fontFamily: 'Inter_Black',
    fontWeight: '500',
    fontSize: scaleFontSize(12),
    lineHeight: verticalScale(14),
    marginBottom: verticalScale(20),
  },
});

export default Splash;
