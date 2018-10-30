import {
    StyleSheet,
    Platform
} from 'react-native';

import Configs from "../../utils/configs";
import Resolution from "../../utils/resolution";

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F6F8FD'
    },
    txtTop: {
        fontSize: 15,
        color: '#505E75',
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
        lineHeight: 28
    },
    btnLanguage: {
        position: 'absolute', top: Platform.OS !== 'ios' ? 20 : 40, right: 20
    },
    btnLogin: {
        alignItems: 'center',
        borderRadius: 33,
    },
    modalContent: {
        backgroundColor: "white",
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        height: Resolution.scaleHeight(180),
        borderRadius: 8
    },
    errorTextinput: {
        borderWidth: 1,
        borderColor: '#D75A4A'
    }
})

export default style;