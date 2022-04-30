import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {InventoryOptions} from './components/InventoryOptions';

const App = () => {
  return (
    <SafeAreaView style={styles.navigationContainer}>
      <InventoryOptions />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
});
