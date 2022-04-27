import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {SimpleAccordion} from 'react-native-simple-accordion';
import {ITEM_TYPE} from '../constants/enum';
import {ArmorList, WeaponsList} from '../models';
import {ArmorItemComponent} from './ArmorItem';
import {WeaponItemComponent} from './WeaponItem';

function getComponents(items: ArmorList | WeaponsList) {
  switch (items.itemType) {
    case ITEM_TYPE.Armor:
      return getArmorComponents(items as ArmorList);
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

function getArmorComponents(items: ArmorList) {
  return items.items.map(item => (
    <ArmorItemComponent
      itemProps={item.itemProps}
      armorItem={item}
      key={item.key}
    />
  ));
}

function getWeaponComponents(weaponsList: WeaponsList) {
  const categories = weaponsList.categories;
  const mySections = [];

  weaponsList.items.map(category =>
    mySections.push({
      key: category.category,
      title: categories[category.category].category,
      content: category.items.map(item => (
        <WeaponItemComponent
          itemProps={item.itemProps}
          weaponItem={item}
          key={item.key}
        />
      )),
    }),
  );

  var accordion = mySections.map(section => (
    <SimpleAccordion
      key={section.key}
      viewInside={section.content}
      title={section.title}
      startCollapsed={false}
    />
  ));

  return accordion;
}

export const ItemList: React.FC<{
  items: ArmorList | WeaponsList | undefined;
}> = ({items}) => {
  if (items === undefined) {
    return <View />;
  } else {
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={true}>
          {getComponents(items)}
        </ScrollView>
      </SafeAreaView>
    );
  }
};
