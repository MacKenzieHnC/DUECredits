import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Button, Center, Modal, View, VStack} from 'native-base';
import {useGetAllShopsQuery} from '../store/slices/databaseSlice';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {
  currentShopChanged,
  saveNewShop,
  selectCurrentShopID,
} from '../store/slices/appSlice';
import {TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {LoadingScreen} from '../components/LoadingScreen';
import {Shop} from '../models/InventoryOptionsIndex';

export const LoadShop = ({navigation}: any) => {
  const {data: shops, isLoading} = useGetAllShopsQuery();
  const [saveVisible, setSaveVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(
    useAppSelector(selectCurrentShopID),
  );
  const [newShopName, setNewShopName] = useState('');
  const dispatch = useAppDispatch();
  if (isLoading || !shops) {
    return <LoadingScreen text="Initializing DB..." />;
  }

  const loadShop = (shopID: number) => {
    dispatch(currentShopChanged(shopID));
  };

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Center>
        <Button onPress={() => setSaveVisible(true)}>
          Load or Create Shop
        </Button>
        <Modal
          isOpen={saveVisible}
          onClose={() => setSaveVisible(false)}
          size="lg">
          <Modal.Content maxWidth="350" backgroundColor={'black'}>
            <Modal.CloseButton />
            <Modal.Header>Load Shop</Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <Picker
                  selectedValue={selectedShop}
                  onValueChange={itemValue => setSelectedShop(itemValue)}
                  numberOfLines={50}>
                  {shops?.map((shop: Shop) => {
                    return <Picker.Item label={shop.name} value={shop.id} />;
                  })}
                </Picker>
                {selectedShop === 0 ? (
                  <TextInput
                    allowFontScaling={true}
                    selectTextOnFocus={true}
                    placeholder={'Enter New Shop Name Here'}
                    onChangeText={itemValue => setNewShopName(itemValue)}
                  />
                ) : (
                  <></>
                )}
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button
                flex={1}
                onPress={() => {
                  if (selectedShop === 0) {
                    dispatch(saveNewShop(newShopName));
                  } else {
                    loadShop(selectedShop);
                  }
                  setSaveVisible(false);
                  navigation.navigate('Shop Display');
                }}>
                {selectedShop === 0 ? 'Create New Shop!' : 'LOAD'}
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </View>
  );
};
