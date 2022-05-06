import {Box, Heading, SectionList} from 'native-base';
import React from 'react';
import {GearItemComponent} from '../../components/ListComponents/GearItem';
import {LoadingScreen} from '../../components/LoadingScreen';
import {GearItem} from '../../models/ItemIndex';
import {
  useGetAllGearQuery,
  useGetDBStateQuery,
} from '../../store/slices/databaseSlice';

export const GearInventory = () => {
  const {data: items, isLoading: itemsLoading} = useGetAllGearQuery(undefined);

  const {data: dbState, isLoading: dbStateLoading} = useGetDBStateQuery();

  if (itemsLoading || !items) {
    return <LoadingScreen text={'Loading gear...'} />;
  } else if (dbStateLoading || !dbState) {
    return <LoadingScreen text={'Loading gear categories...'} />;
  }

  const categorizedList = dbState.gear.categories
    .map(category => ({
      title: category.item,
      data: items.filter((item: GearItem) => item.category === category.id),
    }))
    .filter(category => category.data.length > 0);

  return (
    <SectionList
      sections={categorizedList}
      stickySectionHeadersEnabled
      keyExtractor={(gearItem, index) => `${gearItem.itemProps.id}-${index}`}
      renderItem={({item: gearItem}) => (
        <GearItemComponent item={gearItem} key={gearItem.itemProps.id} />
      )}
      renderSectionHeader={({section: {title}}) => (
        <Box backgroundColor="white" py={2}>
          <Heading>{title}</Heading>
        </Box>
      )}
    />
  );
};
