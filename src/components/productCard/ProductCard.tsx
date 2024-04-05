import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './style';
import ProductData from '../../assets/data/ProductData';
import {Colors} from '../../constants/colors';

interface ProductCardProps {
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({onPress}) => {
  return (
    <View style={styles.Container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ProductData.map(data => {
          return (
            <View key={data.id}>
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: Colors.accent[100],
                  height: 150,
                  width: 120,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    backgroundColor: Colors.primary[500],
                    height: 42,
                    width: 40,
                    marginLeft: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}></View>
                <Image source={{uri: data.image}} style={styles.Image} />
              </TouchableOpacity>
              <Text style={styles.Title}>{data.Title}</Text>
              <Text>{data.Quantity}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.Price}>₹{data.Price}</Text>
                  <Text>₹{data.DisPrice}</Text>
                  <View style={styles.cutLine} />
                </View>
                <TouchableOpacity style={styles.Button} onPress={onPress}>
                  <Text style={styles.ButtonText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProductCard;
