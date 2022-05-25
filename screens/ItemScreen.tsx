import {
  Center,
  FlatList,
  Heading,
  SectionList,
  Spacer,
  Text,
  View,
} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {ArmorItemComponent} from '../components/ListComponents/ArmorItem';
import {AttachmentItemComponent} from '../components/ListComponents/AttachmentItem';
import {GearItemComponent} from '../components/ListComponents/GearItem';
import {StarshipItemComponent} from '../components/ListComponents/StarshipItem';
import {VehicleAttachmentItemComponent} from '../components/ListComponents/VehicleAttachmentItem';
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
import {PlanetaryVehicleItemComponent} from '../components/ListComponents/VehicleItem';

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
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState();

  // Stylize
  const theme = useTheme();

  const content = useMemo(() => {
    const RenderComponent = ({item, groupBy}: any) => {
      switch (route.params.key) {
        case 'armor':
          return <ArmorItemComponent item={item} />;
        case 'attachments':
          return <AttachmentItemComponent item={item} groupBy={groupBy} />;
        case 'gear':
          return <GearItemComponent item={item} groupBy={groupBy} />;
        case 'planetaryVehicles':
          return (
            <PlanetaryVehicleItemComponent item={item} groupBy={groupBy} />
          );
        case 'starships':
          return <StarshipItemComponent item={item} groupBy={groupBy} />;
        case 'vehicleAttachments':
          return (
            <VehicleAttachmentItemComponent item={item} groupBy={groupBy} />
          );
        case 'vehicleWeapons':
          return <VehicleWeaponItemComponent item={item} groupBy={groupBy} />;
        case 'weapons':
          return <WeaponItemComponent item={item} groupBy={groupBy} />;
        default:
          return <Text>Unrecognized item type!</Text>;
      }
    };

    if (!inventory) {
      return;
    }
    var value;
    if (group) {
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

      value = (
        <SectionList
          ItemSeparatorComponent={() => <Spacer my="2" />}
          SectionSeparatorComponent={() => <Spacer my="2" />}
          stickySectionHeadersEnabled={true}
          sections={data}
          renderItem={({item}) => {
            return <RenderComponent item={item} groupBy={group.key} />;
          }}
          renderSectionHeader={({section: {title}}) => (
            <Center
              backgroundColor={theme.colors.card.toString()}
              borderColor={theme.colors.border.toString()}
              borderBottomWidth={1}>
              <Heading fontSize="xl" mt="8" pb="4" color={theme.colors.text}>
                {title}
              </Heading>
            </Center>
          )}
        />
      );
    } else {
      value = (
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
      );
    }
    return value;
  }, [
    dbState,
    group,
    index,
    inventory,
    route.params.key,
    theme.colors.border,
    theme.colors.card,
    theme.colors.text,
  ]);

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

  return (
    <View flex={1}>
      {inventory[index].length > 0 ? (
        content
      ) : (
        <LoadingScreen text={'No items yet...'} />
      )}
    </View>
  );
};
