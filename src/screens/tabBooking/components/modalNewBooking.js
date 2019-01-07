import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  ActivityIndicator,
  Platform,
  DeviceEventEmitter
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import CalendarStrip from '@components/calendarAgenda';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Calendar } from '@components/calendars';
import XDate from 'xdate';

import { Header, Button, AlertWarning, Loading } from '@components';
import configs from '@utils/configs';
import moment from 'moment';
import Connect from '@stores';

import IC_CALENDAR_ARROR from '@resources/icons/arrow_calendar.png';
import IC_CALENDAR_ARROR_UP from '@resources/icons/arrow_up_calendar.png';

const { width } = Dimensions.get('window');
const IMAGE = {
  close: require('@resources/icons/close.png')
};
class ModalNewBooking extends PureComponent {
  constructor(props) {
    super(props);

    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;

    let getDayArray = languages.EVENTS_TXT_WEEK.split(',');
    let getMonthArray = languages.EVENTS_TXT_MONTH.split(',');
    XDate.locales['fr'] = {
      monthNames: getMonthArray,
      dayNamesShort: getDayArray
    };

    XDate.defaultLocale = 'fr';

    this.state = {
      area: 0,
      selectedDate: new Date(),
      selected: [moment(new Date()).format('YYYY-MM-DD')],
      comment: '',
      scrollY: new Animated.Value(0),
      listBooking: [],
      arrSelected: [],
      isShowModalConfirm: false,
      isShowTitleHeader: false,
      checkConfirm: false,
      isShowRegulations: false,
      email: this.props.userProfile.profile.result.user.emailAddress,
      sdt: this.props.userProfile.profile.result.user.phoneNumber,
      loading: false,
      isModalError: false,
      openFullCalendar: false,
      loadDingCallCalendar: false
    };
  }

