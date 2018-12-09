import {
    StyleSheet,
    Platform
} from 'react-native';

import Resolution from "../../utils/resolution";

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: '#F6F8FD'
    },
    txtTop: {
        fontSize: 15,
        color: '#505E75',
        textAlign: 'center'
    },
    btnLanguage: {
        position: 'absolute', top: Platform.OS !== 'ios' ? 20 : 40, right: 20
    },
    btnLogin: {
        alignItems: 'center',
        borderRadius: 33
    },
    displayName: {
        fontSize: Resolution.scale(25),
        color: '#505E75',
        textAlign: 'center',
        marginTop: Resolution.scale(20),
        marginBottom: Resolution.scale(6),
        fontFamily: 'OpenSans-Bold',
    },
    unitCode: {
        fontSize: Resolution.scale(18),
        color: '#BABFC8',
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular'
    },
    btnGrid: {
        paddingRight: Resolution.scale(15),
        paddingTop: Resolution.scale(10),
        paddingBottom: Resolution.scale(10),
        paddingLeft: Resolution.scale(10)
    },
    btnList: {
        paddingLeft: Resolution.scale(15),
        paddingBottom: Resolution.scale(10),
        paddingTop: Resolution.scale(10)
    }
})

export default style;