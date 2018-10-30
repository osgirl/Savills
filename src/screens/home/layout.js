import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Animated
} from 'react-native';

import ItemHome from "@components/itemHome";
import Modal from "react-native-modal";
import Loading from "@components/loading";
import Profile from "../profile";
import Style from "./style";
import Button from "../../components/button";

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
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
                listener: event => {
                    if (event.nativeEvent.contentOffset.y > 70) {
                        if (!this.showCenter) {
                            this.showCenter = true
                            this.props.navigation.setParams({ isHidenHeaderHome: true })
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
        return (
            <View style={Style.container}>
                <View style={{}}>
                    <FlatList
                        data={this.state.dataModule}
                        contentContainerStyle={{ paddingVertical: 5 }}
                        keyExtractor={(item) => item.id + ''}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return <ItemHome
                                title={item.title}
                                image={item.key}
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
                                <Image source={{ uri: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/26168307_1832573663480180_5899833810848274293_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn5-6.fna&oh=fa469d9c20f13899bd5f8757b5b675e1&oe=5C84EE81' }}
                                    style={{ width: imgSize, height: imgSize, borderRadius: imgSize / 2 }}
                                />
                                <Text style={{ fontSize: 25, color: '#505E75', textAlign: 'center', marginTop: 20, marginBottom: 6, fontFamily: 'OpenSans-Bold' }}>{'Hey!! Toan Tam'}</Text>
                                <Text style={{ fontSize: 18, color: '#BABFC8', textAlign: 'center', fontFamily: 'OpenSans-Regular' }}>{'T1-A03-01'}</Text>
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
                    />
                </Modal>
                {this.renderLoading()}
            </View>
        );
    }
}