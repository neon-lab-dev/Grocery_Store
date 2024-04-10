import React, {FC} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './style';

interface SearchInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  onPress: () => void;
  editable: boolean;
}

const SearchInput: FC<SearchInputProps> = ({
  onChangeText,
  value,
  placeholder,
  onPress,
  editable,
}) => {
  return (
    <TouchableOpacity onPressIn={onPress}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/icons/search.png')} />
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          editable={editable}
        />
        {/* <View style={styles.line} /> */}
        {/* <Image source={require('../../assets/images/icons/mic.png')} /> */}
      </View>
    </TouchableOpacity>
  );
};

export default SearchInput;
