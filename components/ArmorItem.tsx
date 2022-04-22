import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { ArmorItem } from '../models';
import { ItemComponent } from './Item';
export const ArmorItemComponent: React.FC<{
  armorItem: ArmorItem;
  key: number;
}> = ({armorItem: {itemProps}}) => {
  return (
    <View style={styles.armorItemContainer}>
      <View style={styles.armorItemTextContainer}>
        <ItemComponent itemProps={itemProps} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  armorItemContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    backgroundColor: 'deepskyblue',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  armorItemTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
});
