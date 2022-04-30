import {NativeBaseProvider, View} from 'native-base';
import React from 'react';
import {InventoryOptions} from './components/InventoryOptions';
// import {InventoryOptions} from './components/InventoryOptions';

const App = () => {
  return (
    <NativeBaseProvider>
      <View p={1} flex="1">
        <InventoryOptions />
      </View>
    </NativeBaseProvider>
  );
};

export default App;
