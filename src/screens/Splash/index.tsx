import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
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
  const contentRef = useRef<Animatable.View & View>(null);

  useEffect(() => {
    contentRef.current?.animate(
      {
        from: {translateY: height},
        to: {translateY: 0},
      },
      2000, // Duration of the animation
    );
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
      <Animatable.View ref={contentRef} style={styles.content}>
        <Text style={styles.title}>EasyNeeds</Text>
        {/* <Text style={styles.subtitle}>Your Local Market in Your Pocket!</Text> */}
      </Animatable.View>
      <Text style={styles.version}>V - 1.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C3AED',
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
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: verticalScale(58),
    fontFamily: 'Inter_Thin',
  },
  subtitle: {
    color: '#FFFFFF',
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
    color: '#ffffff',
  },
});

export default Splash;
