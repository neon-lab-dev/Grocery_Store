import {View, Text, ICenterProps} from 'native-base';
import * as React from 'react';
import {horizontalScale, scaleFontSize, verticalScale} from '../assets/scaling';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import {capitalizeFirstLetter} from '../utils/capitalizeWord';

const Delivered: React.FC<IViewProps> = props => {
  const convertFormat = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  return (
    <View
      mr={horizontalScale(5)}
      rounded={4}
      py={verticalScale(5)}
      bg={'success.400'}
      px={horizontalScale(7)}>
      <Text
        fontFamily={'Inter_Medium'}
        fontSize={scaleFontSize(12)}
        color={'white'}
        lineHeight={12.1}
        letterSpacing={-0.04}>
        {convertFormat(props.status)}
      </Text>
    </View>
  );
};

export default Delivered;
