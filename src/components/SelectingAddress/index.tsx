import React, {FC} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SelectAddressProps {
  onClose: () => void;
  onAddAddress: () => void;
}

const SelectAddress: FC<SelectAddressProps> = ({onClose, onAddAddress}) => {
  const navigation = useNavigation();
  const storeUser = async () => {
    try {
      await AsyncStorage.setItem('primaryAddress', JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  const addressList = [
    {
      id: 1,
      landmark: 'NNR Appartment',
      address: '5-13',
      city: 'Vijayawada',
      state: 'AndhraPradesh',
      pincode: '521325',
      label: 'Home',
    },
    {
      id: 2,
      landmark: 'Near Sachivalayam',
      address: '5-123',
      city: 'Vijayawada',
      state: 'AndhraPradesh',
      pincode: '521345',
      label: 'Work',
    },
    {
      id: 3,

      landmark: 'komalanagar',
      address: '11-221',
      city: 'challapalli',
      state: 'AndhraPradesh',
      pincode: '521345',
      label: 'Work',
    },
    {
      id: 4,
      landmark: 'Malaswaram',
      address: 'Near RiceMill',
      city: 'Malaswaram',
      state: 'AndhraPradesh',
      pincode: '521345',
      label: 'Work',
    },
  ];

  const editPressed = location => {
    console.log('location', location);
    onClose();
    navigation.navigate('AddAddress', {location: location, title: 'Edit'});
  };
  const AddressCard: FC = ({location}) => {
    return (
      <View style={styles.addressBox}>
        <SvgXml xml={orangeLocation} height={24} width={24} />
        <View>
          <Text style={styles.addressType}>{location.label}</Text>
          <Text numberOfLines={2} style={styles.addressDetails}>
            {`${location.address},${location.landmark},${location.city},${location.state},${location.pincode}`}
          </Text>
        </View>
        <SvgXml
          xml={edit}
          height={24}
          width={24}
          onPress={() => editPressed(location)}
        />
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
      <FlatList
        data={addressList}
        renderItem={({item}) => <AddressCard location={item} />}
      />
    </View>
  );
};

export default SelectAddress;
