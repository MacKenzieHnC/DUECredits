import {useColorScheme} from 'react-native';

type Theme = {
  dark: boolean;
  colors: {
    text: string;
    background: string;
    highlight: string;
    primary: string;
    card: string;
    border: string;
    notification: string;
    placeholder: string;
  };
};

export const useTheme = (): Theme => {
  let colorScheme = useColorScheme();
  if (colorScheme === 'dark') {
    return {
      dark: true,
      colors: {
        text: 'white',
        placeholder: 'white',
        background: 'muted.900',
        highlight: 'white',
        primary: 'indigo',
        card: 'rgb(20,10,40)',
        border: 'white',
        notification: 'blue',
      },
    };
  } else {
    return {
      dark: false,
      colors: {
        text: 'black',
        placeholder: 'black',
        background: 'muted.50',
        highlight: 'indigo',
        primary: 'indigo',
        card: 'white',
        border: 'red',
        notification: 'blue',
      },
    };
  }
};
