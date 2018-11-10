import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, PixelRatio, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Header from '@components/header';
import IC_MENU from '@resources/icons/icon_tabbar_active.png';
import ImageViewer from 'react-native-image-zoom-viewer';
import HeaderTitle from '@components/headerTitle';
import { Calendar } from '../../../components/calendars';
import Resolution from '../../../utils/resolution';
import moment from 'moment';
const { width } = Dimensions.get('window');
import Connect from '@stores';

class ModalDetailBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ['2018-10-31', '2018-10-29', '2018-10-20', '2018-10-19'],
      comment: '',
      loading: true,
      isShowModalCancel: false
    };
  }

  componentDidMount = () => {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let id = this.props.navigation.getParam('id', null);
    this.props.actions.booking.getDetailBooking(accessTokenApi, id);
  };

  async componentWillReceiveProps(nextProps) {
    if (nextProps.booking.detailBooking && nextProps.booking.detailBooking.success) {
      this.setState({ loading: false });
    }
  }

  mapObjectSelected() {
    let markedDateMap = {};
    this.state.selected.map(item => {
      markedDateMap[item] = {
        selected: true,
        // disableTouchEvent: true,
        selectedDotColor: 'orange',
        customStyles: {
          container: {
            backgroundColor: 'white',
            elevation: 2
          },
          text: {
            color: '#4A89E8',
            fontWeight: 'bold'
          }
        }
      };
    });
    return markedDateMap;
  }

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
    console.log('asdlasdasdlkasjdlkasdjlaksdjlkasda', this.props.booking.detailBooking.result);
    let date = moment(createdAt).format('l');
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.0, y: 1.0 }} colors={['#4A89E8', '#8FBCFF']} style={{ height: 200 }}>
          <TouchableOpacity style={{ position: 'absolute', top: 40, left: 20 }} onPress={() => this.props.navigation.goBack()}>
            <Image source={require('../../../resources/icons/close.png')} />
          </TouchableOpacity>
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 35, margin: 20, marginTop: 100 }}>#{reservationId}</Text>
        </LinearGradient>
        <ScrollView style={{ flex: 1, backgroundColor: '#F6F8FD', marginBottom: 70 }}>
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
                }}
              >
                <Text>{remark}</Text>
              </View>
            }
          />
        </ScrollView>
        {this.renderModalCancel()}
        {this.renderFooter()}
      </View>
    );
  };

  renderModalCancel = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isShowModalCancel}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
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
    this.setState({ isShowModalCancel: false }, () => this.props.actions.booking.changeStatusBooking('', id));
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