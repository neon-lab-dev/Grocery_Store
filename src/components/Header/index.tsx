import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './style';
import {spacing} from '../../constants/spacing';
import {Pressable} from 'native-base';

type HeaderProps = {
  onPress: () => void;
};

const Header: FC<HeaderProps> = ({onPress}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Pressable onPress={onPress}>
          <Image
            source={require('../../assets/images/icons/account_circle.png')}
            style={{marginTop: spacing.s8}}
          />
        </Pressable>
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
