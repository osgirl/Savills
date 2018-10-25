import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Text
} from 'react-native';

import { SafeAreaView } from 'react-navigation';
// import Utils from '@utils';

const { width, height } = Dimensions.get("window");
export default class TabBar extends Component {
    static defaultProps = {
        screens: {},
    };

    constructor(props) {
        super(props);
        this.items = [];
        let tmp = [];
        Object.keys(this.props.screens).map(screenName => {
            let screen = this.props.screens[screenName];
            screen.selected = screen.name === this.props.initialRouteName;
            tmp[screen.id] = screen;
        })
        const totalItems = tmp.length;
        for (let i = 0; i < totalItems; i++) {
            tmp[i] !== undefined && this.items.push(tmp[i])
        }
        this.state = {
            isHidden: false
        }
    }

    async  componentWillReceiveProps(nextProps) {
        // if (nextProps.navigation.state.routes[0].routes[0].params) {
        //     await this.setState({ isHidden: nextProps.navigation.state.routes[0].routes[0].params.hiddenTab })
        // }

    }

    selectItem(item) {
        this.items.map(i => i.selected = false);
        item.selected = true;
        this.props.jumpTo(item.name);
        // if (Platform.OS === 'ios') {
        //     if (item.name === 'Profile') {
        //         StatusBar.setBarStyle('light-content');
        //     } else {
        //         StatusBar.setBarStyle('dark-content');
        //     }
        // }

    }

    render() {
        if (this.state.isHidden) {
            return null;
        }
        return (
            <SafeAreaView style={style.wrapper}>
                <View style={style.background} />
                <View style={style.container}>
                    {
                        this.items.map(item => (
                            <View
                                key={`tab_item_${item.id}`}
                                style={style.tabContainer}
                            >
                                <TouchableOpacity
                                    style={[item.styleIcon, style.touchContainer, { width: width / this.items.length }]}
                                    onPress={() => this.selectItem(item)}
                                >
                                    <Image style={{

                                    }} source={item.selected ? item.iconSelected : item.icon} />
                                    <View style={{ marginBottom: 10, marginTop: 5 }}>
                                        <Text style={[style.lable, { color: item.selected ? '#01C772' : '#B7C1CB' }]}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    wrapper: {
        height: 60,
        // justifyContent: "flex-end",
        // marginTop: -20
        backgroundColor: "#FFF"
    },
    container: {
        height: 60,
        flexDirection: 'row',
        // paddingTop: 10,
    },
    background: {
        height: 40,
        width: width,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#FFF"
    },
    tabContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: 'center',
        alignSelf: 'center',
        // flexDirection: 'row',
        zIndex: 1,
        alignItems: 'center',
    },
    touchContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // height: 60,
        paddingTop: 10,
        // backgroundColor: 'red'
    },
    lable: {
        fontSize: 10
    }
});