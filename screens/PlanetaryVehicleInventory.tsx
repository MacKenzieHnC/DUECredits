import {Box, Heading, SectionList} from 'native-base';
import React from 'react';
import {VehicleItemComponent} from '../components/VehicleItem';
import {LoadingScreen} from '../components/LoadingScreen';
import {PlanetaryVehicleItem} from '../models/ItemIndex';
import {
  useGetAllPlanetaryVehiclesQuery,
  useGetDBStateQuery,
} from '../store/slices/databaseSlice';

export const PlanetaryVehicleInventory = () => {
  const {data: items, isLoading: itemsLoading} =
    useGetAllPlanetaryVehiclesQuery(undefined);

  const {data: dbState, isLoading: dbStateLoading} = useGetDBStateQuery();

  if (itemsLoading || !items) {
    return <LoadingScreen text={'Loading vehicles...'} />;
  } else if (dbStateLoading || !dbState) {
    return <LoadingScreen text={'Loading vehicle categories...'} />;
  }

  const categorizedList = dbState.vehicles.categories
    .map(category => ({
      title: category.item,
      data: items.filter(
        (item: PlanetaryVehicleItem) => item.vehicle.category === category.id,
      ),
    }))
    .filter(category => category.data.length > 0);

  return (
    <SectionList
      sections={categorizedList}
      stickySectionHeadersEnabled
      keyExtractor={(vehicleItem, index) =>
        `${vehicleItem.itemProps.id}-${index}`
      }
      renderItem={({item: vehicleItem}) => (
        <VehicleItemComponent
          item={vehicleItem}
          key={vehicleItem.itemProps.id}
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
