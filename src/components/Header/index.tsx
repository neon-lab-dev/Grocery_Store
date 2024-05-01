import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './style';
import {spacing} from '../../constants/spacing';
import {Pressable} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {cartIcon} from '../../assets/images/icons/cartIcon';
import {accountIconBlack} from '../../assets/images/icons/accountIconBlack';
interface HeaderProps {
  onCartPress: () => void;
  onSettingsPress: () => void;
}

const Header: FC<HeaderProps> = ({onCartPress, onSettingsPress}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Pressable onPress={onSettingsPress}>
          <SvgXml xml={accountIconBlack} height={27} width={27} />
        </Pressable>

        <Text style={styles.profileName}>Hi, Salman</Text>
      </View>
      <View style={styles.cartFlex}>
        <View style={styles.cartContainer}>
          <Text style={styles.cartQuantity}>1</Text>
        </View>
        <Pressable onPress={onCartPress}>
          <SvgXml xml={cartIcon} height={27} width={27} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
