import { createTheme } from '@mantine/core';
import { myOrange, myBlue, myBlack, myState } from 'shared/constants/myColors';

export const theme = createTheme({
  fontFamily: 'Manrope, sans-serif',
  colors: {
    myOrange,
    myBlue,
    myBlack,
    myState,
  },
});
