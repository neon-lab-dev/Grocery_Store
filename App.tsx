import 'react-native-gesture-handler';
import React from 'react';
import RootNavigation from './src/navigation/MainNavigation';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/constants/theme';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigation from './src/navigation/AppNavigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <RootNavigation />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
