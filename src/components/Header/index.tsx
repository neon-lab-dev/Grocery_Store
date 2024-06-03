import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {Pressable} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {cartIcon} from '../../assets/images/icons/cartIcon';
import {accountIconBlack} from '../../assets/images/icons/accountIconBlack';
import {useSelector} from 'react-redux';
interface HeaderProps {
  onCartPress: () => void;
  onSettingsPress: () => void;
  name: string;
}

const Header: FC<HeaderProps> = ({onCartPress, onSettingsPress, name}) => {
  const cartItems = useSelector((state: any) => state.cart);
  const cartItemCount = cartItems.items.length;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Pressable onPress={onSettingsPress}>
          <SvgXml xml={accountIconBlack} height={27} width={27} />
        </Pressable>

        <Text style={styles.profileName}>Hi, {name}</Text>
      </View>
      <View style={styles.cartFlex}>
        <View style={styles.cartContainer}>
          <Text style={styles.cartQuantity}>{cartItemCount}</Text>
        </View>
        <Pressable onPress={onCartPress}>
          <SvgXml xml={cartIcon} height={27} width={27} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
