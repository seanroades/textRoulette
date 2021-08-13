import { StyleSheet } from 'react-native';
import themeStyles from './theme.styles';

export default StyleSheet.create({
  largeHeaderText:{
    fontSize: themeStyles.FONT_SIZE_LARGE,
    color: themeStyles.BG_LIGHT_COLOR,
    fontWeight: themeStyles.FONT_WEIGHT_HEAVY,
    paddingTop: '3%',
    textAlign: 'center'
  },
  mediumHeaderText: {
    fontSize: themeStyles.FONT_SIZE_MEDIUM,
    color: themeStyles.BG_LIGHT_COLOR,
    fontWeight: themeStyles.FONT_WEIGHT_MEDIUM,
    textAlign: 'center'
  },
  smallHeaderText: {
    fontSize: themeStyles.FONT_SIZE_SMALL,
    color: themeStyles.BG_LIGHT_COLOR,
    textAlign: 'left'
  },
  bg: {
    backgroundColor: themeStyles.BG_DARK_COLOR,
    flex: 1
  }
});