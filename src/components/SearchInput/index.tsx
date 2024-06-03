import React, {FC} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {searchIcon} from '../../assets/images/icons/searchIcon';

interface SearchInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  onPress: () => void;
  editable: boolean;
  width: number;
  onSubmit?: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({
  onChangeText,
  value,
  placeholder,
  onPress,
  editable,
  width,
  onSubmit,
}) => {
  return (
    <TouchableOpacity
      onPressIn={onPress}
      style={[styles.container, {width: `${width}%`}]}>
      <SvgXml xml={searchIcon} height={24} width={24} />
      <TextInput
        style={styles.searchInput}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#6B7280'}
        editable={editable}
        onSubmitEditing={() => onSubmit && onSubmit(value)}
      />
      {/* <View style={styles.line} /> */}
      {/* <Image source={require('../../assets/images/icons/mic.png')} /> */}
    </TouchableOpacity>
  );
};

export default SearchInput;
