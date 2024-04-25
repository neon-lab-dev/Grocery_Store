import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../assets/scaling';
import { Colors } from '../../constants/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor:"white"
  },
  Category:{
   marginLeft:horizontalScale(18),
  },
  CategoryText:{
    color:Colors.accent[700],
    fontWeight:"600",
    fontSize:scaleFontSize(20),
    marginTop:verticalScale(22),
  },
  SubCategoryText:{
   fontWeight:"400",
   fontSize:scaleFontSize(16),
  },
  ExploreCatgories:{
   height:"100%",
   width:horizontalScale(78),
  },
  ExploreCatgoriesText:{
    fontSize: scaleFontSize(11),
    color: Colors.accent[600],
    fontWeight:'500',
    alignSelf:'center',
    marginVertical:verticalScale (5)

  },
  floatingButton:{
    position: 'absolute',
    bottom: verticalScale(1),
    right: horizontalScale(20),
    width: horizontalScale(60),
    height: verticalScale(48),
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});

export default style;
