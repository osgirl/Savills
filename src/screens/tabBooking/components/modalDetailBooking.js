import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  PixelRatio,
  FlatList,
  Animated,
  Platform,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  DeviceEventEmitter
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { isIphoneX } from 'react-native-iphone-x-helper';
import moment from 'moment';
import Modal from 'react-native-modal';

import Connect from '@stores';
import ItemComment from '@components/itemComment';
import Header from '@components/header';
import HeaderTitle from '@components/headerTitle';
import Button from '@components/button';
import Resolution from '@utils/resolution';
import AnimatedTitle from '@components/animatedTitle';
import IC_CHATEMTY from '@resources/icons/chat_emty.png';

import ModalChat from '../../../components/modalChat';

const HEADER_MAX_HEIGHT = 60;
const { width, height } = Dimensions.get('window');

const IMAGE = {
  calendar: require('@resources/icons/calendar.png'),
  close: require('@resources/icons/close.png'),
  chatBig: require('@resources/icons/chat-big.png'),
  closeBlack: require('@resources/icons/close-black.png'),
  sendMessage: require('@resources/icons/send-mess.png'),
  warning: require('@resources/icons/warning.png')
};

class ModalDetailBooking extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      loading: true,
      isShowModalCancel: false,
      listChat: [],
      chatText: '',
      isShowTitleHeader: false,
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      popupError: false,
      marginBottom: 0,
      isShowChat: false
    };
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    let accessTokenApi = this.props.account.accessTokenAPI;
    let id = this.props.navigation.getParam('id', null);
    this.props.actions.booking.getDetailBooking(accessTokenApi, id);
    this.props.actions.workOrder.getCommentUnread(accessTokenApi, id, 3);
  };

  _keyboardDidShow() {
    this.setState({ marginBottom: 300 });
  }

  _keyboardDidHide() {
    this.setState({ marginBottom: 0 });
  }

  async componentWillReceiveProps(nextProps) {
    let accessTokenApi = this.props.account.accessTokenAPI;
    if (
      nextProps.booking.detailBooking &&
      nextProps.booking.detailBooking.success &&
      this.props.booking.detailBooking != nextProps.booking.detailBooking
    ) {
      this.setState({ loading: false });
      nextProps.actions.workOrder.getCommentUser(accessTokenApi, nextProps.booking.detailBooking.result.guid);
    }
    if (nextProps.workOrder.listComment && nextProps.workOrder.listComment.success) {
      this.setState({ listChat: nextProps.workOrder.listComment.result.items });
    }
    if (
      nextProps.booking.changeStatusBooking &&
      !nextProps.booking.changeStatusBooking.success &&
      !nextProps.booking.isChangeStatus
    ) {
      nextProps.actions.booking.setFlagChangeStatus();
      this.setState({ popupError: true });
    }
    if (
      nextProps.booking.changeStatusBooking &&
      nextProps.booking.changeStatusBooking.success &&
      !nextProps.booking.isChangeStatus
    ) {
      nextProps.actions.booking.setFlagChangeStatus();
      nextProps.navigation.goBack();
      DeviceEventEmitter.emit('UpdateListBooking', {});
    }
    if (
      nextProps.workOrder.addComment &&
      nextProps.workOrder.addComment.success &&
      this.props.workOrder.addComment != nextProps.workOrder.addComment
    ) {
      this.textInput.clear();
      nextProps.actions.workOrder.getCommentUser(accessTokenApi, nextProps.booking.detailBooking.result.guid);
    }
  }

  handleScroll = event => {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {
          const offset = event.nativeEvent.contentOffset.y;
          this.state.scrollY.setValue(offset);
        }
      },
      { useNativeDriver: true }
    )(event);
  };

  addComment = () => {
    if (this.state.chatText.trim() === '') {
      return;
    } else {
      this.setState({ chatText: '' });
      let accessTokenAPI = this.props.account.accessTokenAPI;
      const { displayName, profilePictureId } = this.props.userProfile.profile.result.user;
      let comment = {
        conversationId: this.props.booking.detailBooking.result.guid,
        content: this.state.chatText,
        typeId: null,
        isPrivate: false,
        userName: displayName,
        profilePictureId: profilePictureId,
        moduleId: 3
      };
      this.props.actions.workOrder.addCommentUser(accessTokenAPI, comment);
      // this.flatList.scrollToEnd({ animated: true });
    }
  };

  render() {
    return this.state.loading ? null : this.renderDetail();
  }

  changeStatusBar = () => {
    if (this.state.isShowModalCancel || this.state.isShowChat) StatusBar.setHidden(true);
    else {
      StatusBar.setHidden(false);
    }
  };

  renderDetail = () => {
    const {
      amenity,
      status,
      createdAt,
      fullUnitId,
      name,
      remark,
      reservationId,
      endDate,
      startDate,
      paymentStatus = null
    } = this.props.booking.detailBooking.result;
    let date = moment(startDate).format('l');
    let createDate = moment(createdAt).format('l');

    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;

    this.changeStatusBar();
    let tabIndex = this.props.navigation.getParam('index', false);
    return (
      <View style={{ flex: 1, backgroundColor: "#F6F8FD" }}>
        {this.renderHeader(reservationId)}
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0
          }}
          contentInset={{
            top: HEADER_MAX_HEIGHT
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT
          }}
          onScroll={this.handleScroll}
        >
          <ItemScorll
            title={languages.BK_SERVICES}
            view={
              <View
                style={{
                  height: 70,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{ uri: 'https://cdn4.iconfinder.com/data/icons/sports-balls/1024/Tennis_ball.png' }}
                />
                <Text style={{ color: '#343D4D', fontWeight: 'bold', fontSize: 13, flex: 1, marginLeft: 20 }}>
                  {amenity.amenityName}
                </Text>
              </View>
            }
          />
          <ItemScorll
            title={languages.BK_DETAIL_INFOMATION}
            view={
              <View
                style={{
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around'
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>
                    {languages.BK_DETAIL_APARTMENT}
                  </Text>
                  <Text
                    style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}
                  >{`${fullUnitId}-${name}`}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>
                    {languages.BK_DETAIL_STATUS}
                  </Text>
                  <View
                    style={{
                      borderRadius: 5,
                      backgroundColor: status.colorCode
                    }}
                  >
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 13,
                        paddingVertical: 5,
                        fontFamily: 'OpenSans-SemiBold',
                        paddingHorizontal: 15
                      }}
                    >
                      {status.name}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>
                    {languages.BK_DETAIL_DATE}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image style={{ marginRight: 10, width: 15, height: 15 }} source={IMAGE.calendar} />
                      <Text style={{ color: '#C9CDD4', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>{date}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>
                    {languages.BK_DETAIL_CREATE_DAY}
                  </Text>
                  <Image style={{ marginRight: 10, width: 15, height: 15 }} source={IMAGE.calendar} />
                  <Text style={{ color: '#C9CDD4', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>{createDate}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13, marginVertical: 10 }}>
                    {languages.BK_DETAIL_TIME}
                  </Text>
                  <Text style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>{`${moment(startDate).format(
                    'hh:mm'
                  )} - ${moment(endDate).format('hh:mm')}`}</Text>
                </View>

                {paymentStatus === null ? null : (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>
                      {languages.BK_DETAIL_PAY}
                    </Text>
                    <View style={{ backgroundColor: paymentStatus.colorCode, borderRadius: 5 }}>
                      <Text style={{ marginVertical: 4, marginHorizontal: 15, color: '#FFF', fontWeight: 'bold', fontSize: 10 }}>
                        {paymentStatus && paymentStatus.name ? paymentStatus.name : 'paid'}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            }
          />
          <ItemScorll
            title={languages.BK_DETAIL_DES}
            view={
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  width: null,
                  padding: 20,
                  minHeight: 100,
                  marginBottom: 150
                }}
              >
                <Text>{remark}</Text>
              </View>
            }
          />
        </ScrollView>
        {/* Start ======= Button show chat */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: tabIndex && tabIndex === 2 ? 20 : 80,
            right: 20
          }}
          onPress={() => this.setState({ isShowChat: true })}
        >
          <Image source={IMAGE.chatBig} />
          {this.props.workOrder.commentUnread &&
          this.props.workOrder.commentUnread.success &&
          this.props.workOrder.commentUnread.result[0].unreadCount > 0 ? (
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: 'red',
                borderRadius: 8,
                position: 'absolute',
                top: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 8 }}>
                {this.props.workOrder.commentUnread.result[0].unreadCount}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
        {/* End ======= Button show chat */}
        {this.renderContentModalChat(languages)}
        {this.renderModalCancel(languages)}
        {this.renderPopupCancelError()}
        {tabIndex && tabIndex == 2 ? null : this.renderFooter(languages)}
      </View>
    );
  };

  renderHeader(id) {
    const isShow = this.state.scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    return (
      <View>
        <Header
          isModal
          LinearGradient={true}
          leftIcon={IMAGE.close}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: isShow }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{`# ${id}`}</Text>
            </Animated.View>
          }
        />
        <AnimatedTitle scrollY={this.state.scrollY} label={'# ' + id} />
      </View>
    );
  }

  renderContentModalChat(languages) {
    let tabIndex = this.props.navigation.getParam('index', false);
    let id = this.props.userProfile.profile.result.user.id;
    let IdBooking = this.props.booking.detailBooking.result.reservationId;

    return (
      <ModalChat
        isVisible={this.state.isShowChat}
        title={IdBooking}
        idUser={id}
        colors={tabIndex === 2 ? ['#dedede', '#dedede'] : ['#4A89E8', '#8FBCFF']}
        placeHolderText={languages.BK_DETAIL_CHAT}
        listComment={this.state.listChat}
        editableTextInput={tabIndex && tabIndex == 2 ? false : true}
        disabledBtn={this.state.chatText.trim() == '' ? true : false}
        addComment={() => this.addComment()}
        onChangeText={text => this.setState({ chatText: text })}
        opacityBtnSend={this.state.chatText.trim() == '' ? 0.5 : 1}
        onClose={() => this.setState({ isShowChat: false })}
        refTextInout={input => {
          this.textInput = input;
        }}
      />
    );
  }

  renderModalCancel = languages => {
    return (
      <Modal style={Style.ModalCancel} isVisible={this.state.isShowModalCancel}>
        <View style={Style.ViewCancelContain}>
          <View style={Style.ViewSmall}>
            <Text style={Style.TextCancelContain}>{languages.BK_CANCEL_BK}</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.setState({ isShowModalCancel: false })} style={Style.TouchBackCancel}>
                <Text style={{ fontSize: 12, color: '#404040', fontFamily: 'Opensans-SemiBold' }}>
                  {languages.BK_CANCEL_BACK}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.cancelBooking()} style={Style.TouchCancel}>
                <LinearGradient
                  colors={['#01C772', '#01C772']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={Style.ViewCancel}
                >
                  <Text style={Style.TextCancel}>{languages.BK_CANCEL_AGREE}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  renderPopupCancelError = () => {
    return (
      <Modal style={Style.ModalError} isVisible={this.state.popupError}>
        <View style={Style.ViewError}>
          <View style={Style.ViewErrorContain}>
            <Image source={IMAGE.warning} />
            <Text style={Style.TextSory}>Sorry!</Text>
            <Text style={Style.ErrorMessage}>
              {this.props.booking.changeStatusBooking && !this.props.booking.changeStatusBooking.success
                ? this.props.booking.changeStatusBooking.error.message
                : ''}
            </Text>
            <Button style={Style.ButtonOk} onPress={() => this.clickOk()}>
              <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={Style.ViewOk}>
                <Text style={Style.TextOk}>OK</Text>
              </LinearGradient>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  clickOk = () => {
    this.props.navigation.goBack();
  };

  renderFooter = languages => {
    return (
      <View style={Style.footerContain}>
        <TouchableOpacity onPress={() => this.setState({ isShowModalCancel: true })} style={Style.buttonFooter}>
          <Text style={Style.textFooter}>{languages.BK_DETAIL_CANCEL}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  cancelBooking = () => {
    let id = this.props.navigation.getParam('id', null);
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.setState({ isShowModalCancel: false }, () =>
      setTimeout(() => {
        this.props.actions.booking.changeStatusBooking(accessTokenApi, id);
      }, 500)
    );
  };
}

class ItemScorll extends PureComponent {
  render() {
    const { title } = this.props;
    return (
      <View style={Style.containItemScroll}>
        <Text style={Style.textItemScroll}>{title}</Text>
        {this.props.view}
      </View>
    );
  }
}

const Style = StyleSheet.create({
  containItemScroll: {
    flex: 1,
    marginHorizontal: 20
  },
  textItemScroll: {
    marginTop: 20,
    marginBottom: 10,
    color: '#505E75',
    fontSize: 14,
    fontWeight: 'bold'
  },
  buttonFooter: {
    flex: 1,
    backgroundColor: '#404040',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerContain: {
    width: width,
    height: 70,
    backgroundColor: '#FFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.05
  },
  textFooter: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14
  },
  ModalError: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  ViewError: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ViewErrorContain: {
    width: width - 40,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    alignItems: 'center',
    padding: 20
  },
  TextSory: {
    marginVertical: 10,
    color: '#505E75',
    fontSize: 13,
    fontFamily: 'OpenSans-Bold'
  },
  ErrorMessage: {
    marginBottom: 20,
    color: '#BABFC8',
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center'
  },
  ButtonOk: {
    width: width - 80,
    marginHorizontal: 20,
    height: 50
  },
  ViewOk: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  TextOk: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Opensans-SemiBold'
  },
  ModalCancel: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  ViewCancelContain: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ViewSmall: {
    width: width - 40,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    alignItems: 'center',
    padding: 20
  },
  TextCancelContain: {
    marginBottom: 20,
    color: '#BABFC8',
    fontFamily: 'Opensans-SemiBold',
    fontSize: 14
  },
  TouchBackCancel: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  TouchCancel: {
    flex: 1,
    marginLeft: 20
  },
  ViewCancel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  TextCancel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Opensans-SemiBold'
  },
  ModalChatContain: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 50
  },
  ViewContainChat: {
    width: width,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  ViewChatContain: {
    flex: 1,
    backgroundColor: '#F6F8FD',
    paddingBottom: 70
  },
  ViewButtonChat: {
    width: width - 40,
    position: 'absolute',
    bottom: 20,
    left: 20,
    height: 50,
    borderRadius: 10
  },
  ViewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});

export default Connect(ModalDetailBooking);
