import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Animated,
    StatusBar,
    Dimensions
} from 'react-native';

import ItemHome from "@components/itemHome";
import ItemListViewHome from "@components/itemListViewHome";
import Modal from "react-native-modal";
import Loading from "@components/loading";
import Profile from "../profile";
import Style from "./style";
import Button from "../../components/button";
import Utils from "../../utils";

import IC_GRIDVIEW_ACTIVE from "../../resources/icons/Grid-view-active.png";
import IC_GRIDVIEW from "../../resources/icons/Grid-view.png";
import IC_LISTVIEW_ACTIVE from "../../resources/icons/list-view-active.png";
import IC_LISTVIEW from "../../resources/icons/list-view.png";

const { width } = Dimensions.get('window');

const imgSize = 64;

export default class extends Component {

    renderLoading() {
        if (this.state.loading) {
            return <Loading
                style={{ zIndex: 30 }}
                visible={this.state.loading}
                onRequestClose={() => { }}
            />
        }
        return null;
    }

    handleScroll = (event) => {
        let User = this.props.userProfile.profile && this.props.userProfile.profile.result && this.props.userProfile.profile.result.user;
        let imageProfile = this.props.userProfile.imageProfile && this.props.userProfile.imageProfile.result && this.props.userProfile.imageProfile.result.profilePicture;
        let Unit = this.props.units.unitActive;
        var avatar = `data:image/png;base64,${imageProfile}`;
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
                listener: event => {
                    if (event.nativeEvent.contentOffset.y > 70) {
                        if (!this.showCenter) {
                            this.showCenter = true
                            this.props.navigation.setParams({ isHidenHeaderHome: true });
                            this.props.navigation.setParams({ userDisplayname: User.displayName });
                            this.props.navigation.setParams({ userFullUnitCode: Unit.fullUnitCode });
                            this.props.navigation.setParams({ userAvatar: avatar });
                        }
                    } else {
                        if (this.showCenter) {
                            this.showCenter = false
                            this.props.navigation.setParams({ isHidenHeaderHome: false });
                        }
                    }
                }
            }
        )(event)
    }

    renderHeader() {
        let User = this.props.userProfile.profile && this.props.userProfile.profile.result && this.props.userProfile.profile.result.user;
        let imageProfile = this.props.userProfile.imageProfile && this.props.userProfile.imageProfile.result && this.props.userProfile.imageProfile.result.profilePicture;
        let Unit = this.props.units.unitActive;
        var avatar = `data:image/png;base64,${imageProfile}`;
        return (
            <View style={{ width: width }}>
                <Button
                    onPress={() => { this._openProfile() }}
                    style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
                    <Image source={{ uri: avatar }}
                        style={{ width: imgSize, height: imgSize, borderRadius: imgSize / 2 }}
                    />
                    {
                        User && <Text style={Style.displayName}>
                            {'Hey!! ' + User.displayName}
                        </Text>
                    }
                    <Text style={Style.unitCode}>
                        {Unit.fullUnitCode}
                    </Text>
                </Button>
                {/* <View style={{ backgroundColor: 'red' }}> */}
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginHorizontal: 20 }}>
                        <Button
                            disabled={this.state.numcolumn === 2 ? true : false}
                            style={Style.btnGrid}
                            onPress={() => this._onChangeNumColumn('2')}
                        >
                            <Image source={this.state.numcolumn === 2 ? IC_GRIDVIEW_ACTIVE : IC_GRIDVIEW} />
                        </Button>
                        <Button
                            disabled={this.state.numcolumn !== 2 ? true : false}
                            style={Style.btnList}
                            onPress={() => this._onChangeNumColumn('1')}
                        >
                            <Image source={this.state.numcolumn !== 2 ? IC_LISTVIEW_ACTIVE : IC_LISTVIEW} />
                        </Button>
                    </View>
                {/* </View> */}
            </View>
        )
    }

    _onChangeNumColumn(num) {
        this.setState({ numcolumn: Number(num) })
    }

    renderItem(item, loading) {
        if (this.state.numcolumn === 1) {
            return <ItemListViewHome
                title={item.title}
                image={item.key}
                loading={loading}
            />
        } else {
            return <ItemHome
                title={item.title}
                image={item.key}
                loading={loading}
            />
        }
    }

    render() {
        StatusBar.setHidden(this.state.isShowProfile)
        let User = this.props.userProfile.profile && this.props.userProfile.profile.result && this.props.userProfile.profile.result.user;
        let imageProfile = this.props.userProfile.imageProfile && this.props.userProfile.imageProfile.result && this.props.userProfile.imageProfile.result.profilePicture;
        var avatar = `data:image/png;base64,${imageProfile}`;
        let data = this.state.dataModule && this.state.dataModule.length > 0 ? this.state.dataModule : Utils.dataPlaceholder;
        return (
            <View style={Style.container}>
                <View style={{}}>
                    <FlatList
                        data={data}
                        horizontal={false}
                        key={(this.state.numcolumn === 2 ? 'h' : 'v')}
                        contentContainerStyle={{ alignItems: 'center' }}
                        keyExtractor={(item) => item.id + ''}
                        numColumns={this.state.numcolumn || 2}
                        renderItem={({ item, index }) => (
                            this.renderItem(item, this.state.dataModule && this.state.dataModule.length > 0 ? true : false)
                        )}
                        onScroll={this.handleScroll}
                        legacyImplementation={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}

                        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                        ListHeaderComponent={() => this.renderHeader()}
                        ListFooterComponent={() => <View style={{ width: 20 }} />}
                    />
                </View>
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isShowProfile}>
                    <Profile
                        onClose={() => this._closeProfile()}
                        onLogOut={() => this._logOut()}
                        loading={this.state.loading}
                        profile={User}
                        imageProfile={avatar}
                    />
                </Modal>
                {/* {this.renderLoading()} */}
            </View>
        );
    }
}