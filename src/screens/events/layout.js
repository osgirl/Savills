import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Image, FlatList, StatusBar, TouchableOpacity } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from '@components/headerTitle';

import Button from '@components/button';
import FastImage from '../../components/fastImage';
import { Calendar } from '../../components/calendars';

const { width, height } = Dimensions.get('window');

import IC_CALENDAR from '../../resources/icons/calendar.png';
import IC_CLOCK from '../../resources/icons/clock.png';
import IMG_CALENDAR_PH from '../../resources/icons/calendar-placehoder.png';
import IC_DROPDOWN from '../../resources/icons/dropDown.png';
import IC_EVENTEMTY from '../../resources/icons/Events_emty.png';
import { ItemHorizontal } from '../../components/placeHolder';
import Utils from '../../utils';

import Header from '@components/header';
import IC_BACK from '@resources/icons/back-light.png';

import Modal from 'react-native-modal';
import Resolution from '../../utils/resolution';

import ModalDetail from './components/modalDetail';
import ModalFull from './components/modalFull';
import ModalSelectUnit from '../../components/modalSelectUnit';

import CalendarStrip from '@components/calendarAgenda';
import Language from '../../utils/language';

import moment from 'moment';
import XDate from 'xdate';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    XDate.locales['fr'] = {
      monthNames: Language.listLanguage[this.props.app.languegeLocal].data.EVENTS_TXT_MONTH,
      dayNamesShort: Language.listLanguage[this.props.app.languegeLocal].data.EVENTS_TXT_WEEK
      // monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
      // dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    };

    XDate.defaultLocale = 'fr';
  }

  async _onPressDay(data) {
    if (this.state.openFullCalendar) {
      this.setState({ dateSelected: data });
    } else {
      let date = moment(data).format('YYYY-MM-DD');
      this.setState({ dateSelected: date });
    }
    this._openModalFull();
  }

  handleScroll = event => {
    let LG = Language.listLanguage[this.props.app.languegeLocal].data;
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {
          if (event.nativeEvent.contentOffset.y > 50) {
            if (!this.showCenter) {
              this.showCenter = true;
              this.props.navigation.setParams({ eventTitle: LG.EVENTS_TXT_TITLE });
            }
          } else {
            if (this.showCenter) {
              this.showCenter = false;
              this.props.navigation.setParams({ eventTitle: null });
            }
          }
        }
      },
      { useNativeDriver: true }
    )(event);
  };

  renderHeader() {
    let LG = Language.listLanguage[this.props.app.languegeLocal].data;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 20, 40],
      outputRange: [40, 20, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    return (
      <View style={{}}>
        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Animated.View style={{ height: headerHeight }}>
            <HeaderTitle title={LG.EVENTS_TXT_TITLE} />
          </Animated.View>
          {this.state.openFullCalendar ? (
            <View>
              <Calendar
                style={styles.calendar}
                firstDay={1}
                markedDates={this.state.overViewDate || {}}
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
                    width: 50,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    alignSelf: 'center',
                    marginBottom: 10
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <CalendarStrip
                selectedDate={this.state.selectedDate}
                onPressDate={date => {
                  this._onPressDay(date);
                }}
                onPressGoToday={today => {}}
                onSwipeDown={() => {}}
                markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01']}
              />
              <TouchableOpacity onPress={() => this.setState({ openFullCalendar: true })}>
                <View
                  style={{
                    width: 50,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    alignSelf: 'center',
                    marginBottom: 10
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }

  renderEmty() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: Resolution.scale(60) }}>
        <Image source={IC_EVENTEMTY} />
        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>
          {'Không có sự kiện nào \n bạn quay lại lần sau nhé'}
        </Text>
      </View>
    );
  }

  render() {
    let unitActive = this.props.units.unitActive;
    let LG = Language.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={this.props.navigation.getParam('eventTitle') ? true : false}
          center={
            <View>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{this.props.navigation.getParam('eventTitle')}</Text>
            </View>
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
        {this.renderHeader()}
        {this.props.events.myEvents.result && this.props.events.myEvents.result.totalCount <= 0 ? (
          this.renderEmty()
        ) : (
          <FlatList
            alwaysBounceVertical={false}
            data={this.state.myEvent.length > 0 ? this.state.myEvent : Utils.dataPlaceholderEvents}
            keyExtractor={item => item.eventId + ''}
            renderItem={({ item, index }) => this.renderItem(item, index, this.state.myEvent.length > 0 ? true : false)}
            onScroll={this.handleScroll}
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
                  {LG.EVENTS_TXT_ALLTITLE}
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
          <ModalDetail
            onClose={() => this._closeModalDetail()}
            id={this.state.eventId}
          />
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
    let startTime = this.converDateToTime(item.startTime);
    let image = `${item.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
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
                  {'(' + this.converDate(item.startTime) + ' - ' + this.converDate(item.endTime) + ')'}
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
