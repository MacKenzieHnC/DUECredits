import {Box, Heading, SectionList} from 'native-base';
import React from 'react';
import {LoadingScreen} from '../../components/LoadingScreen';
import {WeaponItemComponent} from '../../components/ListComponents/WeaponItem';
import {WeaponItem} from '../../models/ItemIndex';
import {
  useGetAllWeaponsQuery,
  useGetDBStateQuery,
} from '../../store/slices/databaseSlice';

export const WeaponInventory = () => {
  const {data: items, isLoading: itemsLoading} =
    useGetAllWeaponsQuery(undefined);

  const {data: dbState, isLoading: dbStateLoading} = useGetDBStateQuery();

  if (itemsLoading || !items) {
    return <LoadingScreen text={'Loading weapons...'} />;
  } else if (dbStateLoading || !dbState) {
    return <LoadingScreen text={'Loading weapon categories...'} />;
  }

  const categorizedList = dbState.weapons.categories
    .map(category => ({
      title: category.item,
      data: items.filter((item: WeaponItem) => item.category === category.id),
    }))
    .filter(category => category.data.length > 0);

  return (
    <SectionList
      sections={categorizedList}
      stickySectionHeadersEnabled
      keyExtractor={(weaponItem, index) =>
        `${weaponItem.itemProps.id}-${index}`
      }
      renderItem={({item: weaponItem}) => (
        <WeaponItemComponent item={weaponItem} key={weaponItem.itemProps.id} />
      )}
      renderSectionHeader={({section: {title}}) => (
        <Box backgroundColor="white" py={2}>
          <Heading>{title}</Heading>
        </Box>
      )}
    />
  );
};
