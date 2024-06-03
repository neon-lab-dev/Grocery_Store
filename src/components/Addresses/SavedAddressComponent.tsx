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
interface SavedAddressComponentProps {
  gotoAddAddress: () => void;
  deleteAddress: () => void;
  index: number;
  length: number;
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
    <View
      w={'100%'}
      bg={'white'}
      flexDir={'row'}
      px={horizontalScale(20)}
      py={verticalScale(15)}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderBottomWidth={index === length ? 0 : 1}
      borderBottomColor={'accent.100'}>
      <View
        flexDir={'row'}
        alignItems={'center'}
        style={{gap: horizontalScale(12)}}>
        <SvgXml xml={orangeLocation} height={24} width={24} />
        <View width={horizontalScale(180)} style={{gap: horizontalScale(4)}}>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(16)}
            color={'accent.900'}
            lineHeight={19.36}
            letterSpacing={-0.04}>
            {address.addressName}
          </Text>
          <Text
            color={'accent.400'}
            numberOfLines={2}
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}
            lineHeight={16.8}
            letterSpacing={-0.03}>
            {`${address.addressLine1},${address.landmark},${address.city},${address.state},${address.pincode}`}
          </Text>
        </View>
      </View>
      <View flexDir={'row'} style={{gap: horizontalScale(32)}}>
        <Pressable onPress={editPressed}>
          <SvgXml xml={edit} height={24} width={24} />
        </Pressable>
        <Pressable onPress={deleteAddress}>
          <SvgXml xml={deleteIcon} height={24} width={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default SavedAddressComponent;
