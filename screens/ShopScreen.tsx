import {Button, HStack, ScrollView} from 'native-base';
import React from 'react';
import {LoadingScreen} from '../components/LoadingScreen';
import {useAppSelector} from '../hooks/redux';
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
    </ScrollView>
  );
};
