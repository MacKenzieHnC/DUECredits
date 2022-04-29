/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {SafeAreaView} from 'react-navigation';
import {Inventory} from './components/Inventory';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Inventory inventoryTableName={'Items'} />
    </SafeAreaView>
  );
};

export default App;
