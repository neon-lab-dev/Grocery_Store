import {Center, Text, ICenterProps} from 'native-base';
import * as React from 'react';
import {horizontalScale, scaleFontSize, verticalScale} from '../assets/scaling';

const Delivered: React.FC<ICenterProps> = props => {
  return (
    <Center
      {...props}
      rounded={4}
      h={verticalScale(15)}
      bg={'success.400'}
      px={horizontalScale(5)}>
      <Text
        fontFamily={'Inter_Medium'}
        fontSize={scaleFontSize(12)}
        color={'white'}>
        Delivered
      </Text>
    </Center>
  );
};

export default Delivered;
