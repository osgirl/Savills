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
        fontSize: 25,
        color: '#505E75',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 6,
        fontFamily: 'OpenSans-Bold',
        marginHorizontal: Resolution.scaleWidth(60)
    },
    unitCode: {
        fontSize: 18,
        color: '#BABFC8',
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular'
    },
    btnGrid: {
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    },
    btnList: {
        paddingLeft: 15,
        paddingBottom: 10,
        paddingTop: 10
    }
})

export default style;