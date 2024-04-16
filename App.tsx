import 'react-native-gesture-handler';
import React from 'react';
import RootNavigation from './src/navigation/MainNavigation';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/constants/theme';
import Home from './src/screens/Home';

const App: React.FC = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <RootNavigation />
    </NativeBaseProvider>
  );
};

export default App;
