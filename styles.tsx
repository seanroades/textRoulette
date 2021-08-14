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
    marginBottom: '4%',
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
    marginBottom: '4%',
    marginRight: '2%', 
  },

  textBGFromTextUserResponse: {
    backgroundColor: themeStyles.ACCENT_COLOR,
    maxWidth: '100%',
    width: 'auto',
    borderRadius: themeStyles.TEXT_BORDER_RADIUS,
    height: '70%'
  },

  textBGContainerFromUser: {
    alignItems: 'flex-end'
  },
  mockKeyboard: {
    backgroundColor: 'rgba(40, 40, 40, 0.95)',
     height: '20%',
     position: 'absolute',
     left: 0,
     right: 0,
     bottom: 0,
     borderTopRightRadius: themeStyles.TEXT_BORDER_RADIUS
  },
  pointsAbsContainer: {
    position: 'absolute',
    top: 20,
    left: 30
  },
  pointsRelContainer: {
    backgroundColor: themeStyles.ACCENT_COLOR,
    height: '100%',
    width: '200%',
    position: 'relative',
    borderRadius: themeStyles.TEXT_BORDER_RADIUS
  }
  
});