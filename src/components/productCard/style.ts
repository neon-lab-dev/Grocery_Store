import {StyleSheet} from 'react-native';
import { Colors } from '../../constants/colors';
export const styles = StyleSheet.create({
    Container: {
      width: '100%',
      margin: 5,
    },
    Image: {
      width: '100%',
      height: 150,
    },
    Title: {
      fontSize: 18,
      color: 'black'
    },
    Price: {
      fontSize: 16,
      color: 'black'
    },
    Button: {
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: Colors.primary[400],
      marginHorizontal:35
      
    },
    ButtonText: {
      color: Colors.primary[400],
      fontSize: 16,
    },
  });