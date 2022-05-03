import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, View} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {Inventory} from './components/Inventory';
import {store} from './store';
// import {InventoryOptions} from './components/InventoryOptions';

const App = () => {
  // // Initialize database
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
  //         <InventoryOptions dbState={dbState} />
  //       )}
  //     </View>
  //   </NativeBaseProvider>
  // );

  return (
    <NavigationContainer>
      <Provider store={store}>
        <NativeBaseProvider>
          <View p={1} flex="1">
            <Inventory />
          </View>
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
