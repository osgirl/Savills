import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Header from '@components/header'
import IC_MENU from "@resources/icons/icon_tabbar_active.png";

import LinearGradient from 'react-native-linear-gradient';
import { Calendar } from "../../components/calendars";
import Layout from './layout';

export default class Events extends Layout {

    constructor(props) {
        super(props);
        this.state = {
            selected: ['2018-10-31', '2018-10-29', '2018-10-20', '2018-10-19'],
            items: {}
        };
        
    }

    static navigationOptions = ({ navigation }) => ({
        header: <Header
            leftIcon={IC_MENU}
            leftAction={navigation.toggleDrawer}
            // center={function () {
            //     return <View><Text>{this.app.test}</Text></View>
            // }}
            rightIcon={IC_MENU}
            rightAction={() => alert('Notify')}
        />
    })

    mapObjectSelected() {
        let markedDateMap = {}
        this.state.selected.map(item => {
            markedDateMap[item] = {
                selected: true,
                // disableTouchEvent: true,
                selectedDotColor: 'orange',
                customStyles: {
                    container: {
                        backgroundColor: 'white',
                        elevation: 2
                    },
                    text: {
                        color: '#4A89E8',
                        fontWeight: 'bold'
                    },
                }
            }
        })
        return markedDateMap;
    }
}
