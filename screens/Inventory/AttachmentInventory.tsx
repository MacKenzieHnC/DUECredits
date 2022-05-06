import {Box, Heading, SectionList} from 'native-base';
import React from 'react';
import {AttachmentItemComponent} from '../../components/ListComponents/AttachmentItem';
import {LoadingScreen} from '../../components/LoadingScreen';
import {AttachmentItem} from '../../models/ItemIndex';
import {
  useGetAllAttachmentsQuery,
  useGetDBStateQuery,
} from '../../store/slices/databaseSlice';

export const AttachmentInventory = () => {
  const {data: items, isLoading: itemsLoading} =
    useGetAllAttachmentsQuery(undefined);

  const {data: dbState, isLoading: dbStateLoading} = useGetDBStateQuery();

  if (itemsLoading || !items) {
    return <LoadingScreen text={'Loading attachments...'} />;
  } else if (dbStateLoading || !dbState) {
    return <LoadingScreen text={'Loading attachment categories...'} />;
  }

  const categorizedList = dbState.attachments.categories
    .map(category => ({
      title: category.item,
      data: items.filter(
        (item: AttachmentItem) => item.category === category.id,
      ),
    }))
    .filter(category => category.data.length > 0);

  return (
    <SectionList
      sections={categorizedList}
      stickySectionHeadersEnabled
      keyExtractor={(attachmentItem, index) =>
        `${attachmentItem.itemProps.id}-${index}`
      }
      renderItem={({item: attachmentItem}) => (
        <AttachmentItemComponent
          item={attachmentItem}
          key={attachmentItem.itemProps.id}
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