  componentDidMount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let item = this.props.item;
    let data = {
      emenityId: item.amenityId,
      fromDate: this.state.selected,
      toDate: this.state.selected
    };
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    this.props.actions.booking.getListBookingOption(accessTokenApi, data);
    this.props.actions.booking.getDetailCategory(accessTokenApi, item.amenityId, languages);
  }

  componentWillReceiveProps(nextProps) {
    let accessTokenApi = this.props.account.accessTokenAPI;
    if (
      nextProps.booking.listBookingOption &&
      nextProps.booking.listBookingOption !== this.props.booking.listBookingOption &&
      nextProps.booking.listBookingOption.success
    ) {
      let arr = nextProps.booking.listBookingOption.result;
      arr.map(item => {
        (item.isCheck = false), (item.isFlag = false);
      });
      this.setState({ listBooking: arr, loadDingCallCalendar: false });
    }
    if (
      nextProps.booking.listBookingOption &&
      !nextProps.booking.listBookingOption.success &&
      this.props.booking.listBookingOption !== nextProps.booking.listBookingOption
    ) {
      this.setState({ loadDingCallCalendar: false, isModalError: true });
    }
    if (nextProps.booking.createNewBooking && nextProps.booking.createNewBooking.success && !nextProps.booking.isCreateBooking) {
      this.props.actions.booking.setFlagCreateBooking();
      this.setState({ isShowModalConfirm: false, loading: false });
      this.props.goBack();
      DeviceEventEmitter.emit('UpdateListBooking', {});
    }
    if (nextProps.booking.createNewBooking && !nextProps.booking.createNewBooking.success && !nextProps.booking.isCreateBooking) {
      this.props.actions.booking.setFlagCreateBooking();
      this.setState({ isModalError: true, arrSelected: [] });
    }
  }

  mapObjectSelected() {
    let markedDateMap = {};
    this.state.selected.map(item => {
      markedDateMap[item] = {
        selected: true,
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

  selectItem = async (index, numberSlot) => {
    let arr = this.state.listBooking.slice();
    let arrSelect = this.state.arrSelected.slice();
    let flag = arr[index].isCheck || false;
    let position = arrSelect.indexOf(index);

    if (this.state.arrSelected.length === numberSlot && arr[index].isCheck === false) {
      return;
    } else if (arr.length === 1) {
      arr[index].isCheck = !flag;
      if (position > -1) {
        arrSelect.splice(position, 1);
      } else {
        arrSelect.push(index);
      }
    } else if (index === 0) {
      if (arrSelect.length > 0 && !flag && arr[index + 1].isCheck === false) {
        return;
      } else {
        let isFlag = arr[index + 1].isFlag;
        arr[index + 1].isFlag = !isFlag;
        arr[index].isCheck = !flag;
        if (position > -1) {
          arrSelect.splice(position, 1);
        } else {
          arrSelect.push(index);
        }
      }
    } else if (index === arr.length - 1) {
      if (arrSelect.length > 0 && !flag && arr[index - 1].isCheck === false) {
        return;
      } else {
        arr[index].isCheck = !flag;
        let isFlag = arr[index - 1].isFlag;
        arr[index - 1].isFlag = !isFlag;
        if (position > -1) {
          arrSelect.splice(position, 1);
        } else {
          arrSelect.push(index);
        }
      }
    } else if (arrSelect.length > 0 && !flag && arr[index - 1].isCheck === false && arr[index + 1].isCheck === false) {
      arrSelect = [];
      arr.map(item => ((item.isCheck = false), (item.isFlag = false)));
      arr[index].isCheck = !flag;
      if (position > -1) {
        arrSelect.splice(position, 1);
      } else {
        arrSelect.push(index);
      }
    } else if (arrSelect.length > 0 && flag && arr[index + 1].isCheck && arr[index - 1].isCheck) {
      return;
    } else {
      arr[index].isCheck = !flag;
      let isFlag1 = arr[index - 1].isFlag;
      let isFlag2 = arr[index + 1].isFlag;
      arr[index - 1].isFlag = !isFlag1;
      arr[index + 1].isFlag = !isFlag2;
      if (position > -1) {
        arrSelect.splice(position, 1);
      } else {
        arrSelect.push(index);
      }
    }
    this.setState({ listBooking: arr, arrSelected: arrSelect });
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

  async _onPressDay(data) {
    let accessTokenApi = this.props.account.accessTokenAPI;
    // let item = this.props.navigation.getParam('item', null);
    let item = this.props.item;
    await this.setState(
      { selected: [data], listBooking: [], arrSelected: [], selectedDate: moment.utc(data).toDate(), loadDingCallCalendar: true },
      () => {
        let data = {
          emenityId: item.amenityId,
          fromDate: this.state.selected,
          toDate: this.state.selected
        };
        this.props.actions.booking.getListBookingOption(accessTokenApi, data);
      }
    );
  }

  onPresTripDay = date => {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let item = this.props.item;
    let data = {
      emenityId: item.amenityId,
      fromDate: moment(date).format('YYYY-MM-DD'),
      toDate: moment(date).format('YYYY-MM-DD')
    };
    this.setState({ listBooking: [], arrSelected: [], selectedDate: date, loadDingCallCalendar: true }, () => {
      this.props.actions.booking.getListBookingOption(accessTokenApi, data);
    });
  };

  render() {
    let dataSelected = this.mapObjectSelected();
    let item = this.props.item;
    const { fullUnitCode } = this.props.units.unitActive;
    const { displayName } = this.props.userProfile.profile.result.user;

    let numberSlot =
      this.props.booking.detailCategory &&
      this.props.booking.detailCategory.result &&
      this.props.booking.detailCategory.result.numOfExtendTimeSlot
        ? this.props.booking.detailCategory.result.numOfExtendTimeSlot + 1
        : 1;

    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    let getDayArray = languages.EVENTS_TXT_WEEK.split(',');

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        <Header
          LinearGradient={true}
          leftIcon={IMAGE.close}
          leftAction={() => this.props.close()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <View>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.BK_CHOOSE_AMENITY}</Text>
            </View>
          }
        />
        {this.state.openFullCalendar ? (
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.0, y: 0 }} colors={['#4A89E8', '#8FBCFF']}>
            <Calendar
              firstDay={1}
              minDate={new Date()}
              markedDates={dataSelected}
              onDayPress={data => this._onPressDay(data.dateString)}
              theme={{
                todayTextColor: '#343D4D',
                arrowColor: '#FFF',
                selectedDayBackgroundColor: '#FFF',
                monthTextColor: '#FFF',
                textSectionTitleColor: '#FFF',
                textDayHeaderFontSize: 15,
                textDayFontFamily: 'OpenSans-Regular',
                textDayFontSize: 14,
                fontWeight: 'bold'
              }}
            />
            <Button onPress={() => this.setState({ openFullCalendar: false })}>
              <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 10
                }}
              >
                <Image source={IC_CALENDAR_ARROR_UP} />
              </View>
            </Button>
          </LinearGradient>
        ) : (
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.0, y: 1.0 }} colors={['#4A89E8', '#8FBCFF']}>
            <CalendarStrip
              selectedDate={this.state.selectedDate}
              onPressDate={date => {
                this.onPresTripDay(date);
              }}
              language={getDayArray}
              onPressGoToday={today => {
                this.setState({ selectedDate: today });
              }}
              onSwipeDown={() => {
                this.setState({ openFullCalendar: true });
                // alert('onSwipeDown');
              }}
              markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01']}
            />
            <Button onPress={() => this.setState({ openFullCalendar: true })}>
              <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 10
                }}
              >
                <Image source={IC_CALENDAR_ARROR} />
              </View>
            </Button>
          </LinearGradient>
        )}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          extraHeight={200}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          enableOnAndroid
        >
          <ItemScorll
            title={languages.BK_SERVICES}
            view={
              <View
                style={{
                  height: 70,
                  width: null,
                  flex: 1,
                  borderRadius: 5,
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
                <Button style={{}} onPress={() => this.props.changeCategory()}>
                  <Text style={{ color: '#4A89E8', fontSize: 13 }}>{languages.BK_NEW_CHANGE}</Text>
                </Button>
              </View>
            }
          />
          <ItemScorll
            title={languages.BK_NEW_TIME}
            renderLeft
            languages={languages}
            number={numberSlot - this.state.arrSelected.length}
            view={
              <View
                style={{
                  width: null,
                  flex: 1,
                  borderRadius: 5,
                  backgroundColor: '#FFF',
                  padding: 20,
                  paddingVertical: 15,
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}
              >
                {this.state.listBooking.map((item, index) =>
                  item.isAvailable ? (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => this.selectItem(index, numberSlot)}
                      key={index}
                      disabled={numberSlot == this.state.arrSelected.length && item.isCheck == false}
                      style={{
                        width: 85,
                        height: 22,
                        borderRadius: 5,
                        backgroundColor: this.renderColorBooking(item, numberSlot),
                        marginVertical: 5,
                        marginRight: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {item.isFlag && item.isCheck == false ? (
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
                      ).format('HH:mm')}-${moment(item.endTime).format('HH:mm')}`}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      key={index}
                      style={{
                        width: 85,
                        height: 22,
                        borderRadius: 5,
                        backgroundColor: '#E9EBEE',
                        marginVertical: 5,
                        marginRight: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Text style={{ color: '#FFF', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{`${moment(
                        item.startTime
                      ).format('hh:mm')}-${moment(item.endTime).format('hh:mm')}`}</Text>
                    </View>
                  )
                )}
              </View>
            }
          />
          <ItemScorll
            title={languages.BK_NEW_DES}
            view={
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  height: 110,
                  width: null,
                  // paddingLeft: 20,
                  paddingTop: 20,
                  padding: 20
                }}
                returnKeyType="done"
                // onSubmitEditing={() => Keyboard.dismiss()}
                multiline
                placeholder={languages.BK_NEW_CONTENT}
                onChangeText={e => this.setState({ comment: e })}
              />
            }
          />
          <ItemScorll
            title={languages.BK_NEW_INFO}
            view={
              <View
                style={{
                  height: 130,
                  width: null,
                  flex: 1,
                  borderRadius: 5,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around',
                  marginBottom: 20
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>
                    {languages.BK_NEW_APARTEMENT}
                  </Text>
                  <Text
                    style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}
                  >{`${fullUnitCode}-${displayName}`}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>
                      {languages.BK_NEW_EMAIL}
                    </Text>
                  </View>
                  <View style={{ flex: 2, alignItems: 'flex-end' }}>
                    <TextInput
                      onChangeText={e => this.setState({ email: e })}
                      value={this.state.email}
                      underlineColorAndroid={'transparent'}
                      style={{ paddingTop: 0, color: '#4A89E8' }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 13 }}>
                    {languages.BK_NEW_PHONE}
                  </Text>
                  <TextInput
                    onChangeText={e => this.setState({ sdt: e })}
                    value={this.state.sdt}
                    underlineColorAndroid={'transparent'}
                    style={{ paddingTop: 0, color: '#4A89E8' }}
                  />
                </View>
              </View>
            }
          />
          <View
            style={{
              width: width,
              height: 100,
              backgroundColor: '#FFF',
              paddingTop: 5,
              paddingBottom: 20,
              paddingHorizontal: 20
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ isShowRegulations: true })}>
                <Text style={{ color: '#4A89E8', fontSize: 12, textDecorationLine: 'underline', fontFamily: 'OpenSans-Italic' }}>
                  {languages.BK_NEW_DETAIL_RULE}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ checkConfirm: !this.state.checkConfirm })}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ color: '#505E75', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>
                  {languages.BK_NEW_ACCEPTED}
                </Text>
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
              disabled={this.state.checkConfirm && this.state.arrSelected.length > 0 ? false : true}
              style={{
                width: width - 40,
                height: 30,
                backgroundColor: this.state.checkConfirm && this.state.arrSelected.length > 0 ? '#01C772' : '#DEDEDE',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                this.setState({ isShowModalConfirm: true });
              }}
            >
              <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{languages.BK_NEW_SEND}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <Loading visible={this.state.loadDingCallCalendar} />
        {this.renderModalConfirmBooking(languages)}
        {this.props.booking.detailCategory && this.props.booking.detailCategory.result
          ? this.renderModalRegulations(languages)
          : null}
        <AlertWarning
          clickAction={() => this.setState({ isModalError: false, loading: false })}
          isVisible={this.state.isModalError}
          message={this.props.booking.message}
        />
      </View>
    );
  }

  renderColorBooking = (item, numberSlot) => {
    if (numberSlot == this.state.arrSelected.length && item.isCheck == false) {
      return '#dbdee2';
    } else if (item.isCheck) {
      return '#4A89E8';
    } else {
      return '#BABFC8';
    }
  };

  renderModalRegulations = languages => {
    const { display, remark, policyNote, amenityName } = this.props.booking.detailCategory.result;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isShowRegulations}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 70, paddingHorizontal: 20 }}>
          <View style={{ flex: 1, borderRadius: 5, paddingTop: 40, backgroundColor: '#FFF', paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={{ position: 'absolute', top: 20, left: 20 }}
              onPress={() => this.setState({ isShowRegulations: false })}
            >
              <Image source={require('../../../resources/icons/close-black.png')} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <Text
                  style={{ color: '#505E75', fontSize: 14, fontFamily: 'OpenSans-Bold', alignSelf: 'center', marginBottom: 20 }}
                >
                  {languages.BK_SERVICES}
                </Text>
                <Text style={{ color: '#BABFC8', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>{amenityName}</Text>
                <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-Bold', fontSize: 14, marginVertical: 20 }}>
                  {languages.BK_NEW_POLICIES}
                </Text>
                <Text style={{ color: '#BABFC8', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>{`${policyNote}`}</Text>
                <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-Bold', fontSize: 14, marginVertical: 20 }}>
                  {languages.BK_NEW_REMARK}
                </Text>
                <Text style={{ color: '#BABFC8', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>{remark}</Text>
              </ScrollView>
            </View>
            <Button
              style={{
                width: width - 80,
                height: 50,
                marginBottom: 20,
                shadowColor: '#4A89E8',
                shadowOffset: { width: 3, heigth: 6 },
                shadowOpatity: 1
              }}
              onPress={() => this.setState({ isShowRegulations: false, checkConfirm: true })}
            >
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
              >
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>
                  {languages.BK_NEW_CONFIRM}
                </Text>
              </LinearGradient>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  renderModalConfirmBooking = languages => {
    const { fullUnitCode } = this.props.units.unitActive;
    const { phoneNumber, emailAddress, displayName } = this.props.userProfile.profile.result.user;
    let listSelect = this.state.listBooking.filter(e => e.isCheck == true);
    let startTime = listSelect[0] && listSelect[0].startTime ? listSelect[0].startTime : 0;
    let endTime = listSelect[0] && listSelect[0].endTime ? listSelect[listSelect.length - 1].endTime : 0;
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
              marginVertical: 40,
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
            <Image style={{ height: 100, width: null }} resizeMode={'cover'} source={require('@resources/image/Swim.png')} />
            <ScrollView style={{ flex: 1 }}>
              <ItemScorll
                title={languages.BK_NEW_INFO}
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
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {languages.BK_NEW_APARTEMENT}
                      </Text>
                      <Text
                        style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}
                      >{`${fullUnitCode}-${displayName}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                          {languages.BK_NEW_EMAIL}
                        </Text>
                      </View>
                      <View style={{ flex: 2, alignItems: 'flex-end' }}>
                        <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }} numberOfLines={1}>
                          {this.state.email}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {languages.BK_NEW_PHONE}
                      </Text>
                      <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>{this.state.sdt}</Text>
                    </View>
                  </View>
                }
              />
              <ItemScorll
                title={languages.BK_NEW_TIME}
                view={
                  <View
                    style={{
                      width: null,
                      borderRadius: 5,
                      padding: 20,
                      backgroundColor: '#FFF',
                      justifyContent: 'space-around',
                      flexWrap: 'wrap'
                    }}
                  >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {languages.BK_MODAL_CONFIM_DAY}
                      </Text>
                      <Text style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {moment(this.state.selectedDate).format('DD/MM/YYYY')}
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                      <Text style={{ color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {languages.BK_MODAL_CONFIM_TIME}
                      </Text>
                      <Text style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {startTime && startTime != undefined && endTime && endTime != undefined
                          ? `${moment(startTime).format('HH:mm')}-${moment(endTime).format('HH:mm')}`
                          : ''}
                      </Text>
                    </View>
                  </View>
                }
              />
              <ItemScorll
                title={languages.BK_NEW_DES}
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
            </ScrollView>
            <Button
              disabled={this.state.loading}
              style={{ width: width - 80, marginHorizontal: 20, height: 50, marginBottom: 20 }}
              onPress={() => this.submitBooking()}
            >
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
              >
                {this.state.loading ? (
                  <ActivityIndicator animating={this.state.loading} color={'#FFF'} />
                ) : (
                  <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>{languages.BK_NEW_SEND}</Text>
                )}
              </LinearGradient>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  submitBooking = () => {
    this.setState({ isShowModalConfirm: false });
    let listSelect = this.state.listBooking.filter(e => e.isCheck == true);
    let startTime = listSelect[0].startTime;
    let endTime = listSelect[listSelect.length - 1].endTime;
    // let item = this.props.navigation.getParam('item', null);
    let item = this.props.item;
    let accessTokenApi = this.props.account.accessTokenAPI;
    const { fullUnitCode, buildingId, floorId, unitId } = this.props.units.unitActive;
    const { name, id, phoneNumber, emailAddress, displayName, profilePictureId } = this.props.userProfile.profile.result.user;
    const tenantId = this.props.userProfile.profile.result.tenant.id;
    let Booking = {
      startDate: startTime,
      endDate: endTime,
      amenityId: item.amenityId,
      status: 'REQUESTED',
      amenity: {
        amenityId: item.amenityId,
        amenityName: item.amenityName
      },
      buildingId: buildingId,
      unitId: unitId,
      fullUnitId: fullUnitCode,
      userId: id,
      name: displayName,
      phone: this.state.phone,
      email: this.state.email,
      userName: displayName,
      profilePictureId: profilePictureId,
      paymentStatus: null,
      remark: this.state.comment,
      isAcceptPolicy: true,
      tenantId: tenantId
    };
    this.setState({ loading: true, isShowModalConfirm: false });
    this.props.actions.booking.createNewBooking(accessTokenApi, Booking);
  };
}

class ItemScorll extends PureComponent {
  render() {
    const { title, renderLeft, number, languages } = this.props;
    return (
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 20, marginBottom: 10, color: '#505E75', fontSize: 14, fontWeight: 'bold', flex: 1 }}>
            {title}
          </Text>
          {renderLeft ? (
            <Text style={{ marginTop: 20, marginBottom: 10, color: '#505E75', fontSize: 10 }}>
              {languages.BK_NEW_SELECTED}
              <Text style={{ color: '#FF361A', fontSize: 14, fontSize: 14, fontWeight: 'bold' }}>{` ${number} `}</Text> Slot
            </Text>
          ) : null}
        </View>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalNewBooking);
