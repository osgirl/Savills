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
        // alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: '#F6F8FD'
    },
    btnLeft: {
        position: 'absolute', top: 20, left: 0, zIndex: 2
    },
    btnRight: {
        position: 'absolute', top: 20, right: 0, zIndex: 2
    },
    imgAvatar: {
        height: Resolution.scaleHeight(220),
        width: width
    },
    content: {
        marginTop: Resolution.scaleHeight(200),
        width: width - 40,
        alignSelf: 'center'
    },
    block1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 20
    },
    block2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: 5, padding: 20,
        marginVertical: 10
    },
    btnBlock: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
    },
    txtBlock: {
        fontSize: 13, fontFamily: 'OpenSans-SemiBold', marginLeft: 10
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