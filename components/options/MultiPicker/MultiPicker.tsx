import React, {useState} from 'react';
import {
  ScrollView,
  Modal,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';
import {Icon} from 'native-base';

interface MultiPickerProps {
  items;
  placeholder;
  icon;
  selectedItems;
  onChangeItems: Function;
  features: string[];
  featureNames?: string[];
}

const MultiPicker = ({
  items,
  placeholder,
  icon,
  selectedItems,
  onChangeItems,
  features,
  featureNames,
}: MultiPickerProps) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(selectedItems.map(item => item.id));

  const windowHeight = Dimensions.get('window').height;

  function selectItems(id) {
    if (selected?.includes(id)) {
      setSelected(selected.filter(x => x != id));
    } else {
      setSelected([...selected, id]);
    }
  }

  function itemFromID(id) {
    return items?.find(x => x.id == id);
  }

  function closeModel() {
    onChangeItems(selected.map(id => itemFromID(id)));
    setVisible(false);
  }

  var itemDisplay = '';
  for (let i = 0; i < features.length; i++) {
    itemDisplay += features[i] + (featureNames ? featureNames[i] : '');
  }

  return (
    <View>
      <View>
        <Pressable style={styles.inputArea} onPress={() => setVisible(true)}>
          {icon && (
            <View style={styles.iconContainer}>
              <Image source={icon} />
            </View>
          )}
          <Text style={{paddingLeft: icon ? 0 : 15}}>{placeholder}</Text>
        </Pressable>
        {selected?.length > 0 && (
          <View style={styles.previewContainer}>
            {selected?.map((id, index) => (
              <View key={index} style={styles.previewItem}>
                <Text>{itemFromID(id).name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(selected.filter(x => x != id));
                    onChangeItems(
                      selected.filter(x => x != id).map(id => itemFromID(id)),
                    );
                  }}>
                  <Icon name="closeCircle" fill="#fff" width={21} height={21} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.mainContainer}>
            <View style={styles.itemsContainer}>
              <ScrollView style={{maxHeight: windowHeight - 200}}>
                {items?.length == 0 ? (
                  <Text style={{textAlign: 'center'}}>No items to select</Text>
                ) : (
                  items?.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <TouchableOpacity onPress={() => selectItems(item?.id)}>
                        <Text
                          style={
                            selected?.includes(item.id)
                              ? {color: '#000'}
                              : {color: '#bbb'}
                          }>
                          {itemDisplay}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>

            <Pressable style={styles.btnAction} onPress={() => closeModel()}>
              <Text>{items?.length == 0 ? 'Close' : 'Done'}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

MultiPicker.propTypes = {
  items: PropTypes.array,
  placeholder: PropTypes.string,
  selectedItems: PropTypes.array,
  onChangeItems: PropTypes.func,
};

MultiPicker.defaultProps = {
  items: [],
  placeholder: 'Select',
  selectedItems: [],
};

export default MultiPicker;

const styles = StyleSheet.create({
  btnAction: {
    width: 200,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9d132',
  },
  closeIcon: {
    width: 12,
    height: 12,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 55,
    alignItems: 'center',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    paddingVertical: 15,
    backgroundColor: 'primary',
    borderColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  itemContainer: {
    padding: 15,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  itemsContainer: {
    marginBottom: 20,
    width: '100%',
  },
  mainContainer: {
    backgroundColor: '#246',
    width: '90%',
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 16,
    marginHorizontal: 8,
    borderRadius: 20,
    borderColor: '#666',
    borderWidth: 1,
  },
});
