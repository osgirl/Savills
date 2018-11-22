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
    let User = this.props.userProfile.profile.result && this.props.userProfile.profile.result.user;
    let imageProfile =
      this.props.userProfile.imageProfile &&
      this.props.userProfile.imageProfile.result &&
      this.props.userProfile.imageProfile.result.profilePicture;
    let Unit = this.props.units.unitActive;
    var avatar = imageProfile.length > 0 ? `data:image/png;base64,${imageProfile}` : IMG_AVATAR_DEFAULT;
    return (
      <View style={{ width: width, alignSelf: 'center' }}>
        <Button
          onPress={() => {
            this._openProfile();
          }}
          style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}
        >
          <Avatar size={imgSize} onReady={this.props.userProfile.imageProfile.success} bgColor={'#FFF'} animate="fade">
            <FastImage style={{ width: imgSize, height: imgSize, borderRadius: imgSize / 2 }} source={avatar} />
          </Avatar>
          <Line txtWidth={100} height={20} onReady={User ? true : false} animate="shine">
            {User && <Text style={Style.displayName}>{'Hey!! ' + User.displayName}</Text>}
          </Line>

          <Text style={Style.unitCode}>{Unit.fullUnitCode}</Text>
        </Button>
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
                style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
                source={this.props.navigation.getParam('userAvatar')}
              />

              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text style={{ fontSize: 15, fontFamily: 'OpenSans-Bold' }}>
                  {this.props.navigation.getParam('userDisplayname')}
                </Text>
                <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#BABFC8' }}>
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
            horizontal={false}
            key={this.state.numcolumn === 2 ? 'h' : 'v'}
            contentContainerStyle={{ alignItems: 'center', marginHorizontal: 20 }}
            keyExtractor={item => item.id + ''}
            numColumns={this.state.numcolumn || 2}
            renderItem={({ item, index }) =>
              this.renderItem(
                item,
                index,
                this.state.dataModule && this.state.dataModule.length > 0 ? true : false,
                this.state.moduleCount
              )
            }
            onScroll={this.handleScroll}
            legacyImplementation={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <View style={{ width: 500, height: 1000, backgroundColor: 'red' }} />}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            ListHeaderComponent={() => this.renderHeader()}
            ListFooterComponent={() => <View style={{ height: 100, width: 40 }} />}
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
          />
        </Modal>

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowFAQ}>
          <FAQ onClose={() => this._closeFAQ()} />
        </Modal>

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowNoti}>
          <Notification onclose={() => this._closeNoti()} />
        </Modal>

        {/* {this.renderLoading()} */}
      </View>
    );
  }
}
