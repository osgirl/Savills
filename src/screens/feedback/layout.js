import React, { Component } from 'react';
import { View, Text, Animated, Image, StatusBar, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import ScrollableTabView from '@components/react-native-scrollable-tab-view';
import { SwipeListView } from 'react-native-swipe-list-view';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import moment from 'moment';

import { Header, HeaderTitle, Button, ModalSelectUnit, PlaceHolderItemH } from '@components';

import IC_BACK from '@resources/icons/back-light.png';
import IC_DROPDOWN from '@resources/icons/dropDown.png';
import IC_EMTY_FB from '@resources/icons/Emty_feedback.png';

import { isIphoneX } from '@utils/func';
import Configs from '@utils/configs';
import ModaDetailFeedback from './component/modaDetailFeedback';
import ModalNew from './component/modalNew';
import Styles from './styles';
import Resolution from '@utils/resolution';

const HEADER_MAX_HEIGHT = 60;

const { width } = Dimensions.get('window');

export default class extends Component {
  handleScroll = event => {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {}
      },
      { useNativeDriver: true }
    )(event);
  };

  _FooterFlatlist() {
    return this.state.loadingMore ? (
      <View style={{ height: Resolution.scaleHeight(40), justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Configs.colorMain} />
      </View>
    ) : (
      <View style={{ height: Resolution.scale(40) }} />
    );
  }

  render() {
    let unitActive = this.props.units.unitActive;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
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
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: opacityTextHeader }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.FB_TITLEHEADER}</Text>
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
        <StatusBar barStyle="light-content" hidden={false} />
        <LinearGradient
          colors={['#4A89E8', '#8FBCFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: width, zIndex: -10 }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: headerTranslate }],
              height: headerHeight
            }}
          >
            <Animated.View style={{ opacity: opacityText, position: 'absolute' }}>
              <HeaderTitle title={languages.FB_TITLEHEADER} />
            </Animated.View>
          </Animated.View>
        </LinearGradient>
        <LinearGradient
          colors={['#4A89E8', '#8FBCFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, zIndex: 1 }}
        >
          <ScrollableTabView
            ref={ScrollableTab => {
              this.ScrollableTab = ScrollableTab;
            }}
            tabBarActiveTextColor={'#FFF'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.9)'}
            tabBarUnderlineStyle={{ backgroundColor: '#FFF' }}
            tabBarBackgroundColor={'transparent'}
          >
            {this.ViewProcessing(this.state.data, languages)}
            {this.ViewCompleted(this.state.dataCompleted, languages)}
          </ScrollableTabView>
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
        </LinearGradient>

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
        </Modal>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalDetail}>
          <ModaDetailFeedback
            commentBoxId={this.state.commentBoxId}
            onClose={() => this.setState({ isModalDetail: false })}
            onRefresh={() => {
              this._onRefresh(), this._onRefreshCompleted(), this.ScrollableTab.goToPage(1);
            }}
          />
        </Modal>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalNew}>
          <ModalNew onClose={() => this._onCloseModalNew()} />
        </Modal>
      </View>
    );
  }

  renderEmty(name, languages) {
    if (name === 'processing') {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image source={IC_EMTY_FB} />
          <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>
            {languages.FB_EMPTY_FEEDBACK}
          </Text>
        </View>
      );
    } else if (name === 'Completed') {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image source={IC_EMTY_FB} />
          <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>
            {languages.FB_EMPTY_FEEDBACK_CANCEL}
          </Text>
        </View>
      );
    } else {
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={Configs.colorMain} />
      </View>;
    }
  }

  ViewProcessing = (list, languages) => {
    return (
      <View tabLabel={languages.FB_TAB_PROCESS} style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.props.feedback.listFeedBack.success && this.props.feedback.listFeedBack.items.length === 0 ? (
          this.renderEmty('processing', languages)
        ) : this.state.isLoadData === false ? (
          <SwipeListView
            useFlatList
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => item.commentBoxId.toString()}
            data={list}
            refreshing={this.state.isRefresh}
            onRefresh={() => this._onRefresh()}
            // renderHiddenItem={({ item, index }) => this.renderHiddenRow(item, index)}
            // rightOpenValue={-80}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            onScroll={this.handleScroll}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.01}
            onEndReached={() => this._onEndReached()}
            legacyImplementation={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListHeaderComponent={() => <View style={{ height: 20 }} />}
            ListFooterComponent={() => this._FooterFlatlist()}
          />
        ) : (
          <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
            <PlaceHolderItemH noMargin />
          </View>
        )}
      </View>
    );
  };

  ViewCompleted = (list, languages) => {
    return (
      <View tabLabel={languages.FB_TAB_COMPLETE} style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.props.feedback.listFeedBackCompleted.success && this.props.feedback.listFeedBackCompleted.items.length === 0 ? (
          this.renderEmty('Completed', languages)
        ) : this.state.isLoadDataCompleted === false ? (
          <SwipeListView
            useFlatList
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => item.commentBoxId.toString()}
            data={list}
            refreshing={this.state.isRefreshCompleted}
            onRefresh={() => this._onRefreshCompleted()}
            // renderHiddenItem={({ item, index }) => this.renderHiddenRow(item, index)}
            // rightOpenValue={-80}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            onScroll={this.handleScroll}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.01}
            onEndReached={() => this._onEndReachedCompleted()}
            legacyImplementation={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListHeaderComponent={() => <View style={{ height: 20 }} />}
            ListFooterComponent={() => this._FooterFlatlist()}
          />
        ) : (
          <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
            <PlaceHolderItemH noMargin />
          </View>
        )}
      </View>
    );
  };

  renderItem = (item, index) => {
    let date = moment(item.createdAt).format('l');
    let time = moment(item.createdAt).format('LT');
    return (
      <Button
        onPress={() => this._openModalDetail(item.commentBoxId)}
        style={{
          width: width - Resolution.scale(40),
          borderRadius: 10,
          backgroundColor: '#FFF',
          padding: Resolution.scale(20),
          marginHorizontal: Resolution.scale(20)
        }}
      >
        {item.unreadCommentCount > 0 ? (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: 'red',
              position: 'absolute',
              top: 10,
              right: 10,
              borderRadius: 10,
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 12, color: '#FFF', fontWeight: 'bold' }}>
              {item.unreadCommentCount > 9 ? '+9' : item.unreadCommentCount}
            </Text>
          </View>
        ) : null}
        <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={{ borderRadius: 5, backgroundColor: '#505E75' }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: Resolution.scale(12),
                  fontWeight: 'bold',
                  marginVertical: Resolution.scale(5),
                  marginHorizontal: Resolution.scale(15)
                }}
              >
                #{item.commentBoxId}
              </Text>
            </View>
            <Text
              style={{ color: '#505E75', fontWeight: 'bold', fontSize: Resolution.scale(13), marginTop: Resolution.scale(12) }}
            >
              {item.fullUnitCode}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginVertical: Resolution.scale(15),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: Resolution.scale(10) }} source={require('../../resources/icons/clock.png')} />
            <Text style={{ color: '#C9CDD4', fontSize: 12 }}>{time}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: Resolution.scale(10) }} source={require('../../resources/icons/calendar.png')} />
            <Text style={{ color: '#C9CDD4', fontSize: Resolution.scale(12) }}>{date}</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor:
                item && item.commentBoxStatus && item.commentBoxStatus.colorCode ? item.commentBoxStatus.colorCode : '#FFF'
            }}
          >
            <Text
              style={{
                color: '#F8F8F8',
                fontSize: Resolution.scale(10),
                paddingVertical: Resolution.scale(5),
                fontWeight: 'bold',
                paddingHorizontal: Resolution.scale(15)
              }}
            >
              {item && item.commentBoxStatus && item.commentBoxStatus.name}
            </Text>
          </View>
        </View>
        {this.renderViewComment(item)}
      </Button>
    );
  };

  renderViewComment = item => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#dcdee3',
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: Resolution.scale(5)
        }}
      >
        <Text style={{ flex: 1, color: '#FFF', fontSize: 12, fontWeight: 'bold' }} numberOfLines={1}>
          {item.description && item.description.trim() !== '' ? item.description.trim() : 'No Description'}
        </Text>
      </View>
    );
  };
}

const style = StyleSheet.create({
  headerTitle: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    zIndex: -1
  }
});
