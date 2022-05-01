import {Box, Heading, SectionList, Text} from 'native-base';
import React from 'react';
import {useQuery} from 'react-query';
import {WeaponItemComponent} from '../components/WeaponItem';
import {getDBConnection, getWeaponItems} from '../services/db-service';

export const WeaponInventory = () => {
  const {data, isLoading} = useQuery(['Inventory', 'Weapons'], async () => {
    const db = await getDBConnection();

    return getWeaponItems(db, 'items');
  });

  if (isLoading || !data) {
    return <Text>Loading....</Text>;
  }

  const categories = data.categories;

  const items = data.items.map(weaponItem => ({
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
