import React, { Component } from 'react';
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
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Modal from 'react-native-modal';
const { width, height } = Dimensions.get('window');
import Connect from '@stores';
import ItemComment from '@components/itemComment';
import Resolution from '@utils/resolution';
import Header from '@components/header';
import HeaderTitle from '@components/headerTitle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '@components/button';
import { isIphoneX } from 'react-native-iphone-x-helper';
const HEADER_MAX_HEIGHT = Resolution.scale(140);
const HEADER_MIN_HEIGHT = Resolution.scale(Platform.OS === 'android' ? 50 : 70);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ModalDetailBooking extends Component {
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
      popupError: false
    };
  }

  componentDidMount = () => {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let id = this.props.navigation.getParam('id', null);
    this.props.actions.booking.getDetailBooking(accessTokenApi, id);
    this.props.actions.workOrder.getCommentUnread(accessTokenApi, id, 3);
  };

  async componentWillReceiveProps(nextProps) {
    let accessTokenApi = this.props.account.accessTokenAPI;
    if (
      nextProps.booking.detailBooking &&
      nextProps.booking.detailBooking.success &&
      this.props.booking.detailBooking != nextProps.booking.detailBooking
    ) {
      this.setState({ loading: false });
      this.props.actions.workOrder.getCommentUser(accessTokenApi, nextProps.booking.detailBooking.result.guid);
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
    if (nextProps.workOrder.listComment && nextProps.workOrder.listComment.success) {
      this.setState({ listChat: nextProps.workOrder.listComment.result.items });
    }
    if (
      nextProps.booking.changeStatusBooking &&
      nextProps.booking.changeStatusBooking.success &&
      !nextProps.booking.isChangeStatus
    ) {
      nextProps.actions.booking.setFlagChangeStatus();
      this.props.actions.booking.getListBooking(accessTokenApi, 'ACTIVE');
      this.props.navigation.goBack();
    }
    if (
      nextProps.workOrder.addComment &&
      nextProps.workOrder.addComment.success &&
      this.props.workOrder.addComment != nextProps.workOrder.addComment
    ) {
      this.textInput.clear();
      this.props.actions.workOrder.getCommentUser(accessTokenApi, nextProps.booking.detailBooking.result.guid);
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
                      <Image
                        style={{ marginRight: 10, width: 15, height: 15 }}
                        source={require('../../../resources/icons/calendar.png')}
                      />
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
            leftIcon={require('../../../resources/icons/close.png')}
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
            bottom: 100,
            right: 20
          }}
          onPress={() => this.setState({ isShowChat: true })}
        >
          <Image source={require('../../../resources/icons/chat-big.png')} />
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
        {this.renderFooter()}
      </View>
    );
  };

  renderContentModalChat() {
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 50 }} isVisible={this.state.isShowChat}>
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
          <TouchableOpacity onPress={() => this.setState({ isShowChat: false })}>
            <Image source={require('../../../resources/icons/close-black.png')} />
          </TouchableOpacity>
          <Text>#676</Text>
          <View />
        </View>
        {/* <ScrollView style={{ flex: 1 }}> */}
        <KeyboardAwareScrollView extraScrollHeight={50} extraHeight={-300}>
          <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1, backgroundColor: '#F6F8FD', paddingBottom: 70 }}>
              <FlatList
                data={this.state.listChat}
                keyExtractor={(item, index) => item.id.toString()}
                style={{
                  maxHeight: isIphoneX() ? 500 : height - 150,
                  minHeight: isIphoneX() ? 500 : height - 150
                }}
                renderItem={({ item, index }) => <ItemComment index={index} item={item} />}
                ListEmptyComponent={() => {
                  return (
                    <View style={{ flex: 1, height: isIphoneX() ? 500 : height - 150, alignItems: 'center', marginTop: 100 }}>
                      <Image source={require('../../../resources/icons/chat-big.png')} />
                      <Text
                        style={{ textAlign: 'center', color: '#BABFC8', marginTop: 10 }}
                      >{`Chưa có tin nào, nhắn thông tin \n cần trao đổi cho chúng tôi`}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <LinearGradient
              colors={['#4A89E8', '#8FBCFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: width - 40,
                position: 'absolute',
                bottom: 20,
                left: 20,
                height: 50,

                borderRadius: 10
              }}
            >
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <TextInput
                  ref={input => {
                    this.textInput = input;
                  }}
                  style={{ flex: 1, color: '#FFF' }}
                  onChangeText={e => this.setState({ chatText: e })}
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  placeholder={'Nhập tin nhắn ...'}
                />
                <TouchableOpacity onPress={() => this.addComment()}>
                  <Image source={require('../../../resources/icons/send-mess.png')} />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </KeyboardAwareScrollView>
        {/* </ScrollView> */}
      </Modal>
    );
  }

  renderModalCancel = () => {
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} isVisible={this.state.isShowModalCancel}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: width - 40,
              height: 120,
              borderRadius: 10,
              backgroundColor: '#FFF',
              marginHorizontal: 20,
              alignItems: 'center',
              padding: 20
            }}
          >
            <Text style={{ marginBottom: 20, color: '#BABFC8', fontFamily: 'Opensans-SemiBold', fontSize: 14 }}>
              Bạn muốn hủy sự kiện này
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => this.setState({ isShowModalCancel: false })}
                style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 12, color: '#404040', fontFamily: 'Opensans-SemiBold' }}>Quay Lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.cancelBooking()}
                style={{
                  flex: 1,
                  marginLeft: 20
                }}
              >
                <LinearGradient
                  colors={['#01C772', '#01C772']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
                >
                  <Text style={{ fontSize: 12, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>Đồng ý</Text>
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
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} isVisible={this.state.popupError}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: width - 40,
              borderRadius: 10,
              backgroundColor: '#FFF',
              marginHorizontal: 20,
              alignItems: 'center',
              padding: 20
            }}
          >
            <Image source={require('../../../resources/icons/warning.png')} />
            <Text style={{ marginVertical: 10, color: '#505E75', fontSize: 13, fontFamily: 'OpenSans-Bold' }}>Sorry!</Text>
            <Text style={{ marginBottom: 20, color: '#BABFC8', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>
              {this.props.booking.changeStatusBooking && !this.props.booking.changeStatusBooking.success
                ? this.props.booking.changeStatusBooking.error.message
                : ''}
            </Text>
            <Button style={{ width: width - 80, marginHorizontal: 20, height: 50 }} onPress={() => this.clickOk()}>
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
              >
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>OK</Text>
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
      <View style={{ position: 'absolute', width: width, height: 70, backgroundColor: '#FFF', bottom: 0, padding: 20 }}>
        <TouchableOpacity
          onPress={() => this.setState({ isShowModalCancel: true })}
          style={{ flex: 1, backgroundColor: '#404040', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Hủy</Text>
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

class ItemScorll extends Component {
  render() {
    const { title } = this.props;
    return (
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={{ marginTop: 20, marginBottom: 10, color: '#505E75', fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalDetailBooking);
