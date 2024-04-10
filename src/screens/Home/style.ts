import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
import { Colors } from '../../constants/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal:horizontalScale(15),
    position: 'relative'
  },
  Category:{
   marginLeft:horizontalScale(18),
  },
  CategoryText:{
    color:Colors.accent[700],
    fontWeight:"600",
    fontSize:scaleFontSize(20),
    marginTop:30,
  },
  SubCategoryText:{
   fontWeight:"400",
   fontSize:scaleFontSize(16),
  },
  ExploreCatgories:{
   height:"100%",
   width:85,
  },
  ExploreCatgoriesText:{
    fontSize: scaleFontSize(12),
    color: Colors.accent[600],
    fontWeight:'500',
    alignSelf:'flex-start',
    marginTop:15
  },

  floatingButton:{
    position: 'absolute',
    bottom: 8,
    right: 20,
    width: 70,
    height: 70,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});

export default style;
