import {
    StyleSheet,
    Platform
} from 'react-native';

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
        marginHorizontal: 60
    },
    btnLanguage: {
        position: 'absolute', top: Platform.OS !== 'ios' ? 20 : 40, right: 20
    },
    btnSent: {
        alignItems: 'center',
        borderRadius: 33,
        marginBottom: 100,
        marginTop: 20,
    }
})

export default style;