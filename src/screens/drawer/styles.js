'use strict';

import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#000F'
    },
    imgBackground: {
        flex: 2.5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 7,
        backgroundColor: '#ffff'
    },
    btn: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 40
    },
    btnChild: {
        width: 265,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    btnCategory: {
        marginTop: 40,
        flexDirection: 'row',
        marginHorizontal: 40
    },
    iconLeft: {
        marginRight: 20
    },
    iconRight: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    viewBottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    btnBottom: {
        backgroundColor: '#000000',
        borderRadius: 30,
        marginLeft: 15
    }
});

export default style;
