import {FlatList, Text, View} from 'native-base';
import React from 'react';
import {useQuery} from 'react-query';
import {ArmorItemComponent} from '../components/ArmorItem';
import {getArmorItems, getDBConnection} from '../services/db-service';

export const ArmorInventory = () => {
  const {data, isLoading} = useQuery(['Inventory', 'Armor'], async () => {
    const db = await getDBConnection();

    return getArmorItems(db, 'items');
  });

  if (isLoading || !data) {
    return <Text>Loading....</Text>;
  }

  return (
    <View>
      <FlatList
        data={data.items}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({item}) => (
          <ArmorItemComponent key={item.id} item={item} />
        )}
        initialNumToRender={10}
      />
    </View>
  );
};
