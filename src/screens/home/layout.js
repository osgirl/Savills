import React, { Component } from 'react';
import { View, Text, Image, FlatList, Animated, StatusBar, Dimensions } from 'react-native';

import ItemHome from '@components/itemHome';
import ItemListViewHome from '@components/itemListViewHome';
import Modal from 'react-native-modal';
import Loading from '@components/loading';
import Profile from '../profile';
import Style from './style';
import Button from '../../components/button';
import Utils from '../../utils';
import HeaderHome from '@components/headerHome';
import IC_EDIT from '@resources/icons/edit-profile.png';
import IC_NOTIFY from '@resources/icons/notify.png';

import IC_GRIDVIEW_ACTIVE from '../../resources/icons/Grid-view-active.png';
import IC_GRIDVIEW from '../../resources/icons/Grid-view.png';
import IC_LISTVIEW_ACTIVE from '../../resources/icons/list-view-active.png';
import IC_LISTVIEW from '../../resources/icons/list-view.png';
import IMG_AVATAR_DEFAULT from '../../resources/icons/avatar-default.png';
import Resolution from '../../utils/resolution';

import FastImage from '../../components/fastImage';
import Placeholder from 'rn-placeholder';
import FAQ from '../../screens/faq';
import Notification from '../notification';
import { Avatar, Line } from '../../components/placeHolder';

const { width } = Dimensions.get('window');

const imgSize = 64;

export default class extends Component {
  renderLoading() {
    if (this.state.loading) {
      return <Loading style={{ zIndex: 30 }} visible={this.state.loading} onRequestClose={() => {}} />;
    }
    return null;
  }

