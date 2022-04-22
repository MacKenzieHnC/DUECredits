import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {ArmorItemComponent} from './ArmorItem';
import {ArmorItem} from '../models';

function getComponents(items: ArmorItem[], itemType: String) {switch (itemType) {
  case 'ARMOR':
    return items.map(item => (
      <ArmorItemComponent
        itemProps={item.itemProps}
        armorItem={item}
        key={item.key}
      />
    ));
  default:
    return <View><Text>FAILED TO LOAD {itemType} ITEMS!</Text></View>;
}

}

export const ItemList: React.FC<{items: ArmorItem[], itemType: String}> = ({
  items,
  itemType,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.appTitleView]}>
          <Text style={styles.appTitleText}> {itemType} List</Text>
        </View>
          {getComponents(items, itemType)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800',
  },
});
