import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export const ShopIndex: React.FC<{}> = () => {
  var index = 5;
  return (
    <View>
      <View style={styles.buttonView}>
        <Button title={'Armor'} onPress={() => (index = 0)} />
      </View>
      <View style={styles.buttonView}>
        <Button title={'Weapons'} onPress={() => (index = 7)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
