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

interface SavedAddressComponentProps {
  gotoAddAddress: () => void;
  deleteAddress: () => void;
}

const SavedAddressComponent: React.FC<SavedAddressComponentProps> = ({
  gotoAddAddress,
  deleteAddress,
}) => {
  return (
    <View
      w={'100%'}
      bg={'white'}
      flexDir={'row'}
      px={horizontalScale(20)}
      py={verticalScale(20)}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <View flexDir={'row'} alignItems={'center'}>
        <SvgXml xml={orangeLocation} height={24} width={24} />
        <View width={horizontalScale(170)} ml={horizontalScale(10)}>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(16)}
            color={'accent.900'}>
            Home
          </Text>
          <Text
            color={'accent.400'}
            numberOfLines={2}
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(14)}>
            Lorem ipsum dolor sit amet consectetur. Et at lectus congue ut
            sagittis sed dui. Aliquet porta sed diam tellus.
          </Text>
        </View>
      </View>
      <View flexDir={'row'}>
        <Pressable onPress={gotoAddAddress}>
          <SvgXml xml={edit} height={24} width={24} />
        </Pressable>
        <View w={5} />
        <Pressable onPress={deleteAddress}>
          <SvgXml xml={deleteIcon} height={24} width={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default SavedAddressComponent;
