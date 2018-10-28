import { StyleSheet, Dimensions } from 'react-native';
import * as defaultStyle from '../../style';

const STYLESHEET_ID = 'stylesheet.agenda.list';
const { width, height } = Dimensions.get('window');

export default function styleConstructor(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme };
  return StyleSheet.create({
    container: {
      flexDirection: 'column'
    },
    dayNum: {
      fontSize: 28,
      fontWeight: '200',
      color: appStyle.agendaDayNumColor
    },
    dayText: {
      fontSize: 14,
      fontWeight: '300',
      color: appStyle.agendaDayTextColor,
      marginTop: -5,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    day: {
      width: 63,
      alignItems: 'center',
      flexDirection : 'row',
      marginTop: 20,
      marginLeft: 20
    },
    today: {
      color: appStyle.agendaTodayColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
