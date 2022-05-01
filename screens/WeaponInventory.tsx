import {Box, Heading, SectionList, Text} from 'native-base';
import React from 'react';
import {useQuery} from 'react-query';
import {LoadingScreen} from '../components/LoadingScreen';
import {WeaponItemComponent} from '../components/WeaponItem';
import {
  getDBConnection,
  getDBWeaponsState,
  getWeaponItems,
} from '../services/db-service';

export const WeaponInventory = () => {
  const {data, isLoading} = useQuery(['Inventory', 'Weapons'], async () => {
    const db = await getDBConnection();
    const state = await getDBWeaponsState(db);
    const list = await getWeaponItems(db, state, 'items');
    return {
      list: list,
      state: state,
    };
  });

  if (isLoading || !data) {
    return <LoadingScreen text={'Loading weapons...'} />;
  }

  const categories = data.state.categories;

  const items = data.list.items.map(weaponItem => ({
    title: categories[weaponItem.category].item,
    data: weaponItem.items,
  }));

  return (
    <SectionList
      sections={items}
      stickySectionHeadersEnabled
      keyExtractor={(weaponItem, index) => `${weaponItem.id}-${index}`}
      renderItem={({item: weaponItem}) => (
        <WeaponItemComponent item={weaponItem} key={weaponItem.id} />
      )}
      renderSectionHeader={({section: {title}}) => (
        <Box backgroundColor="white" py={2}>
          <Heading>{title}</Heading>
        </Box>
      )}
    />
  );
};
