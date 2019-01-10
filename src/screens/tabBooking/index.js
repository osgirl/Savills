import React, { Component } from 'react';
import Connect from '@stores';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Animated,
  Platform
} from 'react-native';

import { Button, ModalSelectUnit, HeaderTitle, Header } from '@components';

import ScrollableTabView from '@components/react-native-scrollable-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

import IC_BACK from '@resources/icons/back-light.png';
import IC_DROPDOWN from '../../resources/icons/dropDown.png';

import TabComplete from './tabs/tabComplete';
import TabInComming from './tabs/tabInComming';
import TabProcess from './tabs/tabProcess';
import configs from '@utils/configs';
import { isIphoneX } from '@utils/func';
import ModalNewBooking from './components/modalNewBooking';

import Resolution from '@utils/resolution';
const HEADER_MAX_HEIGHT = Resolution.scale(60);

const { width } = Dimensions.get('window');
class TabBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCategory: false,
      listCategory: [],
      scrollY: new Animated.Value(0),
      isModalSelectUnit: false,
      isModalNewBooking: false,
      itemCategory: {}
    };
  }

  componentDidMount = () => {
    let ida = this.props.navigation.getParam('params', false);
    if (ida.itemtype) {
      this.props.navigation.navigate('ModalDetailBooking', { id: ida.itemtype });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.booking.listCategory && nextProps.booking.listCategory.success) {
      this.setState({ listCategory: nextProps.booking.listCategory.result });
    }
  }

  handleScroll = event => {
    const scrollSensitivity = Platform.OS === 'ios' ? 1.5 : 5;
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {
          const offset = event.nativeEvent.contentOffset.y / scrollSensitivity;
          this.state.scrollY.setValue(offset);
        }
      },
      { useNativeDriver: true }
    )(event);
  };

  changeStatusBar = () => {
    if (this.state.isShowCategory || this.state.isModalSelectUnit) StatusBar.setHidden(true);
    else {
      StatusBar.setHidden(false);
    }
  };

  render() {
    let unitActive = this.props.units.unitActive;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT / 3],
      outputRange: [HEADER_MAX_HEIGHT, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT / 2],
      outputRange: [0, -HEADER_MAX_HEIGHT],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const opacityText = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const opacityTextHeader = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT / 2],
      outputRange: [0, 1],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <StatusBar barStyle="light-content" />
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: opacityTextHeader }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.BK_CREATE_UTILITI}</Text>
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
              <HeaderTitle title={languages.BK_CREATE_UTILITI} />
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
            textStyle={{ fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}
            tabBarActiveTextColor={'#FFF'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.9)'}
            tabBarUnderlineStyle={{ backgroundColor: '#FFF' }}
            tabBarBackgroundColor={'transparent'}
          >
            <TabProcess onScroll={this.handleScroll} tabLabel={languages.BK_TAB_PROCESS} {...this.props} />
            <TabInComming onScroll={this.handleScroll} tabLabel={languages.BK_TAB_INCOMMING} {...this.props} />
            <TabComplete onScroll={this.handleScroll} tabLabel={languages.BK_TAB_COMPLETE} {...this.props} />
          </ScrollableTabView>
        </LinearGradient>
        <View
          style={{
            backgroundColor: '#FFF',
            width: width,
            height: isIphoneX() ? 60 : 40,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16
          }}
        />
        <TouchableOpacity
          onPress={() => this.getListCategory(languages)}
          style={{
            borderRadius: 25,
            width: 50,
            height: 50,
            position: 'absolute',
            bottom: isIphoneX() ? 30 : 20,
            left: width / 2 - 25,
            backgroundColor: '#01C772',
            shadowColor: '#4DD49A',
            shadowOffset: { width: 3, height: 6 },
            shadowOpacity: 0.3,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <Image source={require('../../resources/icons/plush-addnew.png')} />
        </TouchableOpacity>
        {this.renderModalCategory(languages)}
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalNewBooking}>
          <ModalNewBooking
            goBack={() => this.setState({ isModalNewBooking: false })}
            changeCategory={() => this.changeCategory()}
            close={() => this.setState({ isModalNewBooking: false })}
            item={this.state.item}
          />
        </Modal>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
        </Modal>
      </View>
    );
  }

  getListCategory = () => {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    this.setState({ isShowCategory: true }, () => {
      setTimeout(() => {
        let accessTokenApi = this.props.account.accessTokenAPI;
        const buildingID = this.props.units.unitActive.buildingId;
        this.props.actions.booking.getListCategory(accessTokenApi, buildingID, languages);
      }, 200);
    });
  };

  changeCategory = () => {
    this.setState({ isModalNewBooking: false });
    setTimeout(() => {
      this.getListCategory();
    }, 500);
  };

  clickDetail = () => {
    this.props.navigation.navigate('ModalDetailBooking');
  };

  renderModalCategory(languages) {
    return (
      <Modal
        style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: isIphoneX() ? 40 : 20 }}
        isVisible={this.state.isShowCategory}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: 50,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              flexDirection: 'row',
              backgroundColor: '#FFF',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20
            }}
          >
            <TouchableOpacity onPress={() => this.setState({ isShowCategory: false })}>
              <Image source={require('../../resources/icons/close-black.png')} />
            </TouchableOpacity>
            <Text styl={{ color: '#505E75', fontSize: 14, fontFamily: 'OpenSans-Bold' }}>{languages.BK_MODAL_CHOOSE_HEADER}</Text>
            <View />
          </View>
          <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
            <FlatList
              data={this.state.listCategory}
              keyExtractor={(item, index) => item.amenityId.toString()}
              renderItem={({ item, index }) => (
                <ItemCategory index={index} item={item} actins={() => this.gotoCreateBooking(item)} />
              )}
            />
          </View>
        </View>
      </Modal>
    );
  }

  gotoCreateBooking = item => {
    this.setState({ isShowCategory: false, item: item });
    setTimeout(() => {
      this.setState({ isModalNewBooking: true });
    }, 500);
  };
}

class ItemCategory extends Component {
  render() {
    const { amenityName, iconPath } = this.props.item;

    return (
      <TouchableOpacity
        onPress={() => this.props.actins()}
        style={{
          width: width - 40,
          borderRadius: 10,
          backgroundColor: '#FFF',
          marginHorizontal: 20,
          marginTop: this.props.index === 0 ? 20 : 10,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center'
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10 }}
          resizeMode={'cover'}
          source={{ uri: configs.API_BOOKING + iconPath }}
        />
        <Text style={{ color: '#515E6D', fontSize: 14, fontWeight: '600', flex: 1 }}>{amenityName}</Text>
      </TouchableOpacity>
    );
  }
}

export default Connect(TabBooking);
