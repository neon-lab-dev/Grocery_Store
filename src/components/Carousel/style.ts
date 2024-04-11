import {StyleSheet} from 'react-native';
import { horizontalScale, verticalScale } from '../../assets/scaling';
export const styles = StyleSheet.create({
    carouselItem: {

    },
    img: {
      width:horizontalScale(285),
      marginTop: 35,
      marginLeft:horizontalScale(18),
      height: verticalScale(125),
      borderRadius: 25,
    },
  });