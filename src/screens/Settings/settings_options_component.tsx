import React from 'react';
import {View, Text, ChevronRightIcon} from 'native-base';
import {SvgXml} from 'react-native-svg';

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
    <View bg="white" padding={5} flexDir="row" alignItems="center" mb={0.5}>
      <SvgXml xml={iconSVG} width={18} height={18} />
      <Text ml={2}>{name}</Text>
      <View flex={1} alignItems="flex-end">
        <ChevronRightIcon color="primary.500" onPress={onPress} />
      </View>
    </View>
  );
};

export default SettingsOption;
