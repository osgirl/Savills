import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import moment from 'moment';
const { width } = Dimensions.get('window');

class ItemComment extends Component {
  render() {
    const { content, creationTime } = this.props.item;
    let times = moment(creationTime).fromNow();
    return (
      <View style={styles.contain}>
        <Image
          style={styles.imageAvatar}
          resizeMode={'cover'}
          source={{ uri: 'http://thuthuatphanmem.vn/uploads/2018/06/18/anh-avatar-dep-65_034122567.jpg' }}
        />
        <View style={styles.viewChat}>
          <Text style={styles.textContent}>{content}</Text>
          <Text style={styles.textTime}>{times}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    width: width - 40,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row'
  },
  imageAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginVertical: 20
  },
  viewChat: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
    marginLeft: 20
  },
  textContent: {
    color: '#515E6D',
    fontSize: 14,
    fontWeight: '600'
  },
  textTime: {
    marginTop: 5,
    color: 'rgba(69,79,102,0.5)',
    fontSize: 12
  }
});
export default ItemComment;
