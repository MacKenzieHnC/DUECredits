import {FlatList, Text, View} from 'native-base';
import React from 'react';
import {ArmorItemComponent} from '../../components/ListComponents/ArmorItem';
import {LoadingScreen} from '../../components/LoadingScreen';
import {ITEM_TYPE} from '../../constants/enum';
import {useAppSelector} from '../../hooks/redux';
import {selectCurrentShopID} from '../../store/slices/appSlice';
import {
  useGetInventoryQuery,
  useGetShopQuery,
} from '../../store/slices/databaseSlice';

export const ArmorInventory = () => {
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data, isLoading} = useGetInventoryQuery(shop);
  const index = ITEM_TYPE.findIndex(x => x.name === 'armor');
  if (isLoading || !data || isLoadingShop || !shop) {
    return <LoadingScreen text={'Loading armor...'} />;
  }
  return (
    <View>
      {data[index].length > 0 ? (
        <FlatList
          data={data[index]}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Text>{item.name}</Text>}
          initialNumToRender={10}
        />
      ) : (
        data.map(itemType => <Text>{itemType.length}</Text>)
      )}
    </View>
  );
};
