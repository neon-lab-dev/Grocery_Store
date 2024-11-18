import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './style';
import {Pressable} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {cartIcon} from '../../assets/images/icons/cartIcon';
import {accountIconBlack} from '../../assets/images/icons/accountIconBlack';
import {useSelector} from 'react-redux';
import {horizontalScale, verticalScale} from '../../assets/scaling.ts';
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
          <Image
            source={require('../../assets/images/newTheme/User.png')}
            style={{width: horizontalScale(18), height: verticalScale(18)}}
          />
          {/* <SvgXml xml={accountIconBlack} height={27} width={27} /> */}
        </Pressable>

        <Text style={styles.profileName}>Hi, {name}</Text>
      </View>
      <Pressable onPress={onCartPress}>
        <View style={styles.cartFlex}>
          {cartItemCount !== 0 && (
            <View style={styles.cartContainer}>
              <Text style={styles.cartQuantity}>{cartItemCount}</Text>
            </View>
          )}
          {/* <SvgXml xml={cartIcon} height={27} width={27} /> */}
          <Image
            source={require('../../assets/images/newTheme/cart.png')}
            style={{width: horizontalScale(18), height: verticalScale(18)}}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Header;
