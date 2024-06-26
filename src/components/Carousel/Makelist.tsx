import React from 'react';
import {View, ScrollView, Text, Image} from 'react-native';

import {styles} from './style';

const Makelist: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.item}>
          <View style={styles.point1Cont}>
            <View>
              <Text style={styles.title}>1.Make Your Grocery List</Text>
              <Text style={styles.description}>
                Write down all the things you need to buy in a piece of paper
              </Text>
            </View>
            <View style={styles.img1Con}>
              <Image
                style={styles.imgSize}
                source={require('../../assets/images/Carousel/shopping-list1.png')}
              />
            </View>
          </View>
          <View style={styles.step4DotFlex}>
            <View style={styles.dotText}>
              <Text style={styles.step1Text}>Step 1</Text>
            </View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.point1Cont}>
            <View>
              <Text style={styles.title}>2.Take a Picture</Text>
              <Text style={styles.description}>
                Use your phone to snap a photo of your list
              </Text>
            </View>
            <View style={styles.img1Con}>
              <Image
                style={styles.pic1Size}
                source={require('../../assets/images/Carousel/shutter-photo1.png')}
              />
            </View>
          </View>
          <View style={styles.step4DotFlex}>
            <View style={styles.dot}></View>
            <View style={styles.dotText}>
              <Text style={styles.step2Text}>Step 2</Text>
            </View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.point1Cont}>
            <View>
              <Text style={styles.title}>3.Uplaod the Picture</Text>
              <Text style={styles.description}>
                Share the photo of your list with us
              </Text>
            </View>
            <View style={styles.imageCon}>
              <Image
                style={styles.imgSize}
                source={require('../../assets/images/Carousel/upload1.png')}
              />
            </View>
          </View>
          <View style={styles.step4DotFlex}>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dotText}>
              <Text style={styles.step3Con}>Step 3</Text>
            </View>
            <View style={styles.dot}></View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.step4Flex}>
            <View>
              <Text style={styles.title}>4.Wait for Delivery</Text>
              <Text style={styles.description}>
                Your order will be delivered to your door soon.
              </Text>
            </View>
            <View style={styles.imageCon}>
              <Image
                style={styles.imgSize}
                source={require('../../assets/images/Carousel/online-shopping1.png')}
              />
            </View>
          </View>
          <View style={styles.dotFlex}>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dotText}>
              <Text style={styles.step4}>Step 4</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     margin: 5,
//   },
//   item: {
//     padding: 10,
//     marginHorizontal: horizontalScale(5),
//     borderRadius: 15,
//     backgroundColor: '#fbf9f9',
//     width: 370,
//     height: 110,
//   },
//   title: {
//     fontSize: 22,
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: scaleFontSize(16),
//     marginHorizontal: 10,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 2,
//     backgroundColor: Colors.primary[400],
//     opacity: 0.7,
//   },
//   dotText: {
//     width: 50,
//     height: 24,
//     borderRadius: 12,
//     marginHorizontal: horizontalScale(2),
//     backgroundColor: Colors.primary[400],
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   step4: {
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'center',
//     color: 'white',
//   },
//   dotFlex: {flexDirection: 'row', alignSelf: 'center', alignItems: 'center'},
//   imageCon: {height: 70, width: 50},
//   imgSize: {height: '100%', width: '100%'},
//   step4Flex: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'space-around',
//   },
//   step4DotFlex: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
//   step3Con: {
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'center',
//     color: 'white',
//   },
//   point1Cont: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'space-around',
//   },
//   img1Con: {height: 70, width: 50},
//   step1Text: {
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'center',
//     color: 'white',
//   },
//   pic1Size: {height: '100%', width: '100%', margin: 2},
//   step2Text: {
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'center',
//     color: 'white',
//   },
// });

export default Makelist;
