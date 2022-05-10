import {Button, HStack, ScrollView, Text, View} from 'native-base';
import React from 'react';
import {LoadingScreen} from '../components/LoadingScreen';
import {ITEM_TYPE} from '../constants/enum';
import {useAppSelector} from '../hooks/redux';
import {getConstraints} from '../services/db-service-constraints';
import {selectCurrentShop} from '../store/slices/appSlice';
import {
  useGetAllShopsQuery,
  useResetShopRulesMutation,
} from '../store/slices/databaseSlice';

export const ShopScreen = ({navigation}: any) => {
  const {data: shops, isLoading} = useGetAllShopsQuery();
  const [reset] = useResetShopRulesMutation();
  const currentShop = useAppSelector(selectCurrentShop);
  if (isLoading || !shops) {
    return <LoadingScreen text="Initializing DB..." />;
  }

  const constraints = getConstraints(shops[currentShop].options);
  const blah = Object.keys(ITEM_TYPE).map(itemType => {
    return (
      <View>
        <Text color="white" fontSize={20}>
          {'\n___' + ITEM_TYPE[itemType].tableName + '___'}
        </Text>
        <Text color="white">{constraints[ITEM_TYPE[itemType].id]}</Text>
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
        <Button onPress={() => reset(0)}>RESET!</Button>
      </HStack>
      <Text color="white" fontSize={20}>
        SQL Constraints
      </Text>
      {blah}
    </ScrollView>
  );
};
