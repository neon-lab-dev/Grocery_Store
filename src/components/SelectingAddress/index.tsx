import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {Pressable} from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParamList } from '../../navigation/MainNavigation';

interface SelectAddressProps {
  onClose: () => void;
  navigation: StackNavigationProp<AppNavigatorParamList, 'AddAddress'>;
}

const SelectAddress: FC<SelectAddressProps> = ({onClose,navigation}) => {
  const gotoAddAddress = () => {
    navigation.navigate('AddAddress');
  };
  const AddressCard: FC = () => {
    return (
      <View style={styles.addressBox}>
        <Image source={require('../../assets/images/icons/marker.png')} />
        <View>
          <Text style={styles.addressType}>Home</Text>
          <Text numberOfLines={2} style={styles.addressDetails}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            sapiente architecto, vel alias labore consequuntur qui voluptatem
            nihil fuga corrupti repellat voluptates. Excepturi voluptate nulla
            et, maxime aliquid fuga officiis.
          </Text>
        </View>
        <Image source={require('../../assets/images/icons/pencil.png')} />
      </View>
    );
  };
  return (
    <View>
      <View style={styles.selectAddressBox}>
        <Text style={styles.selectAddressText}>Select an Address</Text>
        <Pressable onPress={onClose}>
          <Image
            source={require('../../assets/images/icons/close.png')}
            style={{marginRight: 20}}
          />
        </Pressable>
      </View>
      <Pressable onPress={gotoAddAddress}>
      <View style={styles.addAddress}>
        
        <Text style={[styles.selectAddressText, {color: '#FB923C'}]}>
          Add a Address
        </Text>
       
        <Image source={require('../../assets/images/icons/add.png')} />
      </View>
      </Pressable>
      <View style={styles.savedAdd}>
        <Text style={styles.selectAddressText}>SAVED ADDRESSES</Text>
      </View>
      <AddressCard />
      <AddressCard />
    </View>
  );
};

export default SelectAddress;
