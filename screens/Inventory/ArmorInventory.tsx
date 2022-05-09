import {FlatList, View} from 'native-base';
import React from 'react';
import {ArmorItemComponent} from '../../components/ListComponents/ArmorItem';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShop} from '../../store/slices/appSlice';
import {
  selectAllShops,
  useGetAllArmorQuery,
} from '../../store/slices/databaseSlice';

export const ArmorInventory = () => {
  const shop =
    useAppSelector(selectAllShops)[useAppSelector(selectCurrentShop)];
  const {data, isLoading} = useGetAllArmorQuery(shop);

  if (isLoading || !data) {
    return <LoadingScreen text={'Loading armor...'} />;
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.itemProps.id}-${index}`}
        renderItem={({item}) => (
          <ArmorItemComponent key={item.itemProps.id} item={item} />
        )}
        initialNumToRender={10}
      />
    </View>
  );
};
