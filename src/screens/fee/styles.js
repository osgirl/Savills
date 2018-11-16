import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
import { isIphoneX } from '@utils/func';

export default StyleSheet.create({
    ButtonAdd: {
        borderRadius: 25,
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: isIphoneX() ? 30 : 20,
        left: width / 2 - 25,
        backgroundColor: '#01C772',
        shadowColor: '#4DD49A',
        shadowOffset: { width: 3, height: 6 },
        shadowOpacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
      }
});