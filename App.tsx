import {NavigationContainer} from '@react-navigation/native';
import {Box, NativeBaseProvider, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Inventory} from './components/Inventory';
import {LoadingScreen} from './components/LoadingScreen';
import {InventoryOptions} from './components/options/InventoryOptions';
import {DBState} from './models/ItemIndex';
import {getDBConnection, getDBState} from './services/db-service';

const queryClient = new QueryClient();

const App = () => {
  // Initialize database
  // const [db, setDB] = useState<SQLiteDatabase>();
  // const [dbState, setDBState] = useState<DBState>();
  // useEffect(() => {
  //   const initializeDB = async () => {
  //     getDBConnection()
  //       .then(storedDB => {
  //         setDB(storedDB);
  //         // HACK: use storedDB instead of db, cause you can't await setDB even though it's async?!?!?!
  //         return getDBState(storedDB);
  //       })
  //       .then(storedDBState => setDBState(storedDBState));
  //   };

  //   initializeDB().catch(console.error);
  // }, [db]);
  // return (
  //   <NativeBaseProvider>
  //     <View p={1} flex="1">
  //       {!dbState || !db ? (
  //         <LoadingScreen text={'INITIALIZING DATABASE...'} />
  //       ) : (
  //         <InventoryOptions />
  //       )}
  //     </View>
  //   </NativeBaseProvider>
  // );

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
