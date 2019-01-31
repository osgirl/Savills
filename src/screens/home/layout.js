import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView
} from 'react-native';

import { ItemHome, ItemListViewHome, Loading, Button, HeaderHome, PlaceHolderItem3 } from '@components';
import DeviceInfo from 'react-native-device-info';
import HTML from 'react-native-render-html';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

import IC_EDIT from '@resources/icons/edit-profile.png';
import IC_NOTIFY from '@resources/icons/notify.png';
import IC_GRIDVIEW_ACTIVE from '@resources/icons/Grid-view-active.png';
import IC_GRIDVIEW from '@resources/icons/Grid-view.png';
import IC_LISTVIEW_ACTIVE from '@resources/icons/list-view-active.png';
import IC_LISTVIEW from '@resources/icons/list-view.png';
import IMG_AVATAR_DEFAULT from '@resources/icons/avatar-default.png';
import LOGO from '@resources/icons/logo.png';
import Carousel from 'react-native-snap-carousel';
import Resolution from '@utils/resolution';

import FastImage from '@components/fastImage';
import FAQ from '@screens/faq';
import Notification from '../notification';
import { Avatar, Line } from '@components/placeHolder';
import Profile from '../profile';
import Style from './style';
import Utils from '../../utils';

const { width, height } = Dimensions.get('window');

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
            this.showCenter = true;
            this.props.navigation.setParams({ isHidenHeaderHome: false });
          }
        }
      }
    })(event);
  };

  renderHeader(languages) {
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
          disabled={this.props.userProfile.imageProfile.success && checkEnabled ? false : true}
          onPress={() => {
            this._openProfile();
          }}
          style={{ flexDirection: 'column', alignItems: 'center', marginBottom: Resolution.scale(10) }}
        >
          <FastImage
            style={{
              width: Resolution.scale(200),
              height: Resolution.scale(50),
              marginVertical: Resolution.scale(30)
            }}
            source={LOGO}
          />
        </Button>
        {checkEnabled ? (
          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Button
              disabled={this.state.numcolumn === 3 ? true : false}
              code-push
              promote
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

  renderModalAnnoument = languages => {
    return (
      <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isAnnountMent}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.listAnnoument}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          sliderWidth={width}
          itemWidth={width - 60}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 80,
            fontFamily: 'OpenSans-Bold',
            fontSize: 15
          }}
          onPress={() => this.setState({ isAnnountMent: false })}
        >
          <Text style={{ color: '#FFF' }}>{languages.HOME_MODAL_CLOSE_ALL || 'HOME_MODAL_CLOSE_ALL'}</Text>
        </TouchableOpacity>
      </Modal>
    );
  };

  _renderItem(item, index) {
    let encToken = this.props.account.encToken;
    let image = item.banner
      ? { uri: `${item.banner.fileUrl}&encToken=${encodeURIComponent(encToken)}` }
      : require('../../resources/image/savillsBanner.png');
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    let textButton =
      item.typeId === 1
        ? languages.HOME_MODAL_BUTTON_ACCEPT || 'HOME_MODAL_BUTTON_ACCEPT'
        : languages.HOME_MODAL_BUTTON_NEXT || 'HOME_MODAL_BUTTON_NEXT';
    return (
      <View
        style={{ width: width - 60, flex: 1, marginVertical: 100, backgroundColor: '#FFF', borderRadius: 10, overflow: 'hidden' }}
      >
        <Image style={{ flex: 1, width: width - 60 }} source={image} />
        <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <HTML html={item.message} />
          </ScrollView>
        </View>
        <View
          style={{
            flex: 0.3,
            paddingTop: Resolution.scale(20),
            paddingBottom: Resolution.scale(20),
            marginHorizontal: Resolution.scale(20),
            borderTopColor: '#F0f0f0',
            borderTopWidth: 1,
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            onPress={() => this.clickClose(item, 0, index)}
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              shadowColor: '#4A89E8',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.16,
              borderRadius: 20,
              marginRight: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 14, color: '#505E75' }}>{languages.HOME_MODAL_BUTTON_SKIP || 'HOME_MODAL_BUTTON_SKIP'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              shadowColor: '#4A89E8',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.16,
              borderRadius: 20,
              overflow: 'hidden'
            }}
            onPress={() => this.clickIgnoreMe(item, 1, index)}
          >
            <LinearGradient
              colors={['#4A89E8', '#8FBCFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#ffF', fontSize: 14 }}>{textButton}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  clickClose(item, index, pos) {
    let arr = this.state.listAnnoument.slice();
    arr.splice(pos, 1);
    this.setState({ listAnnoument: arr }, () => {
      if (this.state.listAnnoument.length === 0) {
        this.setState({ isAnnountMent: false });
      }
    });
    this.props.actions.app.IgnoreMe(this.props.account.accessTokenAPI, item.guid);
  }

  clickIgnoreMe(item, index, pos) {
    if (index === 1 && item.typeId === 1) {
      let link = 'https://play.google.com/store/apps/details?id=' + DeviceInfo.getBundleId();
      if (Platform.OS == 'ios') {
        link = 'itms-apps://itunes.apple.com/app/id' + DeviceInfo.getBundleId();
      }
      Linking.openURL(link);
      this.props.actions.app.IgnoreMe(this.props.account.accessTokenAPI, item.guid);
    } else {
      this._carousel.snapToNext();
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
    let data = this.state.dataModule && this.state.dataModule.length > 0 ? this.state.dataModule : [];
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    let Unit = this.props.units.unitActive;
    return (
      <View style={Style.container}>
        <HeaderHome
          animatedLeft
          headercolor={'#F6F8FD'}
          leftIcon={IC_EDIT}
          leftAction={this.props.navigation.getParam('openProfileHome')}
          customViewLeft={true}
          renderViewLeft={
            <Button
              onPress={this.props.navigation.getParam('openProfileHome')}
              style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}
            >
              <FastImage
                style={{ width: Resolution.scale(30), height: Resolution.scale(30), borderRadius: Resolution.scale(30) / 2 }}
                source={avatar}
              />

              <View style={{ flexDirection: 'column', marginLeft: Resolution.scale(10) }}>
                <Text style={{ fontSize: Resolution.scale(15), fontFamily: 'OpenSans-Bold' }}>
                  {User ? User.displayName : 'User'}
                </Text>
                <Text style={{ fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Regular', color: '#BABFC8' }}>
                  {Unit.fullUnitCode}
                </Text>
              </View>
            </Button>
          }
          notiCount={this.props.notification.unreadCount}
          rightIcon={IC_NOTIFY}
          rightAction={() => this._openNoti()}
        />
        <View style={{ flex: 1 }}>
          {this.state.dataModule && this.state.dataModule.length > 0 ? (
            <FlatList
              data={data}
              horizontal={false}
              key={this.state.numcolumn === 3 ? 'h' : 'v'}
              contentContainerStyle={{
                alignItems: 'flex-start',
                width: width - Resolution.scale(40),
                marginHorizontal: Resolution.scale(20)
              }}
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
              scrollEventThrottle={16}
              refreshing={this.state.isRefresh}
              onRefresh={() => this._onRefresh()}
              onScroll={this.handleScroll}
              legacyImplementation={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => <View style={{ width: 500, height: 1000, backgroundColor: 'red' }} />}
              ItemSeparatorComponent={() => <View style={{ width: Resolution.scaleWidth(20) }} />}
              ListHeaderComponent={() => this.renderHeader(languages)}
              ListFooterComponent={() => (
                <View style={{ height: Resolution.scaleHeight(100), width: Resolution.scaleWidth(40) }} />
              )}
            />
          ) : (
            <PlaceHolderItem3 onReady={false} />
          )}
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

        {this.renderModalAnnoument(languages)}
      </View>
    );
  }
}
