import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './style';
import {spacing} from '../../constants/spacing';
import {Pressable} from 'native-base';

interface HeaderProps {
  onSettingsPress: () => void;
}

const Header: FC<HeaderProps> = ({onSettingsPress}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Pressable onPress={onSettingsPress}>
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
