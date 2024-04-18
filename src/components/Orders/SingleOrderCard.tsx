import {Text, View} from 'native-base';
import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {sampleImage} from '../../assets/images/icons/Rectangle';
import {horizontalScale} from '../../assets/scaling';

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
        <Text fontSize={'fs14'} numberOfLines={2}>
          Cadbury Bournville Rich Cocoa 70% Dark
        </Text>
        <Text fontSize={'fs14'} color={'accent.400'}>
          200g
        </Text>
      </View>
      <View ml={horizontalScale(50)} alignItems={'center'}>
        <Text fontSize={'fs16'} color={'primary.500'}>
          ₹42
        </Text>
        <Text fontSize={'fs12'} color={'accent.400'} strikeThrough>
          ₹58
        </Text>
      </View>
    </View>
  );
};
