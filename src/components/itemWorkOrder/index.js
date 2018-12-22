import React, { Component } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import moment from 'moment';
import Button from '@components/button';
const { width } = Dimensions.get('window');
import configs from '@utils/configs';
import Resolution from '@utils/resolution';
const IMAGE = {
  dropDown: require('@resources/icons/dropDown.png'),
  bt_addNew: require('@resources/icons/plush-addnew.png'),
  clock: require('@resources/icons/clock.png'),
  calendar: require('@resources/icons/calendar.png')
};

export class ItemWorkOrder extends Component {
  render() {
    const { item, index, action } = this.props;
    let date = moment(item.dateCreate).format('l');
    let time = moment(item.dateCreate).format('LT');
    let encToken = this.props.account.encToken;
    return (
      <Button
        onPress={() => action()}
        key={item.id}
        style={{
          width: width - 40,
          height: 160,
          borderRadius: 10,
          marginTop: index === 0 ? 20 : 10,
          backgroundColor: '#FFF',
          padding: 20
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
        <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={{ borderRadius: 5, backgroundColor: '#505E75', width: 70 }}>
              <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold', marginVertical: 5, marginHorizontal: 15 }}>
                #{item.id}
              </Text>
            </View>
            <Text style={{ color: '#505E75', fontWeight: 'bold', fontSize: 13, marginTop: 12 }}>{item.fullUnitCode}</Text>
          </View>
          {item.fileUrls && item.fileUrls.length > 0 ? (
            <Image
              style={{ width: 40, height: 40, borderRadius: 5 }}
              source={{ uri: `${item.fileUrls[0].fileUrl}&encToken=${encodeURIComponent(encToken)}` }}
            />
          ) : null}
        </View>

        <View style={{ flex: 1, marginVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: 10, width: 15, height: 15 }} source={IMAGE.clock} />
            <Text style={{ color: '#C9CDD4', fontSize: 10 }}>{time}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: 10, width: 15, height: 15 }} source={IMAGE.calendar} />
            <Text style={{ color: '#C9CDD4', fontSize: 10 }}>{date}</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: item.currentStatus.colorCode
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 10, paddingVertical: 5, fontWeight: 'bold', paddingHorizontal: 15 }}>
              {item.currentStatus.codeName}
            </Text>
          </View>
        </View>
        {this.renderViewComment(item)}
      </Button>
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

export default ItemWorkOrder;
