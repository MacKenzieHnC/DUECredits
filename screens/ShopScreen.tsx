import {Button, HStack, ScrollView} from 'native-base';
import React from 'react';
import {LoadingScreen} from '../components/LoadingScreen';
import {
  useGetAllShopsQuery,
  useResetShopRulesMutation,
} from '../store/slices/databaseSlice';

export const ShopScreen = ({navigation}: any) => {
  const {data: shops, isLoading} = useGetAllShopsQuery();
  const [reset] = useResetShopRulesMutation();
  if (isLoading || !shops) {
    return <LoadingScreen text="Initializing DB..." />;
  }

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
    </ScrollView>
  );
};
