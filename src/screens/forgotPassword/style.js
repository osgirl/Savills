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
        fontSize: Resolution.scale(15),
        color: '#505E75',
        textAlign: 'center',
        marginHorizontal: Resolution.scale(20),
        fontFamily: 'OpenSans-Bold',
        lineHeight: Resolution.scale(28)
    },
    btnSent: {
        // position: 'absolute',
        // bottom: Resolution.scaleHeight(100),
        // marginBottom: Resolution.scale(100),
        marginTop: Resolution.scale(20),
        width: width - Resolution.scaleWidth(120),
        marginHorizontal: Resolution.scale(60)
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