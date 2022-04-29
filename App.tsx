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
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Inventory} from './components/Inventory';

const App = () => {
  return (
    <SafeAreaView style={styles.navigationContainer}>
      <Inventory inventoryTableName={'Items'} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
});
