import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Image, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { HeaderTitle, Button, FastImage, Header, ModalSelectUnit, PlaceHolderItemH } from '@components';

import moment from 'moment';
import XDate from 'xdate';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

import IC_CALENDAR from '@resources/icons/calendar.png';
import IC_CLOCK from '@resources/icons/clock.png';
import IC_CALENDAR_ARROR from '@resources/icons/arrow_calendar.png';
import IC_CALENDAR_ARROR_UP from '@resources/icons/arrow_up_calendar.png';
import IC_DROPDOWN from '@resources/icons/dropDown.png';
import IC_EVENTEMTY from '@resources/icons/Events_emty.png';
import IC_BACK from '@resources/icons/back-light.png';

import Utils from '@utils';
import Resolution from '@utils/resolution';
import { Calendar } from '@components/calendars';
import ModalDetail from './components/modalDetail';
import { ItemHorizontal } from '@components/placeHolder';
import ModalFull from './components/modalFull';
import CalendarStrip from '@components/calendarAgenda';

const HEADER_MAX_HEIGHT = Resolution.scale(50);

const { width } = Dimensions.get('window');
export default class Layout extends Component {
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
    this.check = false;
  }

  async _onPressDay(data) {
    let date = moment(data).format('YYYY-MM-DD');
    await this.setState({ dateSelected: date });
    await this._getEventsToDate(new Date(date).toISOString());

    let tempOverView = await this.props.events.overView.result;
    let objectOverview = this.mapObjectSelected(tempOverView, date);
    this.setState({ overViewDate: objectOverview });
  }

  onScroll = e => {
    const scrollSensitivity = 4;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    if (offset > 19 && this.state.openFullCalendar) {
      this.setState({ openFullCalendar: false });
    }
    this.state.scrollY.setValue(offset);
  };

  componentDidMount() {
    this.state.scrollY.addListener(({ value }) => (this.offset = value));
  }

  renderHeader(languages) {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 20],
      outputRange: [0, -HEADER_MAX_HEIGHT],
      extrapolate: 'clamp'
    });

    const testheight = this.state.scrollY.interpolate({
      inputRange: [0, 20],
      outputRange: [HEADER_MAX_HEIGHT, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 20],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    let getDayArray = languages.EVENTS_TXT_WEEK.split(',');
    return (
      <Animated.View style={{ zIndex: -1 }}>
        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{}}>
          <Animated.View
            style={{
              transform: [{ translateY: headerTranslate }],
              height: testheight,
              opacity: opacity
            }}
          >
            <View style={{ position: 'absolute' }}>
              <HeaderTitle title={languages.EVENTS_TXT_TITLE} />
            </View>
          </Animated.View>
          {this.state.openFullCalendar ? (
            <View style={{}}>
              <Calendar
                style={styles.calendar}
                firstDay={1}
                markedDates={this.state.overViewDate}
                onDayPress={data => this._onPressDay(data.dateString)}
                theme={{
                  todayTextColor: '#343D4D',
                  arrowColor: '#FFF',
                  selectedDayBackgroundColor: '#FFF',
                  monthTextColor: '#FFF',
                  textSectionTitleColor: '#FFF',
                  textDayHeaderFontSize: 15,
                  textDayFontFamily: 'OpenSans-Regular',
                  textDayFontSize: 14
                }}
              />
              <TouchableOpacity onPress={() => this.setState({ openFullCalendar: false })}>
                <View
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                    width: 100
                  }}
                >
                  <Image source={IC_CALENDAR_ARROR_UP} />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
              <View style={{}}>
                <CalendarStrip
                  selectedDate={this.state.dateSelected ? this.state.dateSelected : new Date()}
                  onPressDate={date => {
                    this._onPressDay(date);
                  }}
                  language={getDayArray}
                  onPressGoToday={today => { }}
                  onSwipeDown={() => { }}
                  markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01']}
                />
                <TouchableOpacity onPress={() => this.setState({ openFullCalendar: true })}>
                  <View
                    style={{
                      alignSelf: 'center',
                      alignItems: 'center',
                      marginBottom: 10,
                      width: 100
                    }}
                  >
                    <Image source={IC_CALENDAR_ARROR} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
        </LinearGradient>
      </Animated.View>
    );
  }

  renderEmty(languages) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: Resolution.scale(60), zIndex: -20 }}>
        <Image source={IC_EVENTEMTY} />
        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>
          {languages.EVENT_EMPTY_EVENT_1}
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>
          {languages.EVENT_EMPTY_EVENT_2}
        </Text>
      </View>
    );
  }

  render() {
    let unitActive = this.props.units.unitActive;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    const isShow = this.state.scrollY.interpolate({
      inputRange: [0, 15],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: isShow }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.EVENTS_TXT_TITLE}</Text>
            </Animated.View>
          }
          renderViewRight={
            <Button
              onPress={() => this._onpenModalSelectUnit()}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: Resolution.scale(20) }}
            >
              <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: Resolution.scale(14) }}>
                {unitActive.fullUnitCode}
              </Text>
              <Image source={IC_DROPDOWN} style={{ marginLeft: Resolution.scale(10) }} />
            </Button>
          }
        />
        {this.renderHeader(languages)}

        {this.state.loadingFetching ? (
          <PlaceHolderItemH noMargin />
        ) : !this.state.loadingFetching && this.state.myEvent.length <= 0 ? (
          this.renderEmty(languages)
        ) : (
              <FlatList
                alwaysBounceVertical={false}
                data={this.state.myEvent.length > 0 ? this.state.myEvent : Utils.dataPlaceholderEvents}
                keyExtractor={item => item.eventId + ''}
                renderItem={({ item, index }) => this.renderItem(item, index, this.state.myEvent.length > 0 ? true : false)}
                onScroll={this.onScroll}
                contentContainerStyle={{ zIndex: 1 }}
                style={{ zIndex: 200 }}
                scrollEventThrottle={16}
                legacyImplementation={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: Resolution.scaleHeight(10) }} />}
                ListHeaderComponent={() => (
                  <View
                    style={{
                      marginTop: Resolution.scale(20),
                      marginBottom: Resolution.scale(10),
                      marginHorizontal: Resolution.scale(20)
                    }}
                  >
                    <Text style={{ fontSize: Resolution.scale(15), fontFamily: 'OpenSans-Bold', color: '#505E75' }}>
                      {this.state.dateSelected
                        ? moment(this.state.dateSelected)
                          .format('DD-MM-YYYY')
                          .toString()
                        : languages.EVENTS_TXT_ALLTITLE}
                    </Text>
                  </View>
                )}
                ListFooterComponent={() => <View style={{ height: Resolution.scaleHeight(20) }} />}
              />
            )}

        <Modal
          style={{ flex: 1, marginTop: Resolution.scale(50), marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          isVisible={this.state.isShowModalDetail}
        >
          <ModalDetail onClose={() => this._closeModalDetail()} id={this.state.eventId} />
        </Modal>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowModalFull}>
          <ModalFull
            onClose={() => this._closeModalFull()}
            eventIndate={this.state.myEvent}
            dateSelected={this.state.dateSelected}
          />
        </Modal>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this._onCloseModalSelectUnit()} />
        </Modal>
      </View>
    );
  }

  renderItem(item, index, loading) {
    let encToken = this.props.account.encToken;
    let image = `${item.fileUrl}&encToken=${encodeURIComponent(encToken)}`;

    let startTime = moment(item.startTime).format('HH:mm');
    let startDate = moment(item.startTime).format('DD/MM');
    let endDate = moment(item.endTime).format('DD/MM');
    return (
      <ItemHorizontal key={'__PLD' + index} onReady={loading} bgColor={'#FFF'} animate="fade">
        <Button onPress={() => this._openModalDetail(item.eventId)} style={[styles.item, { flexDirection: 'row' }]}>
          <FastImage
            style={{
              width: Resolution.scaleWidth(103),
              height: Resolution.scaleHeight(103),
              borderRadius: 5,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0
            }}
            source={image}
            resizeMode={'cover'}
          />

          <View style={{ width: width - Resolution.scale(140), flexDirection: 'column' }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: Resolution.scale(13),
                fontFamily: 'OpenSans-Bold',
                color: '#343D4D',
                marginLeft: Resolution.scale(20),
                marginRight: Resolution.scale(20),
                marginTop: Resolution.scale(20)
              }}
            >
              {item.subject}
            </Text>
            <View style={{ flexDirection: 'row', marginLeft: Resolution.scale(20), marginTop: Resolution.scale(10) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={IC_CLOCK} />
                <Text
                  style={{
                    marginLeft: Resolution.scale(10),
                    fontSize: Resolution.scale(12),
                    color: '#C9CDD4',
                    fontFamily: 'OpenSans-Regular'
                  }}
                >
                  {startTime}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Resolution.scale(20) }}>
                <Image source={IC_CALENDAR} style={{}} />
                <Text
                  style={{
                    marginLeft: Resolution.scale(10),
                    fontSize: Resolution.scale(12),
                    color: '#C9CDD4',
                    fontFamily: 'OpenSans-Regular'
                  }}
                >
                  {'(' + startDate + ' - ' + endDate + ')'}
                </Text>
              </View>
            </View>
          </View>
        </Button>
      </ItemHorizontal>
    );
  }

  converDateToTime(data) {
    let d = new Date(data);
    let minutes = d.getMinutes() < 10 ? d.getMinutes() + '0' : d.getMinutes();
    let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    return `${hours + ':' + minutes}`;
  }

  converDate(data) {
    let d = new Date(data);
    let date = d.getDate();
    let month = d.getMonth();
    return `${date + '/' + month}`;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FD'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    width: width - 40,
    marginHorizontal: Resolution.scale(20)
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
