import {NativeBaseProvider, View} from 'native-base';
import React from 'react';
import {Inventory} from './components/Inventory';
// import {InventoryOptions} from './components/InventoryOptions';

const App = () => {
  return (
    <NativeBaseProvider>
      <View p={1} flex="1">
        <Inventory inventoryTableName={'items'} />
      </View>
    </NativeBaseProvider>
  );
};

export default App;
