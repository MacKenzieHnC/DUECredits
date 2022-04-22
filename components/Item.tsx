import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Item } from '../models';
export const ItemComponent: React.FC<{
  itemProps: Item;
}> = ({itemProps}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text>
          {itemProps.name}
          {'\t'}
          {itemProps.restricted}
        </Text>
      </View>
      <View style={styles.itemTextContainer}>
        <Text>
          {itemProps.price}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    backgroundColor: 'deepskyblue',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  itemTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
});
