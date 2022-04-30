import React from 'react';

import {FlatList, View, ScrollView, Text, Accordion} from 'native-base';
import {SimpleAccordion} from 'react-native-simple-accordion';
import {ITEM_TYPE} from '../constants/enum';
import {ArmorList, WeaponsList} from '../models/ItemIndex';
import {ArmorItemComponent} from './ArmorItem';
import {WeaponItemComponent} from './WeaponItem';

function getComponents(items: ArmorList | WeaponsList) {
  switch (items.itemType) {
    case ITEM_TYPE.Armor:
      return (
        <FlatList
          data={(items as ArmorList).items}
          renderItem={({item}) => <ArmorItemComponent item={item} />}
        />
      );
    case ITEM_TYPE.Weapons:
      return getWeaponComponents(items as WeaponsList);
    default:
      return (
        <View>
          <Text>List not found!!!!</Text>
        </View>
      );
  }
}

function getWeaponComponents(weaponsList: WeaponsList) {
  const categories = weaponsList.categories;

  return (
    <ScrollView>
      {weaponsList.items.map(category => (
        <SimpleAccordion
          key={category.category}
          viewInside={
            <>
              {category.items.map(item => (
                <WeaponItemComponent item={item} key={item.key} />
              ))}
            </>
          }
          title={categories[category.category].category}
        />
      ))}
    </ScrollView>
  );
}

export const ItemList: React.FC<{
  items: ArmorList | WeaponsList | undefined;
}> = ({items}) => {
  if (items === undefined) {
    return <View />;
  } else {
    return <View>{getComponents(items)}</View>;
  }
};
