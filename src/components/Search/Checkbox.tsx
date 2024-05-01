import {Text, View} from 'native-base';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {checked} from '../../assets/images/icons/check';
import {scaleFontSize} from '../../assets/scaling';

interface CheckboxProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const handleToggle = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];
    onChange(updatedOptions);
  };

  return (
    <View>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => handleToggle(option)}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            alignItems={'center'}
            justifyContent={'center'}
            w={5}
            h={5}
            borderRadius={4}
            borderWidth={2}
            borderColor={
              selectedOptions.includes(option) ? 'accent.600' : 'accent.400'
            }
            bgColor={'transparent'}
            mr={3}
            my={1}>
            {selectedOptions.includes(option) && (
              <SvgXml xml={checked} height={12} width={12} />
            )}
          </View>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(16)}
            color={
              selectedOptions.includes(option) ? 'accent.600' : 'accent.400'
            }>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Checkbox;
