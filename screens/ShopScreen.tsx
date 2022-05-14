import {Button, HStack, ScrollView, Text, View} from 'native-base';
import React from 'react';
import {LoadingScreen} from '../components/LoadingScreen';
import {useAppSelector} from '../hooks/redux';
import {ITEM_TYPE} from '../models/ItemIndex';
import {getConstraints} from '../services/db-service-constraints';
import {selectCurrentShopID} from '../store/slices/appSlice';
import {
  useGetShopQuery,
  useResetShopRulesMutation,
} from '../store/slices/databaseSlice';

export const ShopScreen = ({navigation}: any) => {
  const {data: shop, isLoading} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const [reset] = useResetShopRulesMutation();
  if (isLoading || !shop) {
    return <LoadingScreen text="Loading shop..." />;
  }

  const constraints = getConstraints(shop.options);
  var i = 0;
  const blah = ITEM_TYPE.map(itemType => {
    i += 1;
    return (
      <View key={i}>
        <Text color="white" fontSize={20}>
          {'\n___' + itemType.tableName + '___'}
        </Text>
        <Text color="white">
          {constraints[ITEM_TYPE.findIndex(x => x === itemType)]}
        </Text>
      </View>
    );
  });

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      <HStack space={5}>
        <Button onPress={() => navigation.navigate('Inventory')}>
          Go To Inventory!
        </Button>
        <Button onPress={() => navigation.navigate('Options')}>
          Go To Options!
        </Button>
        <Button onPress={() => reset(shop.id)}>RESET</Button>
      </HStack>
      <Text color="white" fontSize={20}>
        SQL Constraints
      </Text>
      {blah}
    </ScrollView>
  );
};
