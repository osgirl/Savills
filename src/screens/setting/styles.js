import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
import Resolution from '@utils/resolution';

export default StyleSheet.create({
  titleHeader: {
    color: '#505E75',
    fontSize: 14,
    flex: 1,
    fontFamily: 'OpenSans-Bold',
  },
  modalContent: {
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: Resolution.scaleHeight(180),
    borderRadius: 8
  }
});
