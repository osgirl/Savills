import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    RefreshControl,
    FlatList,
    Dimensions,
    Animated,
    ActivityIndicator
} from 'react-native';

import ScrollableTabView from '@components/react-native-scrollable-tab-view';
import { SwipeListView } from 'react-native-swipe-list-view';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@components/header';
import Button from '@components/button';
import HeaderTitle from '@components/headerTitle';
import moment from 'moment';
import Resolution from "@utils/resolution";
import FastImage from "@components/fastImage";
import ModalSelectUnit from "@components/modalSelectUnit";
import Modal from "react-native-modal";

import IC_BACK from '@resources/icons/back-light.png';
import IC_DROPDOWN from '@resources/icons/dropDown.png';
import IC_STORAGE_GREEN from '@resources/icons/Storage_green.png';
import IC_DEL from '@resources/icons/del.png';
import IC_STORAGE from '@resources/icons/Storage.png';
import IC_AVATAR_DF from "@resources/icons/avatar-default.png";
import IC_NO_INBOX from "@resources/icons/inbox.png";
import Configs from ".././../utils/configs";

const { width } = Dimensions.get('window');

export default class extends Component {

    handleScroll = event => {
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
                listener: event => {
                    if (event.nativeEvent.contentOffset.y > 40) {
                        if (!this.showCenter) {
                            this.showCenter = true;
                            this.setState({ isShowTitleHeader: true });
                        }
                    } else {
                        if (this.showCenter) {
                            this.showCenter = false;
                            this.setState({ isShowTitleHeader: false });
                        }
                    }
                }
            },
            { useNativeDriver: true }
        )(event);
    };

    render() {
        let unitActive = this.props.units.unitActive;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 10, 40, 60],
            outputRange: [60, 40, 10, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const fontSize = this.state.scrollY.interpolate({
            inputRange: [0, 0, 100],
            outputRange: [30, 30, 0],
            extrapolate: 'clamp'
        });
        const opacityText = this.state.scrollY.interpolate({
            inputRange: [0, 30, 60],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const opacityText2 = this.state.scrollY.interpolate({
            inputRange: [0, 60, 100],
            outputRange: [1, 0.3, 0],
            extrapolate: 'clamp'
        });

        return (
            <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                <StatusBar barStyle="light-content" />
                <Header
                    LinearGradient={true}
                    leftIcon={IC_BACK}
                    leftAction={() => this.props.navigation.goBack()}
                    headercolor={'transparent'}
                    showTitleHeader={this.state.isShowTitleHeader}
                    center={
                        <View>
                            <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>Inbox</Text>
                        </View>
                    }
                    renderViewRight={
                        <Button
                            onPress={() => this.setState({ isModalSelectUnit: true })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                        >
                            <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 14 }}>{unitActive.fullUnitCode}</Text>
                            <Image source={IC_DROPDOWN} style={{ marginLeft: 10 }} />
                        </Button>
                    }
                />
                <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }}>
                    <Animated.View style={{ height: headerHeight }}>
                        <Animated.View style={{ opacity: opacityText }}>
                            <HeaderTitle title={'Inbox'} />
                        </Animated.View>
                    </Animated.View>
                    {/* <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{}}>
                        <View style={{ height: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ marginLeft: 20 }}>
                                <Button>
                                    <Image source={IC_DEL} />
                                </Button>
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                <Button
                                    style={{ marginRight: 40 }}
                                >
                                    <Image source={IC_STORAGE} />
                                </Button>
                                <Button>
                                    <Image source={IC_DEL} />
                                </Button>
                            </View>
                        </View>
                    </LinearGradient> */}
                    <ScrollableTabView
                        tabBarActiveTextColor={'#FFF'}
                        tabBarInactiveTextColor={'rgba(255,255,255,0.5)'}
                        tabBarUnderlineStyle={{ backgroundColor: '#FFF' }}
                        tabBarBackgroundColor={'transparent'}
                        locked={true}
                    >
                        {this.ViewInbox()}
                        {this.ViewStorage()}
                    </ScrollableTabView>
                </LinearGradient>
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isModalSelectUnit}>
                    <ModalSelectUnit
                        onClose={() => this._closeModalSelectUnit()}
                    />
                </Modal>
            </View>
        );
    }

    renderEmty() {
        return <View style={{ alignItems: 'center', marginTop: 30 }}>
            <Image source={IC_NO_INBOX} />
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, color: '#BABFC8', marginVertical: 20 }}>
                Chưa có tin nhắn nào
        </Text>
        </View>
    }

    _FooterFlatlist() {
        return this.state.loadingMore || this.state.loadingMoreInboxActive ? (
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Configs.colorMain} />
            </View>
        ) : (
                <View style={{ height: 20 }} />
            );
    }

    renderHiddenRow(item, index) {
        return (
            <Button onPress={() => this._setInboxActive(item.id)}
                style={{
                    alignItems: 'center',
                    bottom: 0,
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    borderRadius: 5,
                    right: 0,
                    backgroundColor: '#C4EEE0',
                    width: 80
                    // marginTop: (index == 0 ? 20 : 10)
                }}>
                <Image
                    source={IC_STORAGE_GREEN}
                />
            </Button >
        );
    }

    ViewInbox = list => {
        return (
            <View tabLabel="New" style={{ flex: 1, backgroundColor: '#F6F8FD', paddingHorizontal: 20 }}>
                <SwipeListView
                    useFlatList
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.state.data}
                    refreshing={this.state.isRefresh}
                    onRefresh={() => this._onRefresh()}
                    renderHiddenItem={({ item, index }) => this.renderHiddenRow(item, index)}
                    rightOpenValue={-80}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    ListEmptyComponent={() => this.renderEmty()}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => this._onEndReached()}
                    legacyImplementation={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    ListHeaderComponent={() => <View style={{ height: 20, }} />}
                    ListFooterComponent={() => this._FooterFlatlist()}
                />
            </View>
        );
    };

    ViewStorage = list => {
        return (
            <View tabLabel="Storage" style={{ flex: 1, backgroundColor: '#F6F8FD', paddingHorizontal: 20 }}>
                <SwipeListView
                    useFlatList
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.state.dataIsActive}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    refreshing={this.state.isRefreshActive}
                    onRefresh={() => this._onRefreshIsActive()}
                    // renderHiddenItem={(item, index) => this.renderHiddenRow(item, index)}
                    // rightOpenValue={-80}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    ListEmptyComponent={() => this.renderEmty()}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => this._onEndReachedInboxActive()}
                    legacyImplementation={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    ListHeaderComponent={() => <View style={{ height: 20, }} />}
                    ListFooterComponent={() => this._FooterFlatlist()}
                />
            </View>
        );
    };

    renderItem = (item, index) => {
        let date = moment(item.creationTime).format('l');
        let time = moment(item.creationTime).format('LT');
        let encToken = this.props.account.encToken;
        let image = item.fileUrl ? `${item.fileUrl.fileUrl}&encToken=${encodeURIComponent(encToken)}` : IC_AVATAR_DF;
        return (
            <Button
                activeOpacity={1}
                onPress={() => { }}
                key={item.id}
                style={{
                    width: width - 40,
                    borderRadius: 5,
                    // marginTop: index === 0 ? 20 : 10,
                    backgroundColor: '#FFF',
                    padding: 20
                }}
            >

                <View style={{ flexDirection: 'row' }}>
                    <FastImage
                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                        source={image}
                    />
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontFamily: 'OpenSans-Bold', color: '#505E75', textAlign: 'left', marginRight: 20, fontSize: 10, lineHeight: 14 }} numberOfLines={2}>
                            {item.subject}
                        </Text>
                        <View
                            style={{ flex: 1, marginTop: 5, flexDirection: 'row', alignItems: 'center', }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                                <Image style={{ marginRight: 10 }} source={require('../../resources/icons/clock.png')} />
                                <Text style={{ color: '#C9CDD4', fontSize: 12 }}>{time}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ marginRight: 10 }} source={require('../../resources/icons/calendar.png')} />
                                <Text style={{ color: '#C9CDD4', fontSize: 12 }}>{date}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </Button >
        );
    };
}

