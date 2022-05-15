import {Text, View} from 'native-base';
import React from 'react';
import {ActivityIndicator} from 'react-native';

export const LoadingScreen: React.FC<{text: string}> = ({text}) => {
  return (
    <View
      flex={1}
      backgroundColor={'white'}
      alignItems={'center'}
      justifyContent={'center'}>
      <ActivityIndicator />
      <Text>{text}</Text>
    </View>
  );
};
