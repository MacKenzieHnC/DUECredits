import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, View} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {ShopComponent} from './components/Shop';
import {useTheme} from './components/Theme';
import {store} from './store';

const App = () => {
  // Stylize
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <Provider store={store}>
        <NativeBaseProvider>
          <View p={1} flex="1">
            <ShopComponent />
          </View>
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
