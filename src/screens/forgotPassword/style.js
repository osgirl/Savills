import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

import Resolution from "../../utils/resolution";

const { width } = Dimensions.get('window');

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
    btnSent: {
        // position: 'absolute',
        // bottom: Resolution.scaleHeight(100),
        // marginBottom: 100,
        marginTop: 20,
        width: width - 120,
        marginHorizontal: 60
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