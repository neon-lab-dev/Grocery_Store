import React, {FC} from 'react';
import {Image, TextInput, View} from 'react-native';
import {styles} from './style';

interface SearchInputProps {
  // Add any props here
}

const SearchInput: FC<SearchInputProps> = ({...props}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/icons/search.png')} />
      <TextInput style={styles.searchInput} {...props} />
      <View style={styles.line} />
      <Image source={require('../../assets/images/icons/mic.png')} />
    </View>
  );
};

export default SearchInput;
