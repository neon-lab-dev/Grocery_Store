import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/scaling';
import {useNavigation} from '@react-navigation/native';

interface AlternativeImage {
  id: number;
  image: any;
}

interface Unit {
  id: number;
  kg: number;
  Newprice: number;
  price: number;
}

interface Data {
  productName: string;
  alternativeImages: AlternativeImage[];
  units: Unit[];
  description: string;
}

interface UnitCardProps {
  item: Unit;
  setSelectedUnit: (id: number) => void;
  selectedUnit: number;
}

interface OtherImagesProps {
  item: AlternativeImage;
  selectedImage: number;
  setSelectedImage: (id: number) => void;
}

interface ProductDetailsProps {
  Close: () => void;
}

const data: Data = {
  productName: 'Desi Tomato (Nattu Thakkali)',
  alternativeImages: [
    {id: 1, image: require('../../assets/images/Vegetables/tomato-lg.png')},
    {id: 2, image: require('../../assets/images/Vegetables/tomato-lg.png')},
    {id: 3, image: require('../../assets/images/Vegetables/tomato-lg.png')},
    {id: 4, image: require('../../assets/images/Vegetables/tomato-lg.png')},
  ],
  units: [
    {id: 1, kg: 1, Newprice: 42, price: 58},
    {id: 2, kg: 2, Newprice: 84, price: 58},
  ],
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit accusamus aliquam ullam odio nulla nisi architecto consectetur officiis voluptates facere, atque et?  Tempora dolorum maiores corporis esse alias voluptas rem. ',
};

const UnitCard: React.FC<UnitCardProps> = ({
  item,
  setSelectedUnit,
  selectedUnit,
}) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedUnit(item.id)}
      style={[
        styles.unitCard,
        {
          borderColor:
            selectedUnit === item.id
              ? 'rgba(249, 115, 22, 1.0)'
              : 'rgba(229, 231, 235, 1.0)',
        },
      ]}>
      <Text
        style={{
          letterSpacing: 2,
          fontSize: 16,
          fontWeight: '400',
          color: '#1F2937',
        }}>
        {item.kg}Kg
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 16,
            marginHorizontal: 5,
            fontWeight: '600',
            color: '#1F2937',
          }}>
          ₹{item.Newprice}
        </Text>
        <Text
          style={{
            textDecorationLine: 'line-through',
            fontSize: 12,
            color: '#9CA3AF',
          }}>
          ₹{item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const OtherImages: React.FC<OtherImagesProps> = ({
  item,
  selectedImage,
  setSelectedImage,
}) => {
  console.log(selectedImage);
  return (
    <TouchableOpacity
      onPress={() => setSelectedImage(item.id)}
      style={[
        styles.renderImageContainer,
        {
          borderColor:
            item.id === selectedImage ? 'rgba(249, 115, 22, 1.0)' : 'white',
        },
      ]}>
      <Image
        source={require('../../assets/images/Vegetables/tomato-lg.png')}
        style={{width: 32, height: 32}}
      />
    </TouchableOpacity>
  );
};

const ProductDetails: React.FC<ProductDetailsProps> = ({Close}) => {
  const [selectedImage, setSelectedImage] = useState(
    data.alternativeImages[0].id,
  );
  const [selectedUnit, setSelectedUnit] = useState(data.units[0].id);
  const navigation = useNavigation();

  const navigateToCart = () => {
    Close();
    navigation.navigate('Cart');
  };
  return (
    <>
      <ScrollView>
        <View style={styles.imageContainer}>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>20%</Text>
            <Text style={styles.percentageText}>OFF</Text>
          </View>
          {/* Images Container  */}
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              style={styles.mainImage}
              source={require('../../assets/images/Vegetables/tomato-lg.png')}
            />
            <View style={{marginVertical: 20}}>
              <FlatList
                horizontal
                data={data.alternativeImages}
                renderItem={({item}) => (
                  <OtherImages
                    item={item}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                )}
              />
            </View>
          </View>
        </View>
        <View style={{backgroundColor: '#F3F4F6'}}>
          {/* Item Name Container*/}
          <View style={styles.nameContainer}>
            <Text style={styles.itemName}>Desi Tomato (Nattu Thakkali)</Text>
          </View>
          {/* Units & cut-off Price */}
          <View>
            <View
              style={{
                width: 430,
                height: 150,
                paddingHorizontal: 10,
                justifyContent: 'center',
                padding: 13,
              }}>
              <Text
                style={{
                  // fontFamily: fonts.Regular,
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#1F2937',
                  marginLeft: 5,
                }}>
                Select Unit
              </Text>
              <FlatList
                contentContainerStyle={{marginVertical: 10}}
                horizontal
                data={data.units}
                renderItem={({item}) => (
                  <UnitCard
                    item={item}
                    selectedUnit={selectedUnit}
                    setSelectedUnit={setSelectedUnit}
                  />
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#1F2937',
                marginTop: 2,
              }}>
              Product Details
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                marginVertical: 5,
                fontFamily: 'Inter',
                color: '#4B5563',
              }}>
              Description
            </Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#4B5563'}}>
              {data.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Container  */}
      <View
        style={{
          height: 100,
          backgroundColor: '#FFFFFF',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 15,
        }}>
        <View>
          <Text
            style={{
              // fontFamily: fonts.Regular,
              color: '#1F2937',
              fontWeight: '400',
            }}>
            1 kg
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={{fontSize: 20, fontWeight: '600', color: '#1F2937'}}>
              ₹42
            </Text>
            <View
              style={{
                width: 55,
                height: 30,
                borderRadius: 4,
                backgroundColor: '#4ADE80',
                padding: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  textAlign: 'center',
                  // fontFamily: fonts.Inter,
                }}>
                6% OFF
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: 131,
            height: 47,
            borderRadius: 12,
            backgroundColor: '#F97316',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#FFF7ED',
            }}>
            Add to Cart
          </Text>
        </View>
        {/* <Pressable > */}
        <Pressable style={styles.floatingButton} onPress={navigateToCart}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/icons/cart-white.png')}
            />
            <Text style={{color: '#ffffff'}}>1 Item</Text>
          </View>
        </Pressable>
        {/* </Pressable> */}
      </View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  imageContainer: {
    // paddingHorizontal: 30,
    width: '100%',
    height: 365,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    // alignItems: 'center',
  },
  mainImage: {
    width: 233,
    height: 183,
  },
  percentageContainer: {
    width: 70,
    height: 65,
    backgroundColor: '#F97316',
    marginLeft: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
  percentageText: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  renderImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 1.5,
    // borderColor: 'rgba(229, 231, 235, 1.0)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  itemName: {
    width: '100%',
    height: 24,
    // fontFamily: fonts.Black,
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  nameContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 0.2,
  },
  unitCard: {
    width: 98,
    height: 65,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  floatingButton: {
    width: horizontalScale(80),
    height: verticalScale(70),
    backgroundColor: '#F97316',
    position: 'absolute',
    left: horizontalScale(240),
    bottom: verticalScale(90),
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
