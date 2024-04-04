import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './style';
import {spacing} from '../../constants/spacing';

const Header: FC = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/icons/account_circle.png')}
          style={{marginTop: spacing.s8}}
        />
        <Text style={styles.profileName}>Hi, Salman</Text>
      </View>
      <View style={styles.cartFlex}>
        <View style={styles.cartContainer}>
          <Text style={styles.cartQuantity}>90+</Text>
        </View>
        <Image source={require('../../assets/images/icons/cart.png')} />
      </View>
    </View>
  );
};

export default Header;
