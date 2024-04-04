import {Center, Text, ICenterProps} from 'native-base';
import * as React from 'react';

const Delivered: React.FC<ICenterProps> = props => {
  return (
    <Center {...props} rounded={8} bg={'success.400'} w={'auto'} px={2}>
      <Text fontSize={'fs12'} color={'white'}>
        Delivered
      </Text>
    </Center>
  );
};

export default Delivered;
