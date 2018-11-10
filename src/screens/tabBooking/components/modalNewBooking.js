import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, PixelRatio, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Header from '@components/header';
import IC_MENU from '@resources/icons/icon_tabbar_active.png';
import ImageViewer from 'react-native-image-zoom-viewer';
import HeaderTitle from '@components/headerTitle';
import configs from '../../../utils/configs';
import { Calendar } from '../../../components/calendars';
import Button from '@components/button';
import moment from 'moment';
const { width } = Dimensions.get('window');
import Connect from '@stores';
const options = {
  title: 'Chụp ảnh để tải lên',
  storageOptions: {
    skipBackup: true,
    uriImage: '',
    path: 'images'
  },
  quality: 1,
  mediaType: 'photo',
  cameraType: 'front',
  maxWidth: PixelRatio.getPixelSizeForLayoutSize(300), // photos only
  maxHeight: PixelRatio.getPixelSizeForLayoutSize(150) // photos only
};

class ModalNewBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: 0,
      selected: ['2018-11-10'],
      comment: '',
      listBooking: [],
      arraySelectTime: [],
      isShowModalConfirm: false,
      checkConfirm: false,
      isShowRegulations: false
    };
  }

  async componentWillReceiveProps(nextProps) {}

  componentDidMount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.props.actions.booking.getListBookingOption(accessTokenApi);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.booking.listBookingOption && nextProps.booking.listBookingOption.success) {
      this.setState({ listBooking: nextProps.booking.listBookingOption.result });
    }
    if (nextProps.booking.createNewBooking && nextProps.booking.createNewBooking.success) {
      this.props.navigation.goBack();
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

  selectTimeBooking = (item, index) => {
    let arr = this.state.listBooking.slice();
    let flag = arr[index].isCheck || false;
    arr[index].isCheck = !flag;
    arr[index + 1].isTrue = true;
    arr[index + 2].isTrue = true;
    this.setState({ listBooking: arr });
  };

  render() {
    let dataSelected = this.mapObjectSelected();
    let item = this.props.navigation.getParam('item', null);
    const { fullUnitCode } = this.props.units.unitActive;
    const { phoneNumber, emailAddress, userName } = this.props.userProfile.profile.result.user;
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#F6F8FD', marginBottom: 100 }}>
          <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.0, y: 1.0 }} colors={['#4A89E8', '#8FBCFF']}>
              <TouchableOpacity
                style={{ position: 'absolute', top: 40, left: 20 }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Image source={require('../../../resources/icons/close.png')} />
              </TouchableOpacity>
              <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 35, margin: 20, marginTop: 100 }}>Choose Amenity</Text>
              <Calendar
                minDate={'2017-05-10'}
                maxDate={'2020-01-01'}
                onDayPress={this.onDayPress}
                // style={styles.calendar}
                backgroundColor={'transparent'}
                markingType={'custom'}
                markedDates={dataSelected}
                theme={{
                  todayTextColor: '#343D4D',
                  arrowColor: '#FFF',
                  selectedDayBackgroundColor: '#fff',
                  monthTextColor: '#FFF',
                  textSectionTitleColor: '#FFF',
                  textDayHeaderFontSize: 15
                }}
              />
            </LinearGradient>
          </LinearGradient>
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
                  resizeMode={'cover'}
                  source={{ uri: configs.API_BOOKING + item.iconPath }}
                />
                <Text style={{ color: '#343D4D', fontWeight: 'bold', fontSize: 15, flex: 1, marginLeft: 20 }}>
                  {item.amenityName}
                </Text>
                <Text style={{ color: '#4A89E8', fontSize: 13 }} />
              </View>
            }
          />
          <ItemScorll
            title={'Thời Gian'}
            view={
              <View
                style={{
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}
              >
                {this.state.listBooking.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => this.selectTimeBooking(item, index)}
                    key={index}
                    style={{
                      width: 85,
                      height: 22,
                      borderRadius: 5,
                      backgroundColor: item.isCheck ? '#4A89E8' : '#BABFC8',
                      marginVertical: 5,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {item.isTrue ? (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          backgroundColor: '#4A89E8'
                        }}
                      />
                    ) : null}
                    <Text style={{ color: '#FFF', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{`${moment(
                      item.startTime
                    ).format('hh:mm')}-${moment(item.endTime).format('hh:mm')}`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            }
          />
          <ItemScorll
            title={'Miêu Tả'}
            view={
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  height: 110,
                  width: null,
                  padding: 10,
                  paddingTop: 20
                }}
                multiline
                placeholder={'Nhập nội dung ...'}
                onChangeText={e => this.setState({ comment: e })}
              />
            }
          />
          <ItemScorll
            title={'Thông Tin'}
            view={
              <View
                style={{
                  height: 130,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around',
                  marginBottom: 20
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>Căn Hộ</Text>
                  <Text
                    style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}
                  >{`${fullUnitCode}-${userName}`}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>Mail</Text>
                  <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>{emailAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>SĐT</Text>
                  <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>{phoneNumber}</Text>
                </View>
              </View>
            }
          />
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            width: width,
            height: 100,
            backgroundColor: '#FFF',
            bottom: 0,
            paddingTop: 5,
            paddingBottom: 20,
            paddingHorizontal: 20
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ isShowRegulations: true })}>
              <Text style={{ color: '#4A89E8', fontSize: 12, textDecorationLine: 'underline', fontFamily: 'OpenSans-Italic' }}>
                Chi tiết quy định
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ checkConfirm: !this.state.checkConfirm })}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: '#505E75', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Chấp Nhận</Text>
              <Image
                style={{ marginLeft: 5, width: 17, height: 17 }}
                source={
                  this.state.checkConfirm
                    ? require('../../../resources/icons/checked.png')
                    : require('../../../resources/icons/check.png')
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              width: width - 40,
              height: 30,
              backgroundColor: '#01C772',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => this.setState({ isShowModalConfirm: true })}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Gửi</Text>
          </TouchableOpacity>
        </View>
        {this.renderModalConfirmBooking()}
        {this.renderModalRegulations()}
      </View>
    );
  }

  renderModalRegulations = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isShowRegulations}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <Text>Chưa biết bỏ gì vào đây</Text>
        </View>
      </Modal>
    );
  };

  renderModalConfirmBooking = () => {
    let dataSelected = this.mapObjectSelected();
    let item = this.props.navigation.getParam('item', null);
    const { fullUnitCode } = this.props.units.unitActive;
    const { phoneNumber, emailAddress, userName } = this.props.userProfile.profile.result.user;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isShowModalConfirm}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 60,
              backgroundColor: '#f6f8fd',
              borderRadius: 10,
              overflow: 'hidden'
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
              onPress={() => this.setState({ isShowModalConfirm: false })}
            >
              <Image source={require('../../../resources/icons/close.png')} />
            </TouchableOpacity>
            <Image
              style={{ height: 100, width: null }}
              resizeMode={'cover'}
              source={{
                uri:
                  'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Article+Image+Update/Triathlon/Build+Swimming+Endurance/carousel.jpg'
              }}
            />
            <ItemScorll
              title={'Thông Tin'}
              view={
                <View
                  style={{
                    width: null,
                    borderRadius: 10,
                    backgroundColor: '#FFF',
                    padding: 20,
                    justifyContent: 'space-around'
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Căn Hộ</Text>
                    <Text
                      style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}
                    >{`${fullUnitCode}-${userName}`}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                    <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Mail</Text>
                    <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>{emailAddress}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>SĐT</Text>
                    <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>{phoneNumber}</Text>
                  </View>
                </View>
              }
            />
            <ItemScorll
              title={'Thời Gian'}
              view={
                <View
                  style={{
                    width: null,
                    borderRadius: 10,
                    backgroundColor: '#FFF',
                    padding: 20,
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 70,
                      height: 22,
                      borderRadius: 5,
                      backgroundColor: '#4A89E8',
                      marginVertical: 10,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      width: 70,
                      height: 22,
                      borderRadius: 5,
                      backgroundColor: '#4A89E8',
                      marginVertical: 10,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      width: 70,
                      height: 22,
                      borderRadius: 5,
                      backgroundColor: '#4A89E8',
                      marginVertical: 10,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      width: 70,
                      height: 22,
                      borderRadius: 5,
                      backgroundColor: '#4A89E8',
                      marginVertical: 10,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                </View>
              }
            />
            <ItemScorll
              title={'Miêu Tả'}
              view={
                <View
                  style={{
                    backgroundColor: '#FFF',
                    borderRadius: 5,
                    width: null,
                    padding: 10,
                    minHeight: 100,
                    marginBottom: 20
                  }}
                >
                  <Text>{this.state.comment}</Text>
                </View>
              }
            />
            <Button style={{ flex: 1, margin: 20 }} onPress={() => this.submitBooking()}>
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
              >
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>Send</Text>
              </LinearGradient>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  submitBooking = () => {
    this.setState({ isShowModalConfirm: false }, () => this.props.actions.booking.createNewBooking());
  };
}

class ItemScorll extends Component {
  render() {
    const { title } = this.props;
    return (
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ marginTop: 20, marginBottom: 10, color: '#505E75', fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalNewBooking);
