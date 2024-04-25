import {Center, Text, ICenterProps} from 'native-base';
import * as React from 'react';
import {scaleFontSize} from '../assets/scaling';

const Delivered: React.FC<ICenterProps> = props => {
  return (
    <Center {...props} rounded={8} bg={'success.400'} w={'auto'} px={2}>
      <Text
        fontFamily={'Inter'}
        fontSize={scaleFontSize(12)}
        fontWeight={500}
        color={'white'}>
        Delivered
      </Text>
    </Center>
  );
};

export default Delivered;
