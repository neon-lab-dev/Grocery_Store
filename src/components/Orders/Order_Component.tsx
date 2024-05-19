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
  data,
  onPress,
  index,
  length,
}) => {
  console.log('data', data);
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
          flexShrink={1}
          lineHeight={16.94}
          letterSpacing={-0.04}>
          {data.name}{' '}
          {data.discountPercent !== 0 && `${data.discountPercent} %`}
        </Text>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(14)}
          color={'accent.800'}
          ml={horizontalScale(70)}
          lineHeight={16.94}
          letterSpacing={-0.04}>
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
            color={'accent.400'}
            lineHeight={14.52}
            letterSpacing={-0.04}>
            Order #897JDHK39392
          </Text>
          <Text
            fontFamily={'Inter_Regular'}
            fontSize={scaleFontSize(12)}
            flexShrink={1}
            color={'accent.400'}
            lineHeight={14.52}
            letterSpacing={-0.04}>
            25/02/24 at 09:00pm
          </Text>
        </View>
        <Delivered />
      </View>
    </Pressable>
  );
};
