import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin:5,
    position: 'relative'
  },
  CategoryText:{
    color:"black",
    fontWeight:"bold",
    fontSize:scaleFontSize(17)
  },
  ExCatg:{
   height:'100%',
   width:95,
  },
  floatingButton:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});

export default style;
