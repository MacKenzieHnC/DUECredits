import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Button, Center, Modal, Text, View, VStack} from 'native-base';
import {
  useGetAllShopsQuery,
  useSaveNewShopMutation,
} from '../store/slices/databaseSlice';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {
  currentShopChanged,
  selectCurrentShopID,
} from '../store/slices/appSlice';
import {TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {LoadingScreen} from '../components/LoadingScreen';
import {Shop} from '../models/InventoryOptionsIndex';
import {useTheme} from '../components/Theme';

export const LoadShop = ({navigation}: any) => {
  const {data: shops, isLoading} = useGetAllShopsQuery();
  const [saveVisible, setSaveVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(
    useAppSelector(selectCurrentShopID),
  );
  const [newShopName, setNewShopName] = useState('');
  const [save] = useSaveNewShopMutation();
  const dispatch = useAppDispatch();

  // Stylize
  const theme = useTheme();

  const loadShop = (shopID: number) => {
    dispatch(currentShopChanged(shopID));
  };
  if (isLoading || !shops || !save) {
    return <LoadingScreen text="Initializing DB..." />;
  }

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={theme.colors.background}>
      <Center>
        <Button onPress={() => setSaveVisible(true)}>
          Load or Create Shop
        </Button>
        <Modal
          isOpen={saveVisible}
          onClose={() => setSaveVisible(false)}
          size="lg">
          <Modal.Content
            maxWidth="350"
            backgroundColor={theme.colors.background}>
            <Modal.CloseButton />
            <Modal.Header style={{backgroundColor: theme.colors.card}}>
              <Text color={theme.colors.text}>Load Shop</Text>
            </Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <Picker
                  selectedValue={selectedShop}
                  onValueChange={itemValue => setSelectedShop(itemValue)}
                  numberOfLines={50}
                  dropdownIconColor={theme.colors.text}
                  dropdownIconRippleColor={theme.colors.primary}>
                  {shops?.map((shop: Shop) => {
                    return (
                      <Picker.Item
                        color={theme.colors.text}
                        label={shop.name}
                        value={shop.id}
                      />
                    );
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
            <Modal.Footer style={{backgroundColor: theme.colors.card}}>
              <Button
                flex={1}
                onPress={() => {
                  if (selectedShop === 0) {
                    save(newShopName);
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
