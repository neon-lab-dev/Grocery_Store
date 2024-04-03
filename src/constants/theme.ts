import {extendTheme} from 'native-base';
import {Colors} from './colors';
import {fontSize, fontWeight} from './fonts';
import {border} from './border';

export const theme = extendTheme({
  colors: Colors,
  fontSizes: fontSize,
  fontWeights: fontWeight,
  borderWidths: border,
});
