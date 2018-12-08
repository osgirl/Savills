import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
import { isIphoneX } from '@utils/func';

import Resolution from "../../utils/resolution";

export default StyleSheet.create({
    ButtonAdd: {
        borderRadius: Resolution.scale(50) / 2,
        width: Resolution.scale(50),
        height: Resolution.scale(50),
        position: 'absolute',
        bottom: isIphoneX() ? Resolution.scale(30) : Resolution.scale(20),
        left: width / 2 - 25,
        backgroundColor: '#01C772',
        // shadowColor: '#4DD49A',
        // shadowOffset: { width: 3, height: 6 },
        // shadowOpacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});