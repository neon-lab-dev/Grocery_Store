import React, {FC} from 'react';
import {Image, TextInput, View} from 'react-native';
import {styles} from './style';

interface SearchInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
}

const SearchInput: FC<SearchInputProps> = ({
  onChangeText,
  value,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icons/search.png')} />
      <TextInput
        style={styles.searchInput}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
      {/* <View style={styles.line} /> */}
      {/* <Image source={require('../../assets/images/icons/mic.png')} /> */}
    </View>
  );
};

export default SearchInput;
