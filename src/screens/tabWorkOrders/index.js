import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '@components/header'
import IC_MENU from "@resources/icons/icon_tabbar_active.png";

export default class TabWorkOrder extends Component {
    
    static navigationOptions = ({ navigation }) => ({
        header: <Header
            leftIcon={IC_MENU}
        leftAction={navigation.toggleDrawer}
        // center={function () {
        //     return <View><Text>{this.app.test}</Text></View>
        // }}
        // rightIcon={IC_MENU}
        // rightAction={() => alert('Notify')}
        />
    })

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Work Order</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
