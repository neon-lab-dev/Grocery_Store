import {View, Text, Pressable} from 'native-base';
import * as React from 'react';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {orangeLocation} from '../../assets/images/icons/orangeLocation';
import {deleteIcon} from '../../assets/images/icons/delete';
import {edit} from '../../assets/images/icons/edit';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
interface Address {
  addressName: string;
  addressLine1: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

interface SavedAddressComponentProps {
  gotoAddAddress: () => void;
  deleteAddress: () => void;
  index: number;
  length: number;
  address: Address;
}

const SavedAddressComponent: React.FC<SavedAddressComponentProps> = ({
  deleteAddress,
  index,
  length,
  address,
}) => {
  const navigation = useNavigation();
  const editPressed = () => {
    navigation.navigate('AddAddress', {title: 'Edit', location: address});
  };
  return (
    <Pressable
      onPress={editPressed}
      style={[styles.addressCard, ]}
      >
      <View
        style={styles.addressContainer}>
        <SvgXml xml={orangeLocation} height={24} width={24} />
        <View style={styles.addressCardDiv}>
          <Text
            style={styles.addressName}>
            {address.addressName}
          </Text>
          <Text
          numberOfLines={2}
            style={styles.addressDiscription}>
            {`${address.addressLine1},${address.landmark},${address.city},${address.state},${address.pincode}`}
          </Text>
        </View>
      </View>
      <View style={styles.editDeleteContainer}>
        <Pressable onPress={editPressed}>
          <SvgXml xml={edit} height={24} width={24} />
        </Pressable>
        <Pressable onPress={deleteAddress}>
          <SvgXml xml={deleteIcon} height={24} width={24} />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default SavedAddressComponent;
