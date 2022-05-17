import {Center, FlatList, Heading, SectionList, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ArmorItemComponent} from '../components/ListComponents/ArmorItem';
import {AttachmentItemComponent} from '../components/ListComponents/AttachmentItem';
import {GearItemComponent} from '../components/ListComponents/GearItem';
import {StarshipItemComponent} from '../components/ListComponents/StarshipItem';
import {VehicleAttachmentItemComponent} from '../components/ListComponents/VehicleAttachmentItem';
import {VehicleItemComponent} from '../components/ListComponents/VehicleItem';
import {VehicleWeaponItemComponent} from '../components/ListComponents/VehicleWeaponItem';
import {WeaponItemComponent} from '../components/ListComponents/WeaponItem';
import {LoadingScreen} from '../components/LoadingScreen';
import {useTheme} from '../components/Theme';
import {useAppSelector} from '../hooks/redux';
import {CategoryColumn, ITEM_TYPE} from '../models/ItemIndex';
import {selectCurrentShopID} from '../store/slices/appSlice';
import {
  useGetDBStateQuery,
  useGetInventoryQuery,
  useGetShopQuery,
} from '../store/slices/databaseSlice';
import {useGetInventoryProps} from '../hooks/InventoryProps';
import _ from 'lodash';

export const ItemScreen = ({route}: any) => {
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data: dbState, isLoading: isLoadingDBState} = useGetDBStateQuery();
  const {data: inventory, isLoading: isLoadingInventory} = useGetInventoryQuery(
    useGetInventoryProps(),
  );
  const [group, setGroup] = useState<CategoryColumn>();
  const index = ITEM_TYPE.findIndex(x => x.key === route.params.key);
  useEffect(() => {
    if (!group && ITEM_TYPE[index].categories.length > 0) {
      setGroup(ITEM_TYPE[index].categories[0]);
    }
  }, [group, index]);

  // Stylize
  const theme = useTheme();

  if (
    isLoadingInventory ||
    !inventory ||
    isLoadingShop ||
    !shop ||
    isLoadingDBState ||
    !dbState ||
    (!group && ITEM_TYPE[index].categories.length)
  ) {
    return <LoadingScreen text={'Loading ' + ITEM_TYPE[index].name + '...'} />;
  }

  const RenderComponent = ({item, groupBy}) => {
    switch (route.params.key) {
      case 'armor':
        return <ArmorItemComponent item={item} groupBy={groupBy} />;
      case 'attachments':
        return <AttachmentItemComponent item={item} groupBy={groupBy} />;
      case 'gear':
        return <GearItemComponent item={item} groupBy={groupBy} />;
      case 'planetaryVehicles':
        return <VehicleItemComponent item={item} groupBy={groupBy} />;
      case 'starships':
        return <StarshipItemComponent item={item} groupBy={groupBy} />;
      case 'vehicleAttachments':
        return <VehicleAttachmentItemComponent item={item} groupBy={groupBy} />;
      case 'vehicleWeapons':
        return <VehicleWeaponItemComponent item={item} groupBy={groupBy} />;
      case 'weapons':
        return <WeaponItemComponent item={item} groupBy={groupBy} />;
      default:
        return <Text>Unrecognized item type!</Text>;
    }
  };

  const content = () => {
    if (!group) {
      console.log('Whoops!');
      return;
    }

    const data = _.chain(inventory[index])
      .groupBy(group.key)
      .map((value, key) => {
        return {
          title: dbState[group.keyLocation][group.key].find(
            x => x.id === parseInt(key, 10),
          ).name,
          data: value,
        };
      })
      .value();

    return (
      <SectionList
        stickySectionHeadersEnabled={true}
        sections={data}
        renderItem={({item}) => {
          return <RenderComponent item={item} groupBy={group.key} />;
        }}
        renderSectionHeader={({section: {title}}) => (
          <Center
            backgroundColor={theme.card.toString()}
            borderColor={theme.border.toString()}
            borderBottomWidth={1}>
            <Heading fontSize="xl" mt="8" pb="4" color={theme.text}>
              {title}
            </Heading>
          </Center>
        )}
      />
    );
  };

  return (
    <View flex={1}>
      {inventory[index].length > 0 ? (
        group ? (
          content()
        ) : (
          <FlatList
            data={inventory[index]}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <View>
                <RenderComponent item={item} groupBy={group} />
              </View>
            )}
            initialNumToRender={10}
          />
        )
      ) : (
        <LoadingScreen text={'No items yet...'} />
      )}
    </View>
  );
};
