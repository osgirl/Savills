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
    ActivityIndicator, Platform
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
import IC_INBOXEMTY from "@resources/icons/inbox_emty.png";
import Configs from ".././../utils/configs";
import ModalNew from "./components/modalNew";
import { ItemPlaceHolderH } from "../../components/placeHolderItem";
import { isIphoneX } from '@utils/func';
import Styles from "./styles";

import Language from '../../utils/language';

import ModalDetail from "./components/modalDetail";

const { width } = Dimensions.get('window');

export default class extends Component {

    handleScroll = event => {
        const scrollSensitivity = Platform.OS === 'ios' ? 1.5 : 5;
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
                listener: event => {
                    const offset = event.nativeEvent.contentOffset.y / scrollSensitivity
                    this.state.scrollY.setValue(offset);
                }
            },
            { useNativeDriver: true }
        )(event);
    };

    render() {
        let unitActive = this.props.units.unitActive;
        let LG = Language.listLanguage[this.props.app.languegeLocal].data;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 10, 30],
            outputRange: [60, 30, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, 30],
            outputRange: [0, -50],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const fontSize = this.state.scrollY.interpolate({
            inputRange: [0, 0, 100],
            outputRange: [30, 30, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
        const opacityText = this.state.scrollY.interpolate({
            inputRange: [0, 30, 60],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const opacityTextHeader = this.state.scrollY.interpolate({
            inputRange: [0, 30],
            outputRange: [0, 1],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        return (
            <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                <StatusBar barStyle="light-content" />
                <Header
                    LinearGradient={true}
                    leftIcon={IC_BACK}
                    leftAction={() => this.props.navigation.goBack()}
                    headercolor={'transparent'}
                    showTitleHeader={true}
                    center={
                        <Animated.View style={{ opacity: opacityTextHeader }}>
                            <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{LG.IB_TITLEHEADER}</Text>
                        </Animated.View>
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
                <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: width, zIndex: -10 }}>
                    <Animated.View
                        style={{
                            transform: [{ translateY: headerTranslate }],
                            height: headerHeight,
                        }}
                    >
                        <Animated.View style={{ opacity: opacityText, position: 'absolute', }}>
                            <HeaderTitle title={LG.IB_TITLEHEADER} />
                        </Animated.View>
                    </Animated.View>
                </LinearGradient>
                <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1, zIndex: 1 }}>
                    <ScrollableTabView
                        tabBarActiveTextColor={'#FFF'}
                        tabBarInactiveTextColor={'rgba(255,255,255,0.9)'}
                        tabBarUnderlineStyle={{ backgroundColor: '#FFF' }}
                        tabBarBackgroundColor={'transparent'}
                        locked={true}
                    >
                        {this.ViewInbox(this.state.data)}
                        {this.ViewSend(this.state.dataToManager)}
                        {this.ViewStorage(this.state.dataIsActive)}

                    </ScrollableTabView>
                </LinearGradient>
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isModalSelectUnit}>
                    <ModalSelectUnit
                        onClose={() => this._closeModalSelectUnit()}
                    />
                </Modal>
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isModalDetail}>
                    <ModalDetail
                        inboxId={this.state.inboxId}
                        onClose={() => this._closeModalDetail()}
                    />
                </Modal>
                <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalNew}>
                    <ModalNew onClose={() => this._onCloseModalNew()} />
                </Modal>
            </View >
        );
    }

    renderEmty(name) {
        if (name === 'new' && this.props.inbox.listInbox.totalCount === 0) {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Image source={IC_INBOXEMTY} />
                <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>{'Chưa có tin nhắn mới'}</Text>
            </View>
        } else if (name === 'store' && this.props.inbox.listInboxIsActive.totalCount === 0) {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Image source={IC_INBOXEMTY} />
                <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>{'Chưa có tin nhắn nào đã lưu'}</Text>
            </View>
        }
        else if (name === 'send' && this.props.inbox.listInboxToManager.totalCount === 0) {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Image source={IC_INBOXEMTY} />
                <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>{'Chưa có tin nhắn nào đã gửi'}</Text>
            </View>
        } else {
            <View style={{ alignItems: 'center', }}>
                <ActivityIndicator
                    size={'large'}
                    color={Configs.colorMain}
                />
            </View>
        }
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
        let LG = Language.listLanguage[this.props.app.languegeLocal].data;
        return (
            <View tabLabel={LG.IB_TITLE_TAB_NEW} style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                {
                    this.props.inbox.listInboxFromManager.totalCount === 0 ?
                        this.renderEmty('new') :
                        list.length > 0 ?
                            <View style={{ paddingHorizontal: 20 }}>
                                <SwipeListView
                                    useFlatList
                                    alwaysBounceVertical={false}
                                    showsVerticalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    keyExtractor={(item, index) => item.id.toString()}
                                    data={list}
                                    refreshing={this.state.isRefresh}
                                    onRefresh={() => this._onRefresh()}
                                    renderHiddenItem={({ item, index }) => this.renderHiddenRow(item, index)}
                                    rightOpenValue={-80}
                                    renderItem={({ item, index }) => this.renderItem(item, index)}
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
                            :
                            <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                                <ItemPlaceHolderH noMargin />
                            </View>
                }
            </View>

        );
    };

    ViewStorage = list => {
        let LG = Language.listLanguage[this.props.app.languegeLocal].data;
        return (
            <View tabLabel={LG.IB_TITLE_TAB_STORE} style={{ flex: 1, backgroundColor: '#F6F8FD', paddingHorizontal: 20 }}>
                {
                    this.props.inbox.listInboxIsActive.totalCount === 0 ?
                        this.renderEmty('store') :
                        list.length > 0 ?
                            <SwipeListView
                                useFlatList
                                alwaysBounceVertical={false}
                                showsVerticalScrollIndicator={false}
                                scrollEventThrottle={16}
                                keyExtractor={(item, index) => item.id.toString()}
                                data={list}
                                onScroll={this.handleScroll}
                                scrollEventThrottle={16}
                                refreshing={this.state.isRefreshActive}
                                onRefresh={() => this._onRefreshIsActive()}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                onEndReachedThreshold={0.01}
                                onEndReached={() => this._onEndReachedInboxActive()}
                                legacyImplementation={false}
                                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                                ListHeaderComponent={() => <View style={{ height: 20, }} />}
                                ListFooterComponent={() => this._FooterFlatlist()}
                            />
                            :
                            <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                                <ItemPlaceHolderH noMargin />
                            </View>
                }
            </View>
        );
    };

    ViewSend = list => {
        let LG = Language.listLanguage[this.props.app.languegeLocal].data;
        return (
            <View tabLabel={LG.IB_TITLE_TAB_SEND} style={{ flex: 1, backgroundColor: '#F6F8FD', paddingHorizontal: 20 }}>
                {
                    this.props.inbox.listInboxIsActive.totalCount === 0 ?
                        this.renderEmty('send') :
                        list.length > 0 ?
                            <SwipeListView
                                useFlatList
                                alwaysBounceVertical={false}
                                showsVerticalScrollIndicator={false}
                                scrollEventThrottle={16}
                                keyExtractor={(item, index) => item.id.toString()}
                                data={list}
                                onScroll={this.handleScroll}
                                scrollEventThrottle={16}
                                refreshing={this.state.isRefreshActive}
                                onRefresh={() => this._onRefreshInBoxToManager()}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                renderHiddenItem={({ item, index }) => this.renderHiddenRow(item, index)}
                                rightOpenValue={-80}
                                onEndReachedThreshold={0.01}
                                onEndReached={() => this._onEndReachedInboxToManager()}
                                legacyImplementation={false}
                                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                                ListHeaderComponent={() => <View style={{ height: 20, }} />}
                                ListFooterComponent={() => this._FooterFlatlist()}
                            />
                            :
                            <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                                <ItemPlaceHolderH noMargin />
                            </View>
                }
                <View
                    style={{
                        backgroundColor: '#FFF',
                        width: width,
                        height: isIphoneX() ? Resolution.scaleHeight(60) : Resolution.scaleHeight(40)
                    }}
                />
                <Button onPress={() => this._openModalNew()} style={[Styles.ButtonAdd, {}]}>
                    <Image source={require('../../resources/icons/plush-addnew.png')} />
                </Button>
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
                onPress={() => this._openModalDetail(item.id)}
                key={item.id}
                style={{
                    width: width - 40,
                    borderRadius: 5,
                    // marginTop: index === 0 ? 20 : 10,
                    backgroundColor: '#FFF',
                    padding: 20,

                }}
            >

                <View style={{ flexDirection: 'row' }}>
                    <FastImage
                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                        source={image}
                    />
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={{
                            fontFamily: 'OpenSans-SemiBold',
                            color: item.state ? '#BABFC8' : '#343D4D',
                            textAlign: 'left',
                            marginRight: Resolution.scale(20),
                            fontSize: Resolution.scale(12),
                        }} numberOfLines={2}>
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

