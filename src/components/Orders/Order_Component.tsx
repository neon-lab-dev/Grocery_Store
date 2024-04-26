import * as React from 'react';
import {View, Text, Pressable} from 'native-base';
import Delivered from '../Delivered';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

interface OrderComponentProps {
  onPress?: () => void;
  index: number;
  length: number;
}

export const OrderComponent: React.FC<OrderComponentProps> = ({
  onPress,
  index,
  length,
}) => {
  return (
    <Pressable
      px={horizontalScale(20)}
      py={verticalScale(10)}
      bg={'white'}
      borderBottomWidth={index === length ? 0 : 1}
      borderBottomColor={'accent.200'}
      onPress={onPress}>
      <View
        flexDir={'row'}
        justifyContent={'space-between'}
        my={verticalScale(5)}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          color={'accent.800'}
          numberOfLines={2}
          flexShrink={1}>
          Cadbury Bournville Rich Cocoa 70% Dark
        </Text>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          color={'accent.800'}
          ml={horizontalScale(70)}>
          ₹87.49
        </Text>
      </View>
      <View
        borderStyle={'dashed'}
        borderWidth={1}
        borderColor={'#F3F4F6'}
        mb={verticalScale(5)}
      />
      <View
        flexDir={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <View>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(12)}
            flexShrink={1}
            color={'accent.400'}>
            Order #897JDHK39392
          </Text>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(12)}
            flexShrink={1}
            color={'accent.400'}>
            25/02/24 at 09:00pm
          </Text>
        </View>
        <Delivered />
      </View>
    </Pressable>
  );
};
