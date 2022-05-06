import {FlatList, View} from 'native-base';
import React from 'react';
import {ArmorItemComponent} from '../../components/ListComponents/ArmorItem';
import {LoadingScreen} from '../../components/LoadingScreen';
import {useGetAllArmorQuery} from '../../store/slices/databaseSlice';

export const ArmorInventory = () => {
  const {data, isLoading} = useGetAllArmorQuery(undefined);

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
