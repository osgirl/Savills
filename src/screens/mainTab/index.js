import React, { Component } from 'react';
import { Image, Platform, Text } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import TabBar from '@components/tabbar';

import TabEvents from '../tabEvents';
import TabWorkOrder from '../tabWorkOrders';
import TabBooking from '../tabBooking';
import TabFeeStatement from '../tabFeeStatement';

import IC_TABBAR from "@resources/icons/icon_tabbar.png";
import IC_TABBAR_AT from "@resources/icons/icon_tabbar_active.png";

const screens = {
    Events: {
        name: "Events",
        screen: TabEvents,
        id: 1,
        icon: IC_TABBAR,
        iconSelected: IC_TABBAR_AT,
        // styleIcon: {
        //     position: "absolute",
        //     top: -10
        // }
    },
    WorkOrder: {
        name: "WorkOrder",
        screen: TabWorkOrder,
        id: 2,
        icon: IC_TABBAR,
        iconSelected: IC_TABBAR_AT,
    },
    Booking: {
        name: "Booking",
        screen: TabBooking,
        id: 3,
        icon: IC_TABBAR,
        iconSelected: IC_TABBAR_AT,
    },
    FeeStatement: {
        name: "FeeStatement",
        screen: TabFeeStatement,
        id: 4,
        icon: IC_TABBAR,
        iconSelected: IC_TABBAR_AT,
    }
};

let Events = createStackNavigator(
    { Events: screens.Events },
    {
        navigationOptions: ({ navigation }) => ({
            header: null,
            gesturesEnabled: false,
        }),
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
            },
        }),
    },
);
let WorkOrder = createStackNavigator(
    { WorkOrder: screens.WorkOrder, },
    {
        navigationOptions: ({ navigation }) => ({
            header: null,
            gesturesEnabled: false,

        }),
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
            },
        }),
    },
);
let Booking = createStackNavigator(
    { Booking: screens.Booking },
    {
        navigationOptions: ({ navigation }) => ({
            header: null,
            gesturesEnabled: false,

        }),
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
            },
        }),
    },
);
let FeeStatement = createStackNavigator(
    { FeeStatement: screens.FeeStatement, },
    {
        navigationOptions: ({ navigation }) => ({
            header: null,
            gesturesEnabled: false,

        }),
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
            },
        }),
    },
);

let mainTabs = createBottomTabNavigator(
    {
        Events,
        WorkOrder,
        Booking,
        FeeStatement,
    },
    {
        initialRouteName: "Events",
        tabBarComponent: (props) => <TabBar {...props} screens={screens} initialRouteName={"Events"} />,

        // navigationOptions: ({ navigation }) => ({
        //     tabBarIcon: ({ focused, tintColor }) => {
        //         const { routeName } = navigation.state;
        //         let iconName;
        //         if (routeName === 'Events') {
        //             iconName = focused ? <Image source={IC_TABBAR_AT} style={{ width: 23, height: 23 }} /> : <Image source={IC_TABBAR} />
        //         } else if (routeName === 'WorkOrder') {
        //             iconName = focused ? <Image source={IC_TABBAR_AT} style={{ width: 23, height: 23 }} /> : <Image source={IC_TABBAR} />
        //         }
        //         else if (routeName === 'Booking') {
        //             iconName = focused ? <Image source={IC_TABBAR_AT} style={{ width: 23, height: 23 }} /> : <Image source={IC_TABBAR} />
        //         } else if (routeName === 'FeeStatement') {
        //             iconName = focused ? <Image source={IC_TABBAR_AT} style={{ width: 23, height: 23 }} /> : <Image source={IC_TABBAR} />
        //         }
        //         return iconName;
        //     }
        // }),
        // tabBarOptions: {
        //     showLabel: true,
        //     tinColor: '#fff',
        //     activeTintColor: '#01C772',
        //     inactiveTintColor: '#B7C1CB',
        //     lazyLoad: true,
        //     indicatorStyle: {
        //         backgroundColor: 'transparent'
        //     },
        //     style: {
        //         backgroundColor: '#FFF',
        //         borderTopWidth: 0,
        //     },
        //     labelStyle: {
        //         // color: '#B7C1CB',
        //         fontSize: 11,
        //     },
        // }
    },

);

mainTabs.navigationOptions = ({ navigation }) => ({
    header: null
})

export default mainTabs;
