import 'react-native-gesture-handler';
import React from 'react';
import RootNavigation from './src/navigation/MainNavigation';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/constants/theme';
import Home from './src/screens/Home';
import {FlatList, ScrollView, Text, View} from 'react-native';
import ProductCard from './src/components/productCard/ProductCard';
import ProductData from './src/assets/data/ProductData';
import ProductDetails from './src/screens/ProductDetails';

const App: React.FC = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <ProductDetails />
    </NativeBaseProvider>
  );
};

export default App;
