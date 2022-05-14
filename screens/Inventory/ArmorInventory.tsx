import {FlatList, Text, View} from 'native-base';
import React from 'react';
import {ArmorItemComponent} from '../../components/ListComponents/ArmorItem';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {Shop} from '../../models/InventoryOptionsIndex';
import {selectCurrentShopID} from '../../store/slices/appSlice';
import {
  useGetAllArmorQuery,
  useGetShopQuery,
} from '../../store/slices/databaseSlice';

export const ArmorInventory = () => {
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data, isLoading} = useGetAllArmorQuery(shop as Shop);

  if (isLoading || !data || isLoadingShop || !shop) {
    return <LoadingScreen text={'Loading armor...'} />;
  }

  return (
    <View>
      <Text>{data.length}</Text>
      <FlatList
        data={data}
        keyExtractor={item => `${item.itemProps.id}`}
        renderItem={({item}) => (
          <ArmorItemComponent key={item.itemProps.id} item={item} />
        )}
        initialNumToRender={10}
      />
    </View>
  );
};
