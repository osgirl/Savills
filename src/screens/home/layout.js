import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Animated,
    StatusBar
} from 'react-native';

import ItemHome from "@components/itemHome";
import Modal from "react-native-modal";
import Loading from "@components/loading";
import Profile from "../profile";
import Style from "./style";
import Button from "../../components/button";
import Utils from "../../utils";

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

    render() {
        StatusBar.setHidden(this.state.isShowProfile)
        let User = this.props.userProfile.profile && this.props.userProfile.profile.result && this.props.userProfile.profile.result.user;
        let imageProfile = this.props.userProfile.imageProfile && this.props.userProfile.imageProfile.result && this.props.userProfile.imageProfile.result.profilePicture;
        let Unit = this.props.units.unitActive;
        var avatar = `data:image/png;base64,${imageProfile}`;
        let data = this.state.dataModule && this.state.dataModule.length > 0 ? this.state.dataModule : Utils.dataPlaceholder;
        return (
            <View style={Style.container}>
                <View style={{}}>
                    <FlatList
                        data={data}
                        contentContainerStyle={{ paddingVertical: 5 }}
                        keyExtractor={(item) => item.id + ''}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return <ItemHome
                                title={item.title}
                                image={item.key}
                                loading={this.state.dataModule && this.state.dataModule.length > 0 ? true : false}
                            />
                        }}
                        onScroll={this.handleScroll}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                        ListHeaderComponent={() =>
                            <Button
                                onPress={() => { this._openProfile() }}
                                style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
                                <Image source={{ uri: avatar }}
                                    style={{ width: imgSize, height: imgSize, borderRadius: imgSize / 2 }}
                                />
                                {
                                    User && <Text style={{ fontSize: 25, color: '#505E75', textAlign: 'center', marginTop: 20, marginBottom: 6, fontFamily: 'OpenSans-Bold' }}>
                                        {'Hey!! ' + User && User.displayName}
                                    </Text>
                                }
                                <Text style={{ fontSize: 18, color: '#BABFC8', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>
                                    {Unit.fullUnitCode}
                                </Text>
                            </Button>
                        }
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