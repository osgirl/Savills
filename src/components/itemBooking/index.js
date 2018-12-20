import React, { Component } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import moment from 'moment';
import Buttom from '@components/button';
const { width } = Dimensions.get('window');
import configs from '@utils/configs';
import Resolution from '@utils/resolution';

export class ItemBooking extends Component {
  render() {
    const { item, index, action, disableAction } = this.props;
    let date = moment(item.startDate).format('DD/MM');
    let date2 = moment(item.endDate).format('DD/MM');
    let time = moment(item.startDate).format('HH:mm');
    let time2 = moment(item.endDate).format('HH:mm');
    return (
      <Buttom
        onPress={() => action()}
        key={index}
        style={{
          width: width - Resolution.scale(40),
          height: Resolution.scale(170),
          borderRadius: 10,
          marginTop: index === 0 ? Resolution.scale(20) : Resolution.scale(10),
          backgroundColor: '#FFF',
          padding: Resolution.scale(20)
        }}
      >
        {item.unreadCommentCount > 0 ? (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: 'red',
              position: 'absolute',
              top: 10,
              right: 10,
              borderRadius: 10,
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 12, color: '#FFF', fontWeight: 'bold' }}>
              {item.unreadCommentCount > 9 ? '+9' : item.unreadCommentCount}
            </Text>
          </View>
        ) : null}
        <View
          style={{
            flex: 1.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View style={{ borderRadius: 5, backgroundColor: '#505E75', alignItems: 'center' }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: Resolution.scale(12),
                fontWeight: 'bold',
                marginVertical: Resolution.scale(5),
                marginHorizontal: Resolution.scale(15)
              }}
            >
              #{item.reservationId}
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ width: Resolution.scale(120), alignItems: 'flex-end' }}>
            <Text
              style={{ fontSize: Resolution.scale(13), color: '#343D4D', fontFamily: 'OpenSans-Bold', marginRight: 5 }}
              numberOfLines={1}
            >
              {item.amenity.amenityName}
            </Text>
          </View>
          <Image
            style={{ width: Resolution.scale(40), height: Resolution.scale(40), borderRadius: 5 }}
            source={{ uri: configs.API_BOOKING + item.amenity.iconPath }}
          />
        </View>
        <Text style={{ color: '#505E75', fontWeight: 'bold', fontSize: Resolution.scale(13), marginTop: Resolution.scale(5) }}>
          {item.fullUnitId}
        </Text>
        <View
          style={{
            flex: 1,
            marginVertical: Resolution.scale(5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: Resolution.scale(10) }} source={require('@resources/icons/clock.png')} />
            <Text style={{ color: '#C9CDD4', fontSize: 10 }}>{`${time}-${time2}`}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: Resolution.scale(10) }} source={require('@resources/icons/calendar.png')} />
            <Text style={{ color: '#C9CDD4', fontSize: 10 }}>{`(${date}-${date2})`}</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: item.status.colorCode
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 10, paddingVertical: 5, fontWeight: 'bold', paddingHorizontal: 15 }}>
              {item.status.statusCode}
            </Text>
          </View>
        </View>
        {this.renderViewComment(item)}
      </Buttom>
    );
  }

  renderViewComment = item => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#dcdee3',
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10
        }}
      >
        <Text style={{ flex: 1, color: '#FFF', fontSize: 12, fontWeight: 'bold' }} numberOfLines={1}>
          {item.remark && item.remark.trim() !== '' ? item.remark.trim() : 'No Remark'}
        </Text>
      </View>
    );
  };
}

export default ItemBooking;
