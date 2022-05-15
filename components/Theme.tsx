import {useColorScheme} from 'react-native';

type Theme = {
  isDark: boolean;
  text: string;
  bg: string;
  highlight: string;
  primary: string;
  card: string;
  border: string;
  notification: string;
};

export const useTheme = (): Theme => {
  let colorScheme = useColorScheme();
  if (colorScheme === 'dark') {
    return {
      isDark: true,
      text: 'white',
      bg: 'muted.900',
      highlight: 'white',
      primary: 'indigo',
      card: 'rgb(20,10,40)',
      border: 'white',
      notification: 'blue',
    };
  } else {
    return {
      isDark: false,
      text: 'black',
      bg: 'muted.50',
      highlight: 'indigo',
      primary: 'indigo',
      card: 'white',
      border: 'red',
      notification: 'blue',
    };
  }
};
