import {Button} from 'native-base';
import React from 'react';
import {getDiceRoll, getDicePool} from '../Dice/Dice';
import {useAppSelector} from '../hooks/redux';
import {Shop} from '../models/InventoryOptionsIndex';
import {selectCurrentShopID} from '../store/slices/appSlice';
import {
  useGetShopQuery,
  useGetAllItemsQuery,
  useSetShopInventoryMutation,
} from '../store/slices/databaseSlice';

export const GenerateShopButton = () => {
  const {data: shop, isLoading: isLoadingShop} = useGetShopQuery(
    useAppSelector(selectCurrentShopID),
  );
  const {data: itemLists, isLoading} = useGetAllItemsQuery(shop as Shop);
  const [setShopInventory] = useSetShopInventoryMutation();
  if (isLoadingShop || !shop || isLoading || !itemLists) {
    return <></>;
  }
  const character = {
    legalCharacteristic: 1,
    legalStat: 1,
    illegalCharacteristic: 1,
    illegalStat: 1,
    numBoosts: 50,
    numSetbacks: 0,
  };
  const onPress = () => {
    var myLists: any[][] = JSON.parse(JSON.stringify(itemLists));
    for (let i = 0; i < myLists.length; i++) {
      for (let j = 0; j < myLists[i].length; j++) {
        const characteristic = myLists[i][j].restricted
          ? character.illegalCharacteristic
          : character.legalCharacteristic;
        const stat = myLists[i][j].restricted
          ? character.illegalStat
          : character.legalStat;

        Object.defineProperty(myLists[i][j], 'roll', {
          value: getDiceRoll(
            getDicePool(
              stat,
              characteristic,
              myLists[i][j].rarity,
              character.numBoosts,
              character.numSetbacks,
            ),
          ),
          enumerable: true,
          writable: true,
        });
      }
    }
    myLists = myLists.map(list => {
      return list.filter(item => item.roll.successes > item.roll.failures);
    });
    setShopInventory({shop: shop as Shop, itemLists: myLists});
  };
  return <Button onPress={onPress}>Generate Shop!</Button>;
};
