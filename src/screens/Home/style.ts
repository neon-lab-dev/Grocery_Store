import {Dimensions, StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../assets/scaling';
import { Colors } from '../../constants/colors';
const { width, height } = Dimensions.get('window');

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
    marginTop:verticalScale(12),
  },
  SubCategoryText:{
   fontWeight:"400",
   fontSize:scaleFontSize(16),
  },
  ExploreCatgories:{
    height:'100%', 
    width:(width<370)?(84):(92),
  },
  ExploreCatgoriesText:{
    fontSize: (width<370)?(10):(12),
    color: Colors.accent[600],
    fontWeight:'500',
    alignSelf:'center',
    right:verticalScale(2),
    marginVertical:verticalScale (5),
    marginBottom:40
  },
  floatingButton:{
    position: 'absolute',
    bottom: verticalScale(1),
    right: horizontalScale(20),
    width: (width<370)?(70):(72),
    height:(width<370)?(70):(72),
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});

export default style;
