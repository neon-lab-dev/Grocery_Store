import React from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'native-base';
import {styles} from './style1';
import ProductData from '../../assets/data/ProductData';
import {Colors} from '../../constants/colors';
import {horizontalScale, verticalScale} from '../../assets/scaling';

interface ProductCardProps {
  onPress: () => void;
}

const ProductScroll: React.FC<ProductCardProps> = ({onPress}) => {
  return (
    <View style={styles.Container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ProductData.map(data => {
          let off = ((data.DisPrice - data.Price) / data.DisPrice) * 100;
          return (
            <View
              key={data.id}
              style={{width: horizontalScale(130), height: verticalScale(210)}}>
              <Pressable
                style={{
                  borderRadius: 20,
                  backgroundColor: '#F9FAFB',
                  height: verticalScale(120),
                  width: horizontalScale(120),
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    backgroundColor: Colors.primary[500],
                    height: verticalScale(30),
                    width: horizontalScale(34),
                    marginLeft: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    {off.toFixed(0)}%
                  </Text>
                  <Text
                    style={{
                      alignSelf: 'center',
                      position: 'absolute',
                      top: verticalScale(11),
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    OFF
                  </Text>
                </View>
                <Image
                  alt="Image"
                  source={getImage(data.image)}
                  style={styles.Image}
                />
              </Pressable>
              <Text style={styles.Title}>{data.Title}</Text>
              <Text style={styles.Quantity}>{data.Quantity}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'absolute',
                  top: verticalScale(175),
                }}>
                <View>
                  <Text style={styles.Price}>₹{data.Price}</Text>
                  <Text strikeThrough style={styles.DisPrice}>
                    ₹{data.DisPrice}
                  </Text>
                </View>
                <View>
                  <Pressable style={styles.Button} onPress={onPress}>
                    <Text style={styles.ButtonText}>ADD</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const getImage = (imageName: string) => {
  switch (imageName) {
    case 'item1':
      return require('../../assets/images/Product-Image/Tomato.png');
    case 'item2':
      return require('../../assets/images/Product-Image/Ginger.png');
    default:
      return null;
  }
};
export default ProductScroll;