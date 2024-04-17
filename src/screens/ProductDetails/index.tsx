import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductData from '../../assets/data/ProductData';
import ProductCard from '../../components/productCard/ProductCard';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling.ts';
import {styles} from './style.ts';

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
          fontSize: scaleFontSize(16),
          fontWeight: '400',
          color: '#1F2937',
        }}>
        {item.kg}Kg
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: scaleFontSize(16),
            marginHorizontal: horizontalScale(5),
            fontWeight: '600',
            color: '#1F2937',
          }}>
          ₹{item.Newprice}
        </Text>
        <Text
          style={{
            textDecorationLine: 'line-through',
            fontSize: scaleFontSize(12),
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
        style={{width: horizontalScale(32), height: verticalScale(32)}}
      />
    </TouchableOpacity>
  );
};

const ProductDetails: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number>(1);
  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  return (
    <>
      <ScrollView style={{flex: 1}}>
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
            <View style={{marginVertical: verticalScale(20)}}>
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
        <View
          style={{
            // paddingHorizontal: horizontalScale(16),
            backgroundColor: '#FFFFFF',
          }}>
          {/* Item Name Container*/}
          <View style={styles.nameContainer}>
            <Text style={styles.itemName}>Desi Tomato (Nattu Thakkali)</Text>
          </View>
          {/* Units & cut-off Price */}
          <View>
            <View
              style={{
                width: horizontalScale(430),
                height: verticalScale(100),
                justifyContent: 'center',
                paddingHorizontal: horizontalScale(15),
              }}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontSize: scaleFontSize(16),
                  fontWeight: '500',
                  color: '#1F2937',
                  marginVertical: verticalScale(9),
                }}>
                Select Unit
              </Text>
              <FlatList
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
                fontSize: scaleFontSize(16),
                fontWeight: '500',
                color: '#1F2937',
                marginTop: verticalScale(10),
              }}>
              Product Details
            </Text>
            <Text
              style={{
                fontSize: scaleFontSize(14),
                fontWeight: '500',
                marginVertical: verticalScale(5),
                fontFamily: 'Inter',
                color: '#4B5563',
                // paddingHorizontal: horizontalScale(15),
              }}>
              Description
            </Text>
            <Text
              style={{
                fontSize: scaleFontSize(14),
                fontWeight: '500',
                color: '#4B5563',
              }}>
              {data.description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: horizontalScale(15),
            }}>
            <Text style={[styles.descriptionTitle, {color: '#F97316'}]}>
              View less details
            </Text>
            <Image
              source={require('../../assets/images/icons/arrow_drop_down.png')}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginVertical: verticalScale(20),
              paddingHorizontal: horizontalScale(15),
            }}>
            <Text style={styles.itemName}>Similar Products</Text>
          </View>
          <FlatList
            contentContainerStyle={{
              marginVertical: verticalScale(5),
              marginRight: horizontalScale(5),
            }}
            horizontal
            data={ProductData}
            renderItem={({item}) => (
              <ProductCard onPress={() => {}} key={item.id} products={item} />
            )}
          />
          <View
            style={{
              flex: 1,
              marginVertical: verticalScale(10),
              paddingHorizontal: horizontalScale(15),
            }}>
            <Text style={styles.itemName}>People also Bought</Text>
          </View>
          <FlatList
            contentContainerStyle={{
              marginVertical: verticalScale(10),
              paddingBottom: 20,
            }}
            horizontal
            data={ProductData}
            renderItem={({item}) => (
              <ProductCard onPress={() => {}} key={item.id} products={item} />
            )}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ProductDetails;
