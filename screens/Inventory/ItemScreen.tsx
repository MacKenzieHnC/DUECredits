import {FlatList, Text, View} from 'native-base';
import React from 'react';
import {ArmorItemComponent} from '../../components/ListComponents/ArmorItem';
import {AttachmentItemComponent} from '../../components/ListComponents/AttachmentItem';
import {GearItemComponent} from '../../components/ListComponents/GearItem';
import {StarshipItemComponent} from '../../components/ListComponents/StarshipItem';
import {VehicleAttachmentItemComponent} from '../../components/ListComponents/VehicleAttachmentItem';
import {VehicleItemComponent} from '../../components/ListComponents/VehicleItem';
import {VehicleWeaponItemComponent} from '../../components/ListComponents/VehicleWeaponItem';
import {WeaponItemComponent} from '../../components/ListComponents/WeaponItem';
import {LoadingScreen} from '../../components/LoadingScreen';
import {ITEM_TYPE} from '../../constants/enum';
import {useAppSelector} from '../../hooks/redux';
import {Shop} from '../../models/InventoryOptionsIndex';
import {Item} from '../../models/ItemIndex';
import {selectCurrentShopID} from '../../store/slices/appSlice';
import {
  useGetInventoryQuery,
  useGetShopQuery,
} from '../../store/slices/databaseSlice';

export const ItemScreen = ({navigation, route}: any) => {
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data, isLoading} = useGetInventoryQuery(shop as Shop);
  if (isLoading || !data || isLoadingShop || !shop) {
    return <LoadingScreen text={'Loading armor...'} />;
  }
  const index = ITEM_TYPE.findIndex(x => x.key === route.params.key);

  const RenderComponent = ({item}) => {
    switch (route.params.key) {
      case 'armor':
        return <ArmorItemComponent item={item} />;
      case 'attachments':
        return <AttachmentItemComponent item={item} />;
      case 'gear':
        return <GearItemComponent item={item} />;
      case 'planetaryVehicles':
        return <VehicleItemComponent item={item} />;
      case 'starships':
        return <StarshipItemComponent item={item} />;
      case 'vehicleAttachments':
        return <VehicleAttachmentItemComponent item={item} />;
      case 'vehicleWeapons':
        return <VehicleWeaponItemComponent item={item} />;
      case 'weapons':
        return <WeaponItemComponent item={item} />;
      default:
        return <Text>Unrecognized item type!</Text>;
    }
  };

  return (
    <View flex={1}>
      {data[index].length > 0 ? (
        <FlatList
          data={data[index]}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <View>
              <RenderComponent item={item} />
            </View>
          )}
          initialNumToRender={10}
        />
      ) : (
        <LoadingScreen text={'No items yet...'} />
      )}
    </View>
  );
};
