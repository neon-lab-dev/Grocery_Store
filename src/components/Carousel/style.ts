import {StyleSheet} from 'react-native';
import { horizontalScale, verticalScale } from '../../assets/scaling';
import {width} from '../../assets/scaling';
export const styles = StyleSheet.create({
    carouselItem: {

    },
    img: {
      width:(width<380)?(285):(315),
      marginLeft:horizontalScale(18),
      height: (width<380)?(152):(160),
      borderRadius: 25,
    },
  });