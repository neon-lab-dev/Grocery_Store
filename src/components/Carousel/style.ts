import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/scaling';
import {width} from '../../assets/scaling';
import {Colors} from '../../constants/colors';
export const styles = StyleSheet.create({
  carouselItem: {},
  img: {
    width: width < 380 ? 285 : 330,
    marginLeft: horizontalScale(18),
    height: width < 380 ? 195 : 225,
    borderRadius: 25,
  },
  container: {
    margin: 5,
  },
  item: {
    padding: 10,
    marginHorizontal: horizontalScale(5),
    borderRadius: 15,
    backgroundColor: '#fbf9f9',
    width: 370,
    height: 110,
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    fontSize: scaleFontSize(16),
    marginHorizontal: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: Colors.primary[400],
    opacity: 0.7,
  },
  dotText: {
    width: 50,
    height: 24,
    borderRadius: 12,
    marginHorizontal: horizontalScale(2),
    backgroundColor: Colors.primary[400],
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  step4: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
  },
  dotFlex: {flexDirection: 'row', alignSelf: 'center', alignItems: 'center'},
  imageCon: {height: 70, width: 50},
  imgSize: {height: '100%', width: '100%'},
  step4Flex: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
  },
  step4DotFlex: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  step3Con: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
  },
  point1Cont: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
  },
  img1Con: {height: 70, width: 50},
  step1Text: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
  },
  pic1Size: {height: '100%', width: '100%', margin: 2},
  step2Text: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
  },
});
