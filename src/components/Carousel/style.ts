import {StyleSheet} from 'react-native';
import { horizontalScale } from '../../assets/scaling';
export const styles = StyleSheet.create({
    carouselItem: {
      
    },
    img: {
      width:horizontalScale(300),
      // padding:15,
      marginTop: 35,
      marginLeft:horizontalScale(18),
      height: 180,
      borderRadius: 25,
    },
  });