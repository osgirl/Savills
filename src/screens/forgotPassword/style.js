import {
    StyleSheet,
    Platform
} from 'react-native';

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
        marginHorizontal: 60,
        fontFamily: 'OpenSans-Bold',
        lineHeight: 28
    },
    btnLanguage: {
        position: 'absolute', top: Platform.OS !== 'ios' ? 20 : 40, right: 20
    },
    btnSent: {
        marginBottom: 100,
        marginTop: 20,
    },
    modalContent: {
        backgroundColor: "white",
        // padding: 22,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 14,
        borderColor: "rgba(0, 0, 0, 0.1)",
        height: Resolution.scaleHeight(228)
    },
})

export default style;