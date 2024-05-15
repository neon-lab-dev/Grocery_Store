import {Text, View} from 'native-base';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {checked} from '../../assets/images/icons/check';
import {scaleFontSize} from '../../assets/scaling';

interface CheckboxProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <View>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => {
            if (selectedOption === option) {
              onSelect('');
            } else {
              onSelect(option);
            }
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            alignItems={'center'}
            justifyContent={'center'}
            w={5}
            h={5}
            borderRadius={4}
            borderWidth={2}
            borderColor={
              selectedOption === option ? 'accent.600' : 'accent.400'
            }
            bgColor={'transparent'}
            mr={3}
            my={1}>
            {selectedOption === option && (
              <SvgXml xml={checked} height={12} width={12} />
            )}
          </View>
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(16)}
            color={selectedOption === option ? 'accent.600' : 'accent.400'}
            lineHeight={19.36}
            letterSpacing={-0.04}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Checkbox;
