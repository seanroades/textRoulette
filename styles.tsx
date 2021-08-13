import { StyleSheet } from 'react-native';
import themeStyles from './Theme.styles';

export default StyleSheet.create({
  largeHeaderText:{
    fontSize: themeStyles.FONT_SIZE_LARGE,
    color: themeStyles.BG_LIGHT_COLOR,
    fontWeight: themeStyles.FONT_WEIGHT_HEAVY,
    textAlign: 'center'
  },
  mediumHeaderText: {
    fontSize: themeStyles.FONT_SIZE_MEDIUM,
    color: themeStyles.BG_LIGHT_COLOR,
    fontWeight: themeStyles.FONT_WEIGHT_MEDIUM,
    textAlign: 'left',
  },
  smallHeaderText: {
    fontSize: themeStyles.FONT_SIZE_SMALL,
    color: themeStyles.BG_LIGHT_COLOR,
    textAlign: 'center',
  },
  bg: {
    backgroundColor: themeStyles.BG_DARK_COLOR,
    flex: 1
  },
  textBGFromTextRoulette: {
    backgroundColor: themeStyles.PRIMARY_COLOR,
    maxWidth: '70%',
    width: 'auto',
    borderRadius: themeStyles.TEXT_BORDER_RADIUS,
    marginTop: '4%',
    marginLeft: '2%'
  },
  textBGContainerFromRoulette: {
    alignItems: 'flex-start'
  },
  textBGFromTextUser: {
    backgroundColor: themeStyles.ACCENT_COLOR,
    maxWidth: '70%',
    width: 'auto',
    borderRadius: themeStyles.TEXT_BORDER_RADIUS,
    marginTop: '4%',
    marginRight: '2%'
  },
  textBGContainerFromUser: {
    alignItems: 'flex-end'
  }
});