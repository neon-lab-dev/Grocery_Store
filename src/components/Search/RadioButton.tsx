import {Text, View} from 'native-base';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
interface RadioProps {
  options: {id: string; label: string; value: string}[];
  selectedValue: string;
  onSelect: (option: string) => void;
}
const Radio: React.FC<RadioProps> = ({options, selectedValue, onSelect}) => {
  const handleSelectOption = (option: string) => {
    onSelect(option);
  };
  return (
    <View>
      {options.map(option => (
        <View key={option.id} flexDir={'row'} alignItems={'center'}>
          <TouchableOpacity
            onPress={() => handleSelectOption(option.value)}
            style={{
              width: 24,
              height: 24,
              borderRadius: 100,
              backgroundColor:
                selectedValue === option.value ? '#22C55E' : 'white',
              borderWidth: selectedValue === option.value ? 4 : 1,
              borderColor:
                selectedValue === option.value ? '#E5E7EB' : '#22C55E',
              marginHorizontal: horizontalScale(15),
              marginVertical: verticalScale(4),
            }}
          />
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(16)}
            color={selectedValue === option.value ? 'accent.700' : 'accent.400'}
            lineHeight={19.36}
            letterSpacing={-0.04}>
            {option.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Radio;
