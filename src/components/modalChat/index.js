import React, { Component } from 'react';
import {
  View, VirtualizedList, TouchableOpacity,
  Image, Text, KeyboardAvoidingView, Platform, TextInput, Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Config from '../../utils/configs';
import IC_CHATEMTY from '@resources/icons/chat_emty.png';
import IC_CLOSE from '@resources/icons/close-black.png';
import IC_SEND from '@resources/icons/send-mess.png';
import ItemComment from '../itemComment';
const { width, height } = Dimensions.get('window');

export default class ModalChat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, listComment, editableTextInput,
      disabledBtn, opacityBtnSend, isVisible,
      colors, refTextInout, idUser } = this.props;
    return (
      <Modal style={{ flex: 1, margin: 0, paddingTop: 50, height: height, width: width }} isVisible={isVisible}>
        <View style={{ flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
          <View
            style={{
              width: width,
              height: 50,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              flexDirection: 'row',
              backgroundColor: '#FFF',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: 0, left: 0, padding: 20 }}
              onPress={() => this.props.onClose()}>
              <Image source={IC_CLOSE} />
            </TouchableOpacity>
            <Text>{'# ' + title}</Text>
          </View>
          <VirtualizedList
            ref={ref => (this.flatList = ref)}
            ListEmptyComponent={() => {
              return (
                <View style={{ flex: 1, alignItems: 'center', marginTop: 100, }}>
                  <Image source={IC_CHATEMTY} />
                  <Text
                    style={{ textAlign: 'center', color: '#BABFC8', marginTop: 10, }}
                  >{`Chưa có tin nào, nhắn thông tin \n cần trao đổi cho chúng tôi`}</Text>
                </View>
              );
            }}
            data={listComment}
            extraData={this.state}
            getItemCount={items => items.length || 0}
            onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
            keyExtractor={item => item.id || item.commentBoxId}
            getItem={
              (items, index) => ({ ...items[index], nextMessage: index - 1 < 0 ? {} : items[index - 1] }) //eslint-disable-line
            }
            renderItem={({ item, index }) => (
              <ItemComment {...this.props} index={index} item={item} idUser={idUser} />
            )}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={0.9}
            windowSize={9}
            style={{ flex: 1 }}
          />
          <LinearGradient
            colors={colors ? colors : ['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              {
                width: width - 40,
                marginHorizontal: 20,
                marginBottom: 20,
                height: 50,
                borderRadius: 10
              },
            ]}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
              <TextInput
                ref={refTextInout}
                editable={editableTextInput}
                returnKeyType={'send'}
                style={{ flex: 1, color: '#FFF' }}
                onSubmitEditing={() => this.props.addComment()}
                onChangeText={e => this.props.onChangeText(e)}
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                placeholder={'Nhập tin nhắn ...'}
              />
              <TouchableOpacity disabled={disabledBtn} onPress={() => this.props.addComment()}>
                <Image
                  style={{ opacity: opacityBtnSend }}
                  source={IC_SEND}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          {
            Platform.OS === 'ios' ?
              <KeyboardAvoidingView
                enabled
                behavior="padding"
                keyboardVerticalOffset={50}
              />
              : null
          }
        </View>
      </Modal>
    );
  }
}
