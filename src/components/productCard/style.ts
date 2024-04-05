import {StyleSheet} from 'react-native';
import { Colors } from '../../constants/colors';
export const styles = StyleSheet.create({
    Container: {
      width: '100%',
      margin: 5,
    },
    Image: {
      width: 80,
      height: 100,
      alignSelf:'center'
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
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors.primary[400],
      marginHorizontal:25
      
    },
    ButtonText: {
      color: Colors.primary[400],
      fontSize: 14,
    },
    cutLine: {
      position: 'absolute',
      top: '75%',
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: '#333',
      zIndex: 0,}
  });