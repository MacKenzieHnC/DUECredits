import {FlatList, View} from 'native-base';
import React from 'react';
import {LoadingScreen} from '../../components/LoadingScreen';
import {VehicleAttachmentItemComponent} from '../../components/ListComponents/VehicleAttachmentItem';
import {useGetAllVehicleAttachmentsQuery} from '../../store/slices/databaseSlice';

export const VehicleAttachmentsInventory = () => {
  const {data: items, isLoading: itemsLoading} =
    useGetAllVehicleAttachmentsQuery(undefined);

  if (itemsLoading || !items) {
    return <LoadingScreen text={'Loading vehicleAttachments...'} />;
  }

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item.itemProps.id}-${index}`}
        renderItem={({item}) => (
          <VehicleAttachmentItemComponent key={item.itemProps.id} item={item} />
        )}
        initialNumToRender={10}
      />
    </View>
  );
};
