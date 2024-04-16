import React, {useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import SearchInput from '../SearchInput';
import ProductCard from '../productCard/ProductCard';
import {styles} from './style';
import ProductData from '../../assets/data/ProductData';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

interface ProductsSpecialOverlayProps {
  Close: () => void;
}

const ProductsSpecialOverlay: React.FC<ProductsSpecialOverlayProps> = ({
  Close,
}) => {
  const [text, setText] = useState<string>('');

  return (
    <View style={{flex: 1}}>
      <View style={styles.selectAddressBox}>
        <Text style={styles.selectAddressText}>Fresly Picked Items</Text>
        <Pressable onPress={() => Close()}>
          <Image source={require('../../assets/images/icons/close.png')} />
        </Pressable>
      </View>
      <View style={{alignItems: 'center', marginVertical: verticalScale(2)}}>
        <SearchInput
          onChangeText={setText}
          value={text}
          placeholder="Search Beard"
        />
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: verticalScale(30)}}
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
          paddingLeft: horizontalScale(13),
        }}
        ItemSeparatorComponent={
          <View style={{marginVertical: verticalScale(10)}} />
        }
        numColumns={2}
        data={ProductData}
        renderItem={({item}) => (
          <ProductCard products={item} key={item.id} onPress={() => {}} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ProductsSpecialOverlay;
