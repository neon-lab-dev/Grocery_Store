import React from 'react';
import {View, Text} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {rightOrangeArrowIcon} from '../../assets/images/icons/rightOrangeArrow';

interface SettingsOptionProps {
  name: string;
  iconSVG: string;
  onPress: () => void;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({
  name,
  iconSVG,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        bg="white"
        px={horizontalScale(20)}
        py={verticalScale(20)}
        flexDir="row"
        alignItems="center"
        borderBottomColor={'accent.100'}
        borderBottomWidth={1}>
        <SvgXml xml={iconSVG} width={18} height={18} />
        <Text
          fontFamily={'Inter_Regular'}
          fontSize={scaleFontSize(14)}
          color={'accent.800'}
          ml={horizontalScale(10)}>
          {name}
        </Text>
        <View flex={1} alignItems="flex-end">
          <SvgXml xml={rightOrangeArrowIcon} width={9} height={15} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsOption;
