import {
    StyleSheet,
    Platform
} from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8FD'
    },
    txtTop: {
        fontSize: 15,
        color: '#505E75',
        textAlign: 'center',
        marginHorizontal: 60,
        fontFamily: 'OpenSans-Bold'
    },
    btnLanguage: {
        position: 'absolute', top: Platform.OS !== 'ios' ? 20 : 40, right: 20
    },
    btnSave: {
        alignItems: 'center',
        borderRadius: 33,
        marginBottom: 100,
    }
})

export default style;