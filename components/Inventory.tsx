import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {
  useGetInventoryQuery,
  useGetShopQuery,
} from '../store/slices/databaseSlice';
import {LoadingScreen} from './LoadingScreen';
import {GenerateShopButton} from './GenerateInventoryButton';
import {ItemScreen} from '../screens/ItemScreen';
import {Shop} from '../models/InventoryOptionsIndex';
import {useAppSelector} from '../hooks/redux';
import {selectCurrentShopID} from '../store/slices/appSlice';
import {ITEM_TYPE} from '../models/ItemIndex';
import {useTheme} from './Theme';
import {Text, View} from 'native-base';

const Drawer = createDrawerNavigator();

export const Inventory = ({navigation}: any) => {
  //Initialize
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data: inventory, isLoading} = useGetInventoryQuery(shop as Shop);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <GenerateShopButton />,
    });
  }, [navigation]);

  // Stylize
  const theme = useTheme();

  if (isLoading || !inventory || isLoadingShop || !shop) {
    return <LoadingScreen text="Loading shop" />;
  }

  const screens = ITEM_TYPE.map((itemType, index) => {
    return (
      inventory[index].length > 0 && (
        <Drawer.Screen
          name={itemType.name}
          component={ItemScreen}
          initialParams={{key: itemType.key}}
        />
      )
    );
  });
  return screens.some(x => x) ? (
    <Drawer.Navigator
      detachInactiveScreens
      initialRouteName="Armor"
      defaultStatus="closed"
      useLegacyImplementation={true}
      screenOptions={{headerTintColor: theme.text}}>
      {screens}
    </Drawer.Navigator>
  ) : (
    <View
      flex={1}
      backgroundColor={theme.bg}
      alignItems={'center'}
      justifyContent={'center'}>
      <Text color={theme.text}>No items yet!</Text>
    </View>
  );
};
