import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import moment from 'moment';
const { width } = Dimensions.get('window');
import Connect from '@stores';

class TabComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: []
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.booking.listComplete && nextProps.booking.listComplete.success) {
      this.setState({ listData: nextProps.booking.listComplete.result.items });
    }
  };

  componentDidMount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.props.actions.booking.getListBooking(accessTokenApi, 'HISTORY');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD', paddingTop: 20, paddingHorizontal: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.reservationId.toString()}
          data={this.state.listData}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          ListEmptyComponent={() => {
            return (
              <View style={{ marginTop: 50 }}>
                <Text>Load Data !!</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }

  clickDetail = item => {
    this.props.navigation.navigate('ModalDetailBooking', { id: item.reservationId });
  };

  renderItem = (item, index) => {
    let date = moment(item.createdAt).format('l');
    let time = moment(item.createdAt).format('LT');
    return (
      <TouchableOpacity
        onPress={() => this.clickDetail(item)}
        key={index}
        style={{
          width: width - 40,
          height: 170,
          borderRadius: 10,
          marginVertical: 10,
          backgroundColor: '#FFF',
          padding: 20
        }}
      >
        <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={{ borderRadius: 5, backgroundColor: '#505E75', width: 70 }}>
              <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold', marginVertical: 5, marginHorizontal: 15 }}>
                #{item.reservationId}
              </Text>
            </View>
            <Text style={{ color: '#505E75', fontWeight: 'bold', fontSize: 13, marginTop: 12 }}>{item.fullUnitId}</Text>
          </View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 5 }}
            source={{ uri: 'http://imgt.taimienphi.vn/cf/Images/tt/2018/4/24/hinh-anh-che-13.jpg' }}
          />
        </View>

        <View
          style={{ flex: 1, marginVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: 10, width: 15, height: 15 }} source={require('../../../resources/icons/clock.png')} />
            <Text style={{ color: '#C9CDD4' }}>{time}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: 10, width: 15, height: 15 }} source={require('../../../resources/icons/calendar.png')} />
            <Text style={{ color: '#C9CDD4' }}>{date}</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: item.status.colorCode
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 10, paddingVertical: 5, fontWeight: 'bold', paddingHorizontal: 15 }}>
              {item.status.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(74,137,232,0.5)',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10
          }}
        >
          <Text style={{ flex: 1, color: '#FFF', fontSize: 12, fontWeight: 'bold' }} numberOfLines={1}>
            Tôi cần một dịch vụ quản lý thật tốt ...
          </Text>
          <View
            style={{
              width: 15,
              height: 15,
              backgroundColor: 'red',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#FFF', fontSize: 9 }}>1</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

export default Connect(TabComplete);
