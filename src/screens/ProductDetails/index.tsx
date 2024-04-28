import React, {FC, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../assets/scaling';
import ProductHorizontalScroll from '../../components/productCard/ProductHorizontalScroll';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';

interface AlternativeImageProps {
  img: any;
  id: number;
}

interface UnitCardProps {
  item: {
    id: number;
    kg: number;
    Newprice: number;
    price: number;
  };
}

const ProductDetails: FC<{Close: () => void}> = ({Close}) => {
  const data = {
    productName: 'Desi Tomato (Nattu Thakkali)',
    alternativeImages: [
      {id: 1, image: require('../../assets/images/Vegetables/tomato-lg.png')},
      {id: 2, image: require('../../assets/images/Vegetables/tomato-lg.png')},
      {id: 3, image: require('../../assets/images/Vegetables/tomato-lg.png')},
      {id: 4, image: require('../../assets/images/Vegetables/tomato-lg.png')},
      {id: 5, image: require('../../assets/images/Vegetables/tomato-lg.png')},
      {id: 6, image: require('../../assets/images/Vegetables/tomato-lg.png')},
    ],
    units: [
      {id: 1, kg: 1, Newprice: 42, price: 58},
      {id: 2, kg: 2, Newprice: 84, price: 58},
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit accusamus aliquam ullam odio nulla nisi architecto consectetur officiis voluptates facere, atque et?  Tempora dolorum maiores corporis esse alias voluptas rem. ',
  };

  const [selectedImage, setSelectedImage] = useState<number>(1);
  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [viewMoreDetails, setViewMoreDetails] = useState<boolean>(false);
  const [showCartButton, setShowCartButton] = useState<boolean>(false);

  const AlternativeImage: FC<AlternativeImageProps> = ({img, id}) => {
    return (
      <Pressable
        onPress={() => setSelectedImage(id)}
        style={[
          styles.smImage,
          {borderColor: id === selectedImage ? '#F97316' : '#E5E7EB'},
        ]}>
        <Image source={img} style={{width: 33, height: 33}} />
      </Pressable>
    );
  };

  const UnitCard: FC<UnitCardProps> = ({item}) => {
    return (
      <Pressable
        onPress={() => setSelectedUnit(item.id)}
        style={
          item.id === selectedUnit
            ? styles.selectUnitCardContainer
            : styles.unitCardContainer
        }>
        <Text style={styles.unitCardKgText}>{item.kg} kg</Text>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Text style={styles.unitCardPriceText}>₹{item.Newprice}</Text>
          <Text style={styles.unitCardCutOffprice}>₹{item.price}</Text>
        </View>
      </Pressable>
    );
  };

  const navigation = useNavigation();

  const navigateToCart = () => {
    Close();
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.imageContainer}>
        <View style={styles.offPerContainer}>
          <Text style={styles.percentageText}>20%</Text>
          <Text
            style={[
              styles.percentageText,
              {fontSize: scaleFontSize(20), bottom: verticalScale(3)},
            ]}>
            OFF
          </Text>
        </View>
        <View style={{flex: 1, marginHorizontal: horizontalScale(80)}}>
          <Image
            source={require('../../assets/images/Vegetables/tomato-lg.png')}
          />
        </View>
        <View
          style={{
            width: horizontalScale(245),
            marginHorizontal: horizontalScale(50),
            marginVertical: verticalScale(18),
            marginTop: verticalScale(40),
            flex: 1,
          }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={
              <View style={{marginLeft: horizontalScale(6)}} />
            }
            data={data.alternativeImages}
            renderItem={({item}) => (
              <AlternativeImage img={item.image} id={item.id} />
            )}
            horizontal
          />
        </View>
      </View>
      {/* product details and other options */}
      <View
        style={{backgroundColor: '#FFFFFF', paddingBottom: verticalScale(40)}}>
        {/* product Name */}
        <View
          style={{
            paddingTop: verticalScale(16),
            paddingHorizontal: horizontalScale(24),
            backgroundColor: '#FFFFFF',
            borderBottomWidth: horizontalScale(2),
            borderBottomColor: '#F3F4F6',
            paddingBottom: verticalScale(12),
          }}>
          <Text style={styles.productName}>{data.productName}</Text>
        </View>
        {/* Product units */}
        <View
          style={{
            paddingHorizontal: horizontalScale(24),
            marginTop: verticalScale(15),
          }}>
          <Text style={styles.selectUnitText}>Select Unit</Text>
          <FlatList
            data={data.units}
            renderItem={({item}) => <UnitCard item={item} />}
            horizontal
            contentContainerStyle={{
              marginVertical: verticalScale(15),
              gap: 12,
              marginBottom: verticalScale(19),
            }}
          />
          <Text style={styles.productDetailsText}>Product Details</Text>
          {/* product description */}
          <View style={{marginTop: verticalScale(10), gap: 2}}>
            <Text style={styles.descriptionText}>Description</Text>
            <Text
              numberOfLines={!viewMoreDetails ? 2 : 5}
              style={{
                fontWeight: '400',
                fontSize: scaleFontSize(14),
                color: '#6B7280',
              }}>
              Lorem ipsum dolor sit amet consectetur. Volutpat arcu vitae tellus
              in dui mattis cursus lacus. Amet nisl a urna arcu senectus viverra
              congue adipiscing. Viverra in natoque nec feugiat. Elit laoreet
              amet enim nulla euismod mattis augue.
            </Text>
          </View>
        </View>
        {/* added newly */}
        {/* <View
          style={{
            paddingHorizontal: horizontalScale(24),
            paddingVertical: verticalScale(8),
          }}>
          <Text style={styles.descriptionText}>Key Features</Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: scaleFontSize(14),
              color: '#6B7280',
              marginVertical: horizontalScale(5),
            }}>
            1. Lorem ipsum dolor sit amet consectetur. Senectus maecenas cursus
            id nunc turpis libero viverra amet.
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: scaleFontSize(14),
              color: '#6B7280',
              marginVertical: horizontalScale(5),
            }}>
            2. Egestas aliquam ut pretium aliquam vehicula nec suspendisse in.
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: scaleFontSize(14),
              color: '#6B7280',
              marginVertical: horizontalScale(5),
            }}>
            3. Leo suspendisse dui volutpat ornare montes id luctus. Placerat
            sollicitudin habitant urna aliquet.
          </Text>
        </View> */}
        {/* added newly */}
        <Pressable
          style={styles.viewMore}
          onPress={() => setViewMoreDetails(!viewMoreDetails)}>
          <Text style={styles.viewDetailsText}>
            View <Text>{viewMoreDetails ? 'less' : 'more'}</Text> details
          </Text>
          <Image
            source={require('../../assets/images/icons/arrow_drop_down.png')}
          />
        </Pressable>
        {/* products Listings */}
        <View
          style={{paddingHorizontal: horizontalScale(24), marginVertical: 5}}>
          <Text style={styles.similarProductsText}>Similar Products</Text>
        </View>
        <View
          style={{
            marginVertical: verticalScale(12),
            paddingHorizontal: horizontalScale(5),
          }}>
          <ProductHorizontalScroll onPress={() => {}} />
        </View>
        <View
          style={{paddingHorizontal: horizontalScale(24), marginVertical: 5}}>
          <Text style={styles.similarProductsText}>People also Bought</Text>
        </View>
        <View
          style={{
            marginVertical: verticalScale(12),
            paddingHorizontal: horizontalScale(5),
          }}>
          <ProductHorizontalScroll onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