  handleScroll = event => {
    let User =
      this.props.userProfile.profile && this.props.userProfile.profile.result && this.props.userProfile.profile.result.user;
    let imageProfile =
      this.props.userProfile.imageProfile &&
      this.props.userProfile.imageProfile.result &&
      this.props.userProfile.imageProfile.result.profilePicture;
    let Unit = this.props.units.unitActive;
    var avatar = imageProfile.length > 0 ? `data:image/png;base64,${imageProfile}` : IMG_AVATAR_DEFAULT;
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
      listener: event => {
        if (event.nativeEvent.contentOffset.y > 70) {
          if (!this.showCenter) {
            this.showCenter = true;
            this.props.navigation.setParams({ isHidenHeaderHome: true });
            this.props.navigation.setParams({ userDisplayname: User.displayName });
            this.props.navigation.setParams({ userFullUnitCode: Unit.fullUnitCode });
            this.props.navigation.setParams({ userAvatar: avatar });
          }
        } else {
          if (this.showCenter) {
            this.showCenter = false;
            this.props.navigation.setParams({ isHidenHeaderHome: false });
          }
        }
      }
    })(event);
  };

  renderHeader() {
    let checkEnabled = this.state.dataModule && this.state.dataModule.length > 0 ? true : false;
    const OpacityImage = this.state.scrollY.interpolate({
      inputRange: [0, 25, 50],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp'
    });

    let User = this.props.userProfile.profile.result && this.props.userProfile.profile.result.user;
    let imageProfile =
      this.props.userProfile.imageProfile &&
      this.props.userProfile.imageProfile.result &&
      this.props.userProfile.imageProfile.result.profilePicture;
    let Unit = this.props.units.unitActive;
    var avatar = imageProfile.length > 0 ? `data:image/png;base64,${imageProfile}` : IMG_AVATAR_DEFAULT;
    return (
      <View style={{ width: width - Resolution.scale(40), alignSelf: 'center', marginTop: 20 }}>
        <Button
          disabled={this.props.userProfile.imageProfile.success ? false : true}
          onPress={() => {
            this._openProfile();
          }}
          style={{ flexDirection: 'column', alignItems: 'center', marginBottom: Resolution.scale(10) }}
        >
          <Avatar size={imgSize} onReady={this.props.userProfile.imageProfile.success} bgColor={'#FFF'} animate="fade">
            <Animated.View style={{ opacity: OpacityImage }}>
              <FastImage style={{ width: imgSize, height: imgSize, borderRadius: imgSize / 2 }} source={avatar} />
            </Animated.View>
          </Avatar>
          <Line txtWidth={100} height={20} onReady={User ? true : false} animate="fade">
            {User && <Text style={Style.displayName}>{'Hey!! ' + User.displayName}</Text>}
          </Line>

          <Text style={Style.unitCode}>{Unit.fullUnitCode}</Text>
        </Button>
        {checkEnabled ? (
          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Button
              disabled={this.state.numcolumn === 3 ? true : false}
              style={Style.btnGrid}
              onPress={() => this._onChangeNumColumn('3')}
            >
              <Image source={this.state.numcolumn === 3 ? IC_GRIDVIEW_ACTIVE : IC_GRIDVIEW} />
            </Button>
            <Button
              disabled={this.state.numcolumn !== 3 ? true : false}
              style={Style.btnList}
              onPress={() => this._onChangeNumColumn('1')}
            >
              <Image source={this.state.numcolumn !== 3 ? IC_LISTVIEW_ACTIVE : IC_LISTVIEW} />
            </Button>
          </View>
        ) : null}
      </View>
    );
  }

  _onChangeNumColumn(num) {
    this.setState({ numcolumn: Number(num) });
  }

  renderItem(item, index, loading, moduleCount) {
    if (this.state.numcolumn === 1) {
      return (
        <ItemListViewHome
          title={item.title}
          image={item.key}
          loading={loading}
          onPressItem={() => this._gotoModule(item.screen)}
          moduleCount={moduleCount}
          moduleName={item.moduleName}
          index={index}
        />
      );
    } else {
      return (
        <ItemHome
          title={item.title}
          image={item.key}
          loading={loading}
          onPressItem={() => this._gotoModule(item.screen)}
          moduleCount={moduleCount}
          moduleName={item.moduleName}
          index={index}
        />
      );
    }
  }

  render() {
    let User =
      this.props.userProfile.profile && this.props.userProfile.profile.result && this.props.userProfile.profile.result.user;
    let imageProfile =
      this.props.userProfile.imageProfile &&
      this.props.userProfile.imageProfile.result &&
      this.props.userProfile.imageProfile.result.profilePicture;
    var avatar = imageProfile.length > 0 ? `data:image/png;base64,${imageProfile}` : IMG_AVATAR_DEFAULT;
    let data = this.state.dataModule && this.state.dataModule.length > 0 ? this.state.dataModule : Utils.dataPlaceholder;
    let checkScrollEnabled = this.state.dataModule && this.state.dataModule.length > 0 ? true : false;
    return (
      <View style={Style.container}>
        <HeaderHome
          animatedLeft
          headercolor={'#F6F8FD'}
          leftIcon={IC_EDIT}
          leftAction={this.props.navigation.getParam('openProfileHome')}
          customViewLeft={this.props.navigation.getParam('isHidenHeaderHome')}
          renderViewLeft={
            <Button
              onPress={this.props.navigation.getParam('openProfileHome')}
              style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}
            >
              <FastImage
                style={{ width: Resolution.scale(30), height: Resolution.scale(30), borderRadius: Resolution.scale(30) / 2 }}
                source={this.props.navigation.getParam('userAvatar')}
              />

              <View style={{ flexDirection: 'column', marginLeft: Resolution.scale(10) }}>
                <Text style={{ fontSize: Resolution.scale(15), fontFamily: 'OpenSans-Bold' }}>
                  {this.props.navigation.getParam('userDisplayname')}
                </Text>
                <Text style={{ fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Regular', color: '#BABFC8' }}>
                  {this.props.navigation.getParam('userFullUnitCode')}
                </Text>
              </View>
            </Button>
          }
          notiCount={this.props.notification.unreadCount}
          rightIcon={IC_NOTIFY}
          rightAction={() => this._openNoti()}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            scrollEnabled={checkScrollEnabled}
            horizontal={false}
            key={this.state.numcolumn === 3 ? 'h' : 'v'}
            contentContainerStyle={{ alignItems: 'flex-start', width: width, marginHorizontal: 20 }}
            keyExtractor={item => item.id + ''}
            numColumns={this.state.numcolumn || 3}
            renderItem={({ item, index }) =>
              this.renderItem(
                item,
                index,
                this.state.dataModule && this.state.dataModule.length > 0 ? true : false,
                this.state.moduleCount
              )
            }
            onEndReachedThreshold={0.01}
            refreshing={this.state.isRefresh}
            onRefresh={() => this._onRefresh()}
            onScroll={this.handleScroll}
            legacyImplementation={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <View style={{ width: 500, height: 1000, backgroundColor: 'red' }} />}
            ItemSeparatorComponent={() => <View style={{ width: Resolution.scaleWidth(20) }} />}
            ListHeaderComponent={() => this.renderHeader()}
            ListFooterComponent={() => <View style={{ height: Resolution.scaleHeight(100), width: Resolution.scaleWidth(40) }} />}
          />
        </View>
        <Modal style={{ flex: 1, margin: 0, backgroundColor: '#F6F8FD' }} isVisible={this.state.isShowProfile}>
          <Profile
            onClose={() => this._closeProfile()}
            onLogOut={() => this._logOut()}
            onChangePassword={() => this._gotoChangePassword()}
            gotoSetting={() => this._gotoSetting()}
            loading={this.state.loading}
            profile={User}
            imageProfile={avatar}
            onRefresh={() => this._onRefresh()}
          />
        </Modal>

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowFAQ}>
          <FAQ onClose={() => this._closeFAQ()} />
        </Modal>

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowNoti}>
          <Notification navigation={this.props.navigation} onclose={() => this._closeNoti()} />
        </Modal>

        {/* {this.renderLoading()} */}
      </View>
    );
  }
}
