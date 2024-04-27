import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {goBackIcon} from '../../assets/images/icons/goBackIcon';
import {horizontalScale} from '../../assets/scaling';
import {Pressable} from 'native-base';

interface GoBack {
  onPress: () => void;
}

const GoBack: React.FC<GoBack> = ({onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <SvgXml
        xml={goBackIcon}
        height={22}
        width={20}
        style={{marginLeft: horizontalScale(20)}}
      />
    </Pressable>
  );
};

export default GoBack;
