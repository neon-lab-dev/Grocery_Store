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
  onSelect: (option: string) => void;
}
const Radio: React.FC<RadioProps> = ({options, onSelect}) => {
  const [selectedOption, setSelectedOption] = React.useState('default');

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
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
                selectedOption === option.value ? '#22C55E' : 'white',
              borderWidth: selectedOption === option.value ? 4 : 1,
              borderColor:
                selectedOption === option.value ? '#E5E7EB' : '#22C55E',
              marginHorizontal: horizontalScale(15),
              marginVertical: verticalScale(2),
            }}
          />
          <Text
            fontFamily={'Inter_Medium'}
            fontSize={scaleFontSize(16)}
            color={
              selectedOption === option.value ? 'accent.700' : 'accent.400'
            }>
            {option.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Radio;
