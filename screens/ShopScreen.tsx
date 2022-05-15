import {Button, HStack, ScrollView} from 'native-base';
import React from 'react';
import {LoadingScreen} from '../components/LoadingScreen';
import {useTheme} from '../components/Theme';
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

  // Stylize
  const theme = useTheme();

  if (isLoading || !shop) {
    return <LoadingScreen text="Loading shop..." />;
  }

  return (
    <ScrollView backgroundColor={theme.bg}>
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
