import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Animated,
  Platform,
  KeyboardAvoidingView,
  findNodeHandle
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImageViewer from 'react-native-image-zoom-viewer';
import Connect from '@stores';
import moment from 'moment';
import Header from '@components/header';
import ItemComment from '@components/itemComment';
import HeaderTitle from '@components/headerTitle';
import Modal from 'react-native-modal';
import Resolution from '@utils/resolution';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isIphoneX } from 'react-native-iphone-x-helper';

const STAR_ON = require('../../../resources/icons/Star-big.png');
const STAR_OFF = require('../../../resources/icons/Star.png');

const HEADER_MAX_HEIGHT = Resolution.scale(140);
const HEADER_MIN_HEIGHT = Resolution.scale(Platform.OS === 'android' ? 50 : 70);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const { width, height } = Dimensions.get('window');
class ModalEditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailIntroduction: {},
      listComment: false,
      isShowChat: false,
      isShowRating: false,
      loading: true,
      vote: 0,
      description: '',
      comment: '',
      scrollY: new Animated.Value(0),
      isShowTitleHeader: false,
      showModalConfirmCancel: false,
      showImage: false
    };
  }

  componentWillMount = async () => {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    let id = this.props.navigation.getParam('id', 0);
    await this.props.actions.frontDesk.getDetailIntrustion(accessTokenAPI, id);
  };

  componentWillReceiveProps = nextProps => {
    const { id } = this.props.userProfile.profile.result.user;
    let accessTokenAPI = this.props.account.accessTokenAPI;
    if (
      nextProps.frontDesk.detailIntroduction &&
      nextProps.frontDesk.detailIntroduction.success &&
      this.props.frontDesk.detailIntroduction != nextProps.frontDesk.detailIntroduction
    ) {
      this.setState({ detailIntroduction: nextProps.frontDesk.detailIntroduction.result, loading: false });
    }
  };

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

  renderModalCancel = () => {
    return (
      <Modal
        style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 50 }}
        isVisible={this.state.showModalConfirmCancel}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
              Bạn muốn hủy order này
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => this.setState({ showModalConfirmCancel: false })}
                style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 12, color: '#404040', fontFamily: 'Opensans-SemiBold' }}>Quay Lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.changeStatusWorkOrder(16)}
                style={{
                  flex: 1,
                  marginLeft: 20
                }}
              >
                <LinearGradient
                  colors={['#4A89E8', '#8FBCFF']}
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

  changeStatusWorkOrder = idStatus => {
    const { fullUnitCode, buildingId, floorId, unitId } = this.props.units.unitActive;
    let accessTokenAPI = this.props.account.accessTokenAPI;
    const { name, id, phoneNumber, emailAddress, displayName } = this.props.userProfile.profile.result.user;
    let WorkOrder = {
      id: this.state.detailOrder.id,
      guid: this.state.detailOrder.guid,
      currentStatusId: idStatus,
      createdUserFullName: displayName,
      updateUserFullName: '',
      fullUnitId: unitId,
      fullUnitName: `${fullUnitCode} - ${displayName}`,
      fullUnitCode: fullUnitCode,
      description: this.state.description,
      sourceId: 3,
      rating: this.state.vote,
      dateCreate: this.state.detailOrder.dateCreate,
      maintainanceTeamId: 1,
      areaId: 50,
      categoryId: 90,
      isPrivate: true,
      contact: {
        email: emailAddress,
        phoneNumber: phoneNumber,
        memberId: id
      }
    };
    this.props.actions.workOrder.updateWorkOrder(accessTokenAPI, WorkOrder);
  };

  renderStartDetail = number => {
    let start = [];
    for (let i = 0; i < number; i++) {
      start.push(
        <Image key={i} style={{ width: 12, height: 12, margin: 2 }} source={require('../../../resources/icons/Star-big.png')} />
      );
    }
    for (let i = 0; i < 5 - number; i++) {
      start.push(
        <Image key={i + 10} style={{ width: 12, height: 12, margin: 2 }} source={require('../../../resources/icons/Star.png')} />
      );
    }
    return start;
  };

  render() {
    const { fullUnitCode, instructionStatus, dateCreate, id, rating, description } = this.state.detailIntroduction;
    const { phoneNumber, emailAddress, displayName } = this.props.userProfile.profile.result.user;

    let date = moment(dateCreate).format('l');
    let time = moment(dateCreate).format('LT');
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    return this.state.loading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT }}
          onScroll={this.handleScroll}
          style={{ flex: 1, backgroundColor: '#F6F8FD' }}
        >
          <ItemScorll
            title={'Thông Tin'}
            view={
              <View
                style={{
                  height: 200,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around'
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Căn Hộ</Text>
                  <Text style={{ color: '#BABFC8', fontWeight: '500' }}>{fullUnitCode}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Mail</Text>
                  <Text style={{ color: '#4A89E8', fontWeight: '500' }}>{emailAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>SĐT</Text>
                  <Text style={{ color: '#4A89E8', fontWeight: '500' }}>{phoneNumber}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Trạng Thái</Text>
                  <View
                    style={{
                      borderRadius: 5,
                      backgroundColor: instructionStatus.colorCode
                    }}
                  >
                    <Text style={{ color: '#FFF', fontSize: 10, paddingVertical: 5, fontWeight: 'bold', paddingHorizontal: 15 }}>
                      {instructionStatus.name}
                    </Text>
                  </View>
                </View>
              </View>
            }
          />
          <ItemScorll
            title={'Trạng Thái'}
            view={
              <View
                style={{
                  height: 90,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Đang hoạt động</Text>
                  <Image source={require('@resources/icons/checked.png')} />
                </View>
              </View>
            }
          />
          <ItemScorll
            title={'Thời gian'}
            view={
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  width: null,
                  padding: 10,
                  minHeight: 100
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Ngày bắt đầu</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ marginRight: 10, width: 15, height: 15 }} source={require('@resources/icons/clock.png')} />
                    <Text style={{ color: '#C9CDD4' }}>{time}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ marginRight: 10, width: 15, height: 15 }} source={require('@resources/icons/calendar.png')} />
                    <Text style={{ color: '#C9CDD4' }}>{date}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Ngày kết thúc</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ marginRight: 10, width: 15, height: 15 }} source={require('@resources/icons/clock.png')} />
                    <Text style={{ color: '#C9CDD4' }}>{time}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ marginRight: 10, width: 15, height: 15 }} source={require('@resources/icons/calendar.png')} />
                    <Text style={{ color: '#C9CDD4' }}>{date}</Text>
                  </View>
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
                  padding: 10,
                  minHeight: 100,
                  marginBottom: 200
                }}
              >
                <Text>{description}</Text>
              </View>
            }
          />
        </ScrollView>
        {this.renderModalCancel()}
        <Animated.View style={{ height: headerHeight, position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden' }}>
          <Header
            LinearGradient={true}
            leftIcon={require('../../../resources/icons/close.png')}
            leftAction={() => this.props.navigation.goBack()}
            headercolor={'transparent'}
            showTitleHeader={this.state.isShowTitleHeader}
            center={
              <View>
                <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{`#${id}`}</Text>
              </View>
            }
          />
          <LinearGradient
            colors={['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: width, marginBottom: 20 }}
          >
            <HeaderTitle title={`#${id}`} />
          </LinearGradient>
        </Animated.View>
        {/* {this.showDetailImage()} */}
      </View>
    );
  }

  renderFooter = () => {
    return (
      <View
        style={{
          width: width,
          height: 80,
          backgroundColor: '#FFF',
          padding: 20,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.16
        }}
      >
        <TouchableOpacity
          onPress={() => this.setState({ isShowRating: true })}
          style={{ flex: 1, backgroundColor: '#01C772', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Hoàn Tất</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#343D4D',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 20
          }}
          onPress={() => this.setState({ showModalConfirmCancel: true })}
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Hủy</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // renderItemImage = (index, item) => {
  //   let encToken = this.props.account.encToken;
  //   let image = `${item.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
  //   return (
  //     <TouchableOpacity key={index} onPress={() => this.setState({ showImage: true })}>
  //       <Image
  //         style={{ width: 90, height: 90, marginLeft: 20, borderRadius: 10 }}
  //         resizeMode={'cover'}
  //         source={{
  //           uri: image
  //         }}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

  voteProduct(data) {
    this.setState({
      vote: data
    });
  }

  renderOneStar = (data, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => this.voteProduct(data)} style={{ marginRight: 10 }}>
        <Image style={{ width: 34, height: 34, resizeMode: 'contain' }} source={data <= this.state.vote ? STAR_ON : STAR_OFF} />
      </TouchableOpacity>
    );
  };

  renderModalRating = () => {
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} isVisible={this.state.isShowRating}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: width - 40,
              borderRadius: 10,
              backgroundColor: '#FFF',
              alignItems: 'center',
              padding: 20
            }}
          >
            <Text style={{ color: '#505E75', fontSize: 60, fontWeight: '700' }}>
              {this.state.vote}
              .0
            </Text>
            <Text
              style={{ textAlign: 'center', color: '#BABFC8', marginTop: 10, fontSize: 14 }}
            >{`Hãy đánh giá dịch vụ của \n Chúng tôi`}</Text>
            <View
              style={{
                width: width - 40,
                height: 34,
                marginVertical: 20,
                backgroundColor: '#FFF',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {[1, 2, 3, 4, 5].map((data, index) => this.renderOneStar(data, index))}
            </View>
            <TextInput
              style={{
                width: width - 80,
                height: 80,
                marginVertical: 20,
                borderRadius: 10,
                backgroundColor: '#FFF',
                padding: 10,
                paddingTop: 10
              }}
              placeholder={'Nhập nội dung nhận xét'}
              multiline
              onChangeText={e => this.setState({ description: e })}
            />
            <TouchableOpacity onPress={() => this.changeStatusWorkOrder(15)}>
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 25,
                  width: width - 80,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Send</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  showDetailImage() {
    const newData = [];
    let encToken = this.props.account.encToken;
    {
      this.state.detailOrder.fileUrls && this.state.detailOrder.fileUrls.length > 0
        ? this.state.detailOrder.fileUrls.map(value => {
            if (value == null) {
              return;
            }
            if (value.fileUrl) {
              newData.push({ url: `${value.fileUrl}&encToken=${encodeURIComponent(encToken)}` });
            } else {
              newData.push({ url: value });
            }
          })
        : null;
    }
    return (
      <Modal
        visible={this.state.showImage}
        transparent={false}
        animationType="slide"
        onRequestClose={() => this.setState({ showImage: false })}
      >
        <ImageViewer imageUrls={newData} index={0} />
        <TouchableOpacity
          onPress={() => this.setState({ showImage: false })}
          style={{
            position: 'absolute',
            top: 35,
            left: 20,
            width: 50,
            height: 50
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              fontSize: 18,
              backgroundColor: 'transparent'
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }

  renderContentModalChat() {
    let focusChat = {};
    let id = this.props.userProfile.profile.result.user.id;
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
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <KeyboardAwareScrollView extraScrollHeight={50} extraHeight={-250}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, backgroundColor: '#F6F8FD', paddingBottom: 70 }}>
                <FlatList
                  data={this.state.listComment}
                  style={{ maxHeight: isIphoneX() ? 500 : height - 150, minHeight: isIphoneX() ? 500 : height - 150 }}
                  keyExtractor={(item, index) => item.id.toString()}
                  renderItem={({ item, index }) => <ItemComment index={index} item={item} idUser={id} />}
                  ListEmptyComponent={() => {
                    return (
                      <View style={{ flex: 1, alignItems: 'center', marginTop: 100, height: isIphoneX() ? 500 : height - 150 }}>
                        <Image source={require('../../../resources/icons/chat-big.png')} />
                        <Text
                          style={{ textAlign: 'center', color: '#BABFC8', marginTop: 10 }}
                        >{`Chưa có tin nào, nhắn thông tin \n cần trao đổi cho chúng tôi`}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
            <LinearGradient
              colors={['#4A89E8', '#8FBCFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                {
                  width: width - 40,
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  height: 50,
                  borderRadius: 10
                },
                focusChat
              ]}
            >
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <TextInput
                  ref={input => {
                    this.textInput = input;
                  }}
                  style={{ flex: 1, color: '#FFF' }}
                  onChangeText={e => this.setState({ comment: e })}
                  placeholderTextColor={'rgba(255,255,255,0.7)'}
                  placeholder={'Nhập tin nhắn ...'}
                />
                <TouchableOpacity onPress={() => this.addComment()}>
                  <Image source={require('../../../resources/icons/send-mess.png')} />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </KeyboardAwareScrollView>
        </ScrollView>
      </Modal>
    );
  }
}

class ItemScorll extends Component {
  render() {
    const { title, view } = this.props;
    return (
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={{ marginTop: 20, marginBottom: 10, color: '#505E75', fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalEditOrder);
