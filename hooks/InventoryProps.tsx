import {useEffect, useState} from 'react';
import {useAppSelector} from './redux';
import {Shop} from '../models/InventoryOptionsIndex';
import {Location} from '../models/ItemIndex';
import {selectCurrentShopID} from '../store/slices/appSlice';
import {
  useGetDBStateQuery,
  useGetShopQuery,
} from '../store/slices/databaseSlice';

export const useGetInventoryProps = () => {
  const [inventoryProps, setInventoryProps] = useState<{
    shop: Shop;
    location: Location;
  }>();
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data: dbState, isLoading: isLoadingDBState} = useGetDBStateQuery();
  useEffect(() => {
    if (!isLoadingShop && shop && !isLoadingDBState && dbState) {
      setInventoryProps({
        shop: shop,
        location: dbState.locations.find(
          x => x.id === shop.options.location,
        ) as Location,
      });
    }
  }, [isLoadingShop, shop, isLoadingDBState, dbState]);
  return inventoryProps;
};
