import {FlatList, View} from 'native-base';
import React from 'react';
import {LoadingScreen} from '../components/LoadingScreen';
import {VehicleWeaponItemComponent} from '../components/VehicleWeaponItem';
import {useGetAllVehicleWeaponsQuery} from '../store/slices/databaseSlice';

export const VehicleWeaponsInventory = () => {
  const {data: items, isLoading: itemsLoading} =
    useGetAllVehicleWeaponsQuery(undefined);

  if (itemsLoading || !items) {
    return <LoadingScreen text={'Loading vehicleWeapons...'} />;
  }

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item.itemProps.id}-${index}`}
        renderItem={({item}) => (
          <VehicleWeaponItemComponent key={item.itemProps.id} item={item} />
        )}
        initialNumToRender={10}
      />
    </View>
  );
};
