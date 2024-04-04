import * as React from 'react';
import {View, Text, Pressable} from 'native-base';
import Delivered from '../../components/Delivered';

interface OrderComponentProps {
  onPress?: () => void;
}

export const OrderComponent: React.FC<OrderComponentProps> = ({onPress}) => {
  return (
    <Pressable p={4} bg={'white'} mb={1} onPress={onPress}>
      <View flexDir={'row'}>
        <Text numberOfLines={2} flexShrink={1}>
          Cadbury Bournville Rich Cocoa 70% Dark
        </Text>
        <Text ml={100}>₹87.49</Text>
      </View>
      <View
        borderStyle={'dashed'}
        borderWidth={0.5}
        borderRadius={1}
        borderColor={'accent.100'}
        my={2}
      />
      <View flexDir={'row'} justifyContent={'space-between'}>
        <View>
          <Text fontSize={12} flexShrink={1} color={'accent.400'}>
            Order #897JDHK39392
          </Text>
          <Text fontSize={12} flexShrink={1} color={'accent.400'}>
            25/02/24 at 09:00pm
          </Text>
        </View>
        <Delivered />
      </View>
    </Pressable>
  );
};
