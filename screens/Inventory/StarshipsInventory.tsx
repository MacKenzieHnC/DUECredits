import {Box, Heading, SectionList} from 'native-base';
import React from 'react';
import {StarshipItemComponent} from '../../components/ListComponents/StarshipItem';
import {LoadingScreen} from '../../components/LoadingScreen';
import {StarshipItem} from '../../models/ItemIndex';
import {
  useGetAllStarshipsQuery,
  useGetDBStateQuery,
} from '../../store/slices/databaseSlice';

export const StarshipInventory = () => {
  const {data: items, isLoading: itemsLoading} =
    useGetAllStarshipsQuery(undefined);

  const {data: dbState, isLoading: dbStateLoading} = useGetDBStateQuery();

  if (itemsLoading || !items) {
    return <LoadingScreen text={'Loading starships...'} />;
  } else if (dbStateLoading || !dbState) {
    return <LoadingScreen text={'Loading starship categories...'} />;
  }

  const categorizedList = dbState.vehicles.categories
    .map(category => ({
      title: category.item,
      data: items.filter(
        (item: StarshipItem) => item.vehicle.category === category.id,
      ),
    }))
    .filter(category => category.data.length > 0);

  return (
    <SectionList
      sections={categorizedList}
      stickySectionHeadersEnabled
      keyExtractor={(starshipItem, index) =>
        `${starshipItem.itemProps.id}-${index}`
      }
      renderItem={({item: starshipItem}) => (
        <StarshipItemComponent
          item={starshipItem}
          key={starshipItem.itemProps.id}
        />
      )}
      renderSectionHeader={({section: {title}}) => (
        <Box backgroundColor="white" py={2}>
          <Heading>{title}</Heading>
        </Box>
      )}
    />
  );
};
