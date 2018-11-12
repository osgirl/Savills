import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Dimensions, Image,RefreshControl } from 'react-native';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
import Connect from '@stores';
import { isIphoneX } from '../../../utils/func';

class TabActive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isRefreshing: false
    };
  }

  componentDidMount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.props.actions.booking.getListBooking(accessTokenApi, 'ONGOING');
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.booking.listOnGoing && nextProps.booking.listOnGoing.success) {
      this.setState({ listData: nextProps.booking.listOnGoing.result.items, isRefreshing: false });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD', paddingHorizontal: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.reservationId.toString()}
          data={this.state.listData}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this._onRefresh()}
              title={'Refrech Data !!'}
              tintColor="#000"
              titleColor="#000"
            />
          }
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  marginTop: height / 2 - (isIphoneX() ? 100 : 150),
                  width: width - 40,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{ color: '#505E75', fontSize: 15, fontFamily: 'OpenSans-Bold', textAlign: 'center' }}
                >{`Bạn chưa dùng tiện ích nào \n chọn ngay cho mình dịch vụ tốt \n nhất ở đây nhé!`}</Text>
                <Image style={{ marginTop: 20, marginRight: 50 }} source={require('../../../resources/icons/addnew-pls.png')} />
              </View>
            );
          }}
        />
      </View>
    );
  }

  _onRefresh = () => {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this.props.actions.booking.getListBooking(accessTokenApi, 'ONGOING');
      }
    );
  };

  clickDetail = () => {
    alert('ss');
  };

  renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.actions()}
        key={index}
        style={{
          width: width - 40,
          height: 170,
          borderRadius: 10,
          marginTop: index === 0 ? 20 : 10,
          backgroundColor: '#FFF',
          padding: 20
        }}
      >
        <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={{ borderRadius: 5, backgroundColor: '#505E75' }}>
              <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold', marginVertical: 5, marginHorizontal: 15 }}>
                #7812
              </Text>
            </View>
            <Text style={{ color: '#505E75', fontWeight: 'bold', fontSize: 13, marginTop: 12 }}>12-123-1233</Text>
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
            <Text style={{ color: '#C9CDD4' }}>11/2/2012</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: 10, width: 15, height: 15 }} source={require('../../../resources/icons/calendar.png')} />
            <Text style={{ color: '#C9CDD4' }}>12/23/1231</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: 'pink'
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 10, paddingVertical: 5, fontWeight: 'bold', paddingHorizontal: 15 }}>
              Pending
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(186,191,200,0.5)',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10
          }}
        >
          <Text style={{ flex: 1, color: '#FFF', fontSize: 12, fontWeight: 'bold' }} numberOfLines={1}>
            Tôi cần một dịch vụ quản lý thật tốt ...
          </Text>
          {/* <View
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
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };
}

export default Connect(TabActive);
