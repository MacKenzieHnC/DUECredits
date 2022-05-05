import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, View} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {ShopComponent} from './components/Shop';
import {store} from './store';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <NativeBaseProvider>
          <View p={1} flex="1">
            <ShopComponent />
          </View>
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer>
  //     <Provider store={store}>
  //       <NativeBaseProvider>
  //         <View p={1} flex="1">
  //           <Inventory />
  //         </View>
  //       </NativeBaseProvider>
  //     </Provider>
  //   </NavigationContainer>
  // );
};

export default App;
