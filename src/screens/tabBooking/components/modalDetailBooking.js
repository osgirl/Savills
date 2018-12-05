import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  FlatList,
  Animated,
  Platform,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView
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

import IC_CHATEMTY from '@resources/icons/chat_emty.png';

const HEADER_MAX_HEIGHT = Resolution.scale(140);
const HEADER_MIN_HEIGHT = Resolution.scale(Platform.OS === 'android' ? 50 : 70);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
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
      scrollY: new Animated.Value(0),
      popupError: false,
      marginBottom: 0
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
      nextProps.actions.booking.getListBooking(accessTokenApi, 'ACTIVE');
      nextProps.navigation.goBack();
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
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
      listener: event => {
        if (event.nativeEvent.contentOffset.y > 60) {
          if (!this.showCenter) {
            this.showCenter = true;
            this.setState({ isShowTitleHeader: true });
          }
        } else {
          if (this.showCenter) {
            this.showCenter = false;
            this.setState({ isShowTitleHeader: false });
          }
        }
      }
    })(event);
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
    }
  };

  render() {
    return this.state.loading ? null : this.renderDetail();
  }

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
      startDate
    } = this.props.booking.detailBooking.result;
    let date = moment(createdAt).format('l');

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    let tabIndex = this.props.navigation.getParam('index', false);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT }}
          onScroll={this.handleScroll}
          style={{ flex: 1, backgroundColor: '#F6F8FD', marginBottom: 70 }}
        >
          <ItemScorll
            title={'Dịch Vụ'}
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
            title={'Thông Tin'}
            view={
              <View
                style={{
                  height: 180,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around'
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>Căn Hộ</Text>
                  <Text
                    style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}
                  >{`${fullUnitId}-${name}`}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>Trạng Thái</Text>
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
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>Ngày</Text>
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
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>Thời gian</Text>
                  <Text style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>{`${moment(startDate).format(
                    'hh:mm'
                  )} - ${moment(endDate).format('hh:mm')}`}</Text>
                </View>
              </View>
            }
          />
          <ItemScorll
            title={'Miêu Tả'}
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
          <View style={{ height: 50 }} />
        </ScrollView>

        <Animated.View style={{ height: headerHeight, position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden' }}>
          <Header
            LinearGradient={true}
            leftIcon={IMAGE.close}
            leftAction={() => this.props.navigation.goBack()}
            headercolor={'transparent'}
            showTitleHeader={this.state.isShowTitleHeader}
            center={
              <View>
                <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{`#${reservationId}`}</Text>
              </View>
            }
          />
          <LinearGradient
            colors={['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: width, marginBottom: 20 }}
          >
            <HeaderTitle title={`#${reservationId}`} />
          </LinearGradient>
        </Animated.View>

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 80,
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
        {this.renderContentModalChat()}
        {this.renderModalCancel()}
        {this.renderPopupCancelError()}
        {tabIndex && tabIndex == 2 ? (
          <View
            style={{
              position: 'absolute',
              width: width,
              height: 70,
              backgroundColor: '#F6F8FD',
              bottom: 0
            }}
          />
        ) : (
          this.renderFooter()
        )}
      </View>
    );
  };

  renderContentModalChat() {
    let tabIndex = this.props.navigation.getParam('index', false);
    let id = this.props.userProfile.profile.result.user.id;

    return (
      <Modal
        style={Style.ModalChatContain}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={'always'}
        isVisible={this.state.isShowChat}
      >
        <View style={Style.ViewContainChat}>
          <TouchableOpacity onPress={() => this.setState({ isShowChat: false })}>
            <Image source={IMAGE.closeBlack} />
          </TouchableOpacity>
          <Text>#676</Text>
          <View />
        </View>
        <View style={{ flex: 1, backgroundColor: '#F6F8FD', paddingBottom: this.state.marginBottom }}>
          <FlatList
            data={this.state.listChat}
            keyExtractor={(item, index) => item.id.toString()}
            style={{ flex: 1 }}
            ref={ref => (this.flatList = ref)}
            onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
            renderItem={({ item, index }) => <ItemComment {...this.props} index={index} item={item} idUser={id} />}
            ListEmptyComponent={() => {
              return (
                <View style={{ flex: 1, height: isIphoneX() ? 500 : height - 150, alignItems: 'center', marginTop: 100 }}>
                  <Image source={IC_CHATEMTY} />
                  <Text
                    style={{ textAlign: 'center', color: '#BABFC8', marginTop: 10 }}
                  >{`Chưa có tin nào, nhắn thông tin \n cần trao đổi cho chúng tôi`}</Text>
                </View>
              );
            }}
          />
        </View>
        <KeyboardAvoidingView behavior="position" enabled>
          <LinearGradient
            colors={tabIndex && tabIndex == 2 ? ['#626467', '#626467'] : ['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={Style.ViewButtonChat}
          >
            <View style={Style.ViewButton}>
              <TextInput
                ref={input => {
                  this.textInput = input;
                }}
                editable={tabIndex && tabIndex == 2 ? false : true}
                returnKeyType={'send'}
                style={{ flex: 1, color: '#FFF' }}
                onChangeText={e => this.setState({ chatText: e })}
                onSubmitEditing={() => this.addComment()}
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                placeholder={'Nhập tin nhắn ...'}
              />
              <TouchableOpacity disabled={this.state.chatText.trim() == '' ? true : false} onPress={() => this.addComment()}>
                <Image style={{ opacity: this.state.chatText.trim() == '' ? 0.5 : 1 }} source={IMAGE.sendMessage} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  renderModalCancel = () => {
    return (
      <Modal style={Style.ModalCancel} isVisible={this.state.isShowModalCancel}>
        <View style={Style.ViewCancelContain}>
          <View style={Style.ViewSmall}>
            <Text style={Style.TextCancelContain}>Bạn muốn hủy sự kiện này</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.setState({ isShowModalCancel: false })} style={Style.TouchBackCancel}>
                <Text style={{ fontSize: 12, color: '#404040', fontFamily: 'Opensans-SemiBold' }}>Quay Lại</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.cancelBooking()} style={Style.TouchCancel}>
                <LinearGradient
                  colors={['#01C772', '#01C772']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={Style.ViewCancel}
                >
                  <Text style={Style.TextCancel}>Đồng ý</Text>
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

  renderFooter = () => {
    return (
      <View style={Style.footerContain}>
        <TouchableOpacity onPress={() => this.setState({ isShowModalCancel: true })} style={Style.buttonFooter}>
          <Text style={Style.textFooter}>Hủy</Text>
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
    position: 'absolute',
    width: width,
    height: 70,
    backgroundColor: '#FFF',
    bottom: 0,
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
