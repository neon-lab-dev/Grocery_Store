import {Center, Text, ICenterProps} from 'native-base';
import * as React from 'react';
import {horizontalScale, scaleFontSize, verticalScale} from '../assets/scaling';

const Delivered: React.FC<ICenterProps> = props => {
  return (
    <Center
      {...props}
      rounded={4}
      py={verticalScale(5)}
      bg={'success.400'}
      px={horizontalScale(6)}>
      <Text
        fontFamily={'Inter_Medium'}
        fontSize={scaleFontSize(12)}
        color={'white'}
        lineHeight={12.1}
        letterSpacing={-0.04}>
        Delivered
      </Text>
    </Center>
  );
};

export default Delivered;
