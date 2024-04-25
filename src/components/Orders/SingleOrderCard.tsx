import {Text, View} from 'native-base';
import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {sampleImage} from '../../assets/images/icons/Rectangle';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';

export const SingleOrderCard: React.FC = () => {
  return (
    <View
      bg={'white'}
      flexDir={'row'}
      py={3}
      px={5}
      alignItems={'center'}
      mb={1}>
      <SvgXml xml={sampleImage} width={48} height={48} />
      <View flexShrink={1} ml={2}>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(14)}
          fontWeight={400}
          color={'accent.800'}
          numberOfLines={2}>
          Cadbury Bournville Rich Cocoa 70% Dark
        </Text>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(12)}
          fontWeight={500}
          color={'accent.400'}>
          200g
        </Text>
      </View>
      <View ml={horizontalScale(50)} alignItems={'center'}>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(16)}
          fontWeight={500}
          color={'primary.500'}>
          ₹42
        </Text>
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(12)}
          fontWeight={400}
          color={'accent.400'}
          strikeThrough>
          ₹58
        </Text>
      </View>
    </View>
  );
};
