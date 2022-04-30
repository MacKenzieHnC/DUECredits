import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, View} from 'native-base';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Inventory} from './components/Inventory';
// import {InventoryOptions} from './components/InventoryOptions';

const queryClient = new QueryClient();

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <View p={1} flex="1">
            <Inventory />
          </View>
        </NativeBaseProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
