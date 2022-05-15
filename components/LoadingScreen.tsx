import {Text, View} from 'native-base';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from './Theme';

export const LoadingScreen: React.FC<{text: string}> = ({text}) => {
  // Stylize
  const theme = useTheme();

  return (
    <View
      flex={1}
      backgroundColor={theme.bg}
      alignItems={'center'}
      justifyContent={'center'}>
      <ActivityIndicator />
      <Text color={theme.text}>{text}</Text>
    </View>
  );
};
