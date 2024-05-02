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
import SearchProductCard from '../productCard/SearchResultProductCard';
import {SvgXml} from 'react-native-svg';
import {close} from '../../assets/images/icons/close';

interface ProductsSpecialOverlayProps {
  Close: () => void;
  onPress: () => void;
}

const ProductsSpecialOverlay: React.FC<ProductsSpecialOverlayProps> = ({
  Close,
  onPress,
}) => {
  const [text, setText] = useState<string>('');

  return (
    <View style={{flex: 1}}>
      <View style={styles.selectAddressBox}>
        <Text style={styles.freshlyPickedText}>Freshly Picked Items</Text>
        <Pressable onPress={() => Close()}>
          <SvgXml xml={close} height={24} width={24} />
        </Pressable>
      </View>
      <View style={{alignItems: 'center', marginVertical: verticalScale(2)}}>
        <SearchInput
          onChangeText={setText}
          value={text}
          placeholder='Search "Beard"'
          editable
          width={90}
          onPress={() => {}}
        />
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: verticalScale(30)}}
        columnWrapperStyle={{
          paddingHorizontal: horizontalScale(15),
          gap: horizontalScale(10),
          marginBottom: verticalScale(10),
        }}
        ItemSeparatorComponent={() => (
          <View style={{marginVertical: verticalScale(10)}} />
        )}
        numColumns={2}
        data={ProductData}
        renderItem={({item}) => (
          <SearchProductCard products={item} key={item.id} onPress={onPress} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default ProductsSpecialOverlay;
