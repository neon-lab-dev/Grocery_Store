import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {Pressable} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import {close} from '../../assets/images/icons/close';
import {horizontalScale} from '../../assets/scaling';
import {addIcon} from '../../assets/images/icons/add';
import {edit} from '../../assets/images/icons/edit';
import {orangeLocation} from '../../assets/images/icons/orangeLocation';

interface SelectAddressProps {
  onClose: () => void;
  onAddAddress: () => void;
}

const SelectAddress: FC<SelectAddressProps> = ({onClose, onAddAddress}) => {
  const AddressCard: FC = () => {
    return (
      <View style={styles.addressBox}>
        <SvgXml xml={orangeLocation} height={24} width={24} />
        <View>
          <Text style={styles.addressType}>Home</Text>
          <Text numberOfLines={2} style={styles.addressDetails}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            sapiente architecto, vel alias labore consequuntur qui voluptatem
            nihil fuga corrupti repellat voluptates. Excepturi voluptate nulla
            et, maxime aliquid fuga officiis.
          </Text>
        </View>
        <SvgXml xml={edit} height={24} width={24} />
      </View>
    );
  };
  return (
    <View>
      <View style={styles.selectAddressBox}>
        <Text style={styles.selectAddressText}>Select an Address</Text>
        <Pressable onPress={onClose} mr={horizontalScale(20)}>
          <SvgXml xml={close} height={24} width={24} />
        </Pressable>
      </View>
      <Pressable onPress={onAddAddress}>
        <View style={styles.addAddress}>
          <Text style={[styles.selectAddressText, {color: '#FB923C'}]}>
            Add an Address
          </Text>
          <SvgXml xml={addIcon} height={24} width={24} />
        </View>
      </Pressable>
      <View style={styles.savedAdd}>
        <Text style={styles.selectAddressText}>SAVED ADDRESSES</Text>
      </View>
      <AddressCard />
      <View
        style={{borderWidth: horizontalScale(0.5), borderColor: '#F3F4F6'}}
      />
      <AddressCard />
    </View>
  );
};

export default SelectAddress;
