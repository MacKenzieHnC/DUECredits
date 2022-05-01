import {Box, Heading, SectionList} from 'native-base';
import React from 'react';
import {LoadingScreen} from '../components/LoadingScreen';
import {WeaponItemComponent} from '../components/WeaponItem';
import {useGetAllWeaponsQuery} from '../store/slices/databaseSlice';

export const WeaponInventory = () => {
  const {data, isLoading} = useGetAllWeaponsQuery();

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
