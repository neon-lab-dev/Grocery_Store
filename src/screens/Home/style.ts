import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin:5
  },
  CategoryText:{
    color:"black",
    fontWeight:"bold",
    fontSize:scaleFontSize(17)
  }
});

export default style;
