import React from 'react';
import {View, Text, ChevronRightIcon} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';
import {scaleFontSize} from '../../assets/scaling';

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
      <View bg="white" padding={5} flexDir="row" alignItems="center" mb={0.5}>
        <SvgXml xml={iconSVG} width={18} height={18} />
        <Text
          fontFamily={'Inter'}
          fontSize={scaleFontSize(14)}
          fontWeight={400}
          ml={2}>
          {name}
        </Text>
        <View flex={1} alignItems="flex-end">
          <ChevronRightIcon color="primary.500" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsOption;
