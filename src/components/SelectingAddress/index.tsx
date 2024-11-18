import React, {FC, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {Pressable} from 'native-base';
import {close} from '../../assets/images/icons/close';
import {horizontalScale} from '../../assets/scaling';
import {addIcon} from '../../assets/images/icons/add';
import {edit} from '../../assets/images/icons/edit';
import {orangeLocation} from '../../assets/images/icons/orangeLocation';
import {useNavigation} from '@react-navigation/native';
import {getAddress} from '../../api/auth_routes';
import {setSelectedAddress} from '../../api/localstorage';
import Loader from '../Loader/Loader';

interface SelectAddressProps {
  onClose: () => void;
  onAddAddress: () => void;
}

const SelectAddress: FC<SelectAddressProps> = ({onClose, onAddAddress}) => {
  const [addressList, setAddressList] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    setLoaderVisible(true);
    const getAddressList = await getAddress();
    setLoaderVisible(false);
    // console.log(getAddressList);
    setAddressList(getAddressList);
  };
  const navigation = useNavigation();

  const saveSelectAddress = (location: any) => {
    setSelectedAddress(location);
    onClose();
  };

  const editPressed = (location: any) => {
    // console.log('location', location);
    onClose();
    navigation.navigate('AddAddress', {location: location, title: 'Edit'});
  };
  const AddressCard: FC = ({location}) => {
    return (
      <Pressable
        style={styles.addressBox}
        onPress={() => saveSelectAddress(location)}>
        <SvgXml xml={orangeLocation} height={24} width={24} />
        <View>
          <Text style={styles.addressType}>{location.addressName}</Text>
          <Text numberOfLines={2} style={styles.addressDetails}>
            {`${location.addressLine1},${location.landmark},${location.city},${location.state},${location.pincode}`}
          </Text>
        </View>
        <SvgXml
          xml={edit}
          height={24}
          width={24}
          onPress={() => editPressed(location)}
        />
      </Pressable>
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
          <Text style={[styles.selectAddressText, {color: '#6D28D9'}]}>
            Add an Address
          </Text>
          <SvgXml xml={addIcon} height={24} width={24} />
        </View>
      </Pressable>
      <View style={styles.savedAdd}>
        <Text style={styles.selectAddressText}>SAVED ADDRESSES</Text>
      </View>
      <Loader isOpen={loaderVisible} />
      <FlatList
        data={addressList}
        renderItem={({item}) => <AddressCard location={item} />}
      />
    </View>
  );
};

export default SelectAddress;
