import React, {FC} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './style';

interface SearchInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  onPress: () => void;
  editable: boolean;
  width: number;
}

const SearchInput: FC<SearchInputProps> = ({
  onChangeText,
  value,
  placeholder,
  onPress,
  editable,
  width,
}) => {
  return (
    <TouchableOpacity
      onPressIn={onPress}
      style={[styles.container, {width: `${width}%`}]}>
      <Image source={require('../../assets/images/icons/search.png')} />
      <TextInput
        style={styles.searchInput}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#6B7280'}
        editable={editable}
      />
      {/* <View style={styles.line} /> */}
      {/* <Image source={require('../../assets/images/icons/mic.png')} /> */}
    </TouchableOpacity>
  );
};

export default SearchInput;
