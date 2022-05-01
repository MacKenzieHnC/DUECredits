import {Text, View} from 'native-base';
import React from 'react';

export const LoadingScreen: React.FC<{text: string}> = ({text}) => {
  return (
    <View
      flex={1}
      backgroundColor={'white'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Text>{text}</Text>
    </View>
  );
};
