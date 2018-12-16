import React, { Component } from 'react';
import { Animated, View, StatusBar } from 'react-native';
import Connect from '@stores';
import Header from '@components/header';
import IC_BACK from '@resources/icons/back-light.png';

import LinearGradient from 'react-native-linear-gradient';
import { Calendar } from '../../components/calendars';
import Layout from './layout';

class Events extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      selectedDate: new Date(),
      dateSelected: '',
      overViewDate: {},
      items: {},
      myEvent: [],
      isShowModalDetail: false,
      isShowModalFull: false,
      eventId: null,
      isModalSelectUnit: false,
      openFullCalendar: false
    };
  }

  componentDidMount() {
    this._getEvent();
    let ida = this.props.navigation.getParam('params', false);
    if (ida.itemtype) {
      setTimeout(() => {
        this._openModalDetail(ida.itemtype);
      }, 300)
    }
  }

  _getEvent() {
    const accessTokenApi = this.props.account.accessTokenAPI;
    const buildingID = this.props.units.unitActive.buildingId;
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), 0, 1);
    let lastDay = new Date(date.getFullYear(), 12, 31);
    this.props.actions.events.getMyEvents(accessTokenApi, buildingID, this.timeToString(firstDay), this.timeToString(lastDay));
    this.props.actions.events.getOverviewMyEvents(accessTokenApi, this.timeToString(firstDay), this.timeToString(lastDay));
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.events.myEvents !== nextProps.events.myEvents && nextProps.events.myEvents.success) {
      this.setState({ myEvent: nextProps.events.myEvents.result.items });
    }
    if (this.props.events.overView !== nextProps.events.overView && nextProps.events.overView.success) {
      let tempOverView = await nextProps.events.overView.result;
      let objectOverview = this.mapObjectSelected(tempOverView);
      this.setState({ overViewDate: objectOverview });
    }
  }

  async _openModalDetail(id) {
    await this.setState({ eventId: id });
    await this.setState({ isShowModalDetail: true });
  }
  _closeModalDetail() {
    this.setState({ isShowModalDetail: false });
  }

  _openModalFull() {
    this.setState({ isShowModalFull: true });
  }
  _closeModalFull() {
    this.setState({ isShowModalFull: false });
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  mapObjectSelected(arrDate) {
    let markedDateMap = {};
    let tempEvents = [];
    let currDate = this.timeToString(new Date());
    console.log(currDate);
    arrDate.map(item => {
      if (item.isEvent) {
        tempEvents.push(item);
      }
    });
    tempEvents.map(item => {
      let date = this.timeToString(item.eventDate);
      if (date === currDate) {
        markedDateMap[date] = {
          selected: true,
          marked: true,
          dotColor: 'red'
        };
      } else {
        markedDateMap[date] = {
          marked: true,
          dotColor: '#FFF',
          isEvent: true
        };
      }
    });
    return markedDateMap;
  }

  _onpenModalSelectUnit() {
    this.setState({ isModalSelectUnit: true });
  }

  _onCloseModalSelectUnit() {
    this.setState({ isModalSelectUnit: false });
    this._getEvent();
  }
}

export default Connect(Events);
