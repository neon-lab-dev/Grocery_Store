import {Text, View} from 'native-base';
import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {sampleImage} from '../../assets/images/icons/Rectangle';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

export const SingleOrderCard: React.FC = () => {
  return (
    <View
      bg={'white'}
      flexDir={'row'}
      py={verticalScale(10)}
      px={horizontalScale(20)}
      alignItems={'center'}
      mb={horizontalScale(1)}>
      <SvgXml xml={sampleImage} width={48} height={48} />
      <View flexShrink={1} ml={horizontalScale(10)}>
        <Text
          fontFamily={'Inter_Regular'}
          fontSize={scaleFontSize(14)}
          color={'accent.800'}
          numberOfLines={2}>
          Cadbury Bournville Rich Cocoa 70% Dark
        </Text>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(12)}
          color={'accent.400'}>
          200g
        </Text>
      </View>
      <View ml={horizontalScale(60)} alignItems={'center'}>
        <Text
          fontFamily={'Inter_Medium'}
          fontSize={scaleFontSize(16)}
          color={'primary.500'}
          mb={-verticalScale(3)}>
          ₹42
        </Text>
        <Text
          fontFamily={'Inter_Regualar'}
          fontSize={scaleFontSize(12)}
          color={'accent.400'}
          strikeThrough>
          ₹58
        </Text>
      </View>
    </View>
  );
};
