import React, { Component } from 'react';

import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  // Modal,
  Animated,
  Platform,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Header from '@components/header';
import moment from 'moment';
import ItemComment from '@components/itemComment';
import HeaderTitle from '@components/headerTitle';
import Resolution from '../../../utils/resolution';
import Button from '@components/button';
import Connect from '@stores';
import { isIphoneX } from 'react-native-iphone-x-helper';
import AnimatedHeader from '@components/animatedHeader';

import IC_CHATEMTY from "@resources/icons/chat_emty.png";
import IC_CLOSE from '@resources/icons/close.png';
import Configs from '../../../utils/configs';

const { width, height } = Dimensions.get('window');

import AnimatedTitle from "@components/animatedTitle";

const HEADER_MAX_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ModalDetailFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      isShowTitleHeader: false,
      listTypeFeedback: this.props.feedback.typeFeedback.result,
      projectTypes: [{ name: 'HO', value: 'HO' }, { name: 'Project', value: 'PROJECT' }],
      listCategory: this.props.feedback.listCategory.result || [],
      isShowCategory: false,
      type: '',
      typeProject: '',
      categorySelectedId: null,
      isShowModalConfirm: false,
      isShowChat: false,
      listComment: [],
      data: null
    };

    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);

  }

  componentWillMount() {
    const { commentBoxId } = this.props;
    let accessTokenApi = this.props.account.accessTokenAPI;
    setTimeout(() => {
      this.props.actions.feedback.getDetail(accessTokenApi, commentBoxId);
    }, 300);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    // const { itemSelected } = this.props;
    // let accessTokenApi = this.props.account.accessTokenAPI;
    // setTimeout(() => {
    //   this.props.actions.feedback.getCommentUnread(accessTokenApi, commentBoxId, 6);
    //   this.props.actions.feedback.getCommentUser(accessTokenApi, itemSelected.guid);
    // }, 200);
  }

  _keyboardDidShow() {
    this.setState({ marginBottom: 250 });
  }

  _keyboardDidHide() {
    this.setState({ marginBottom: 0 });
  }

  componentWillReceiveProps(nextProps) {
    const { itemSelected } = this.props;
    let accessTokenApi = this.props.account.accessTokenAPI;

    if (this.props.feedback.detailFeedback &&
      this.props.feedback.detailFeedback.result !== nextProps.feedback.detailFeedback.result &&
      nextProps.feedback.detailFeedback.success) {
      this.setState({ data: nextProps.feedback.detailFeedback.result });
      this.props.actions.feedback.getCommentUnread(accessTokenApi, nextProps.feedback.detailFeedback.result.commentBoxId, 6);
      this.props.actions.feedback.getCommentUser(accessTokenApi, nextProps.feedback.detailFeedback.result.guid);
    }

    if (this.props.feedback.listComment !== nextProps.feedback.listComment &&
      nextProps.feedback.listComment.success) {
      this.setState({ listComment: nextProps.feedback.listComment.result.items });
    }

    if (
      nextProps.feedback.addComment &&
      nextProps.feedback.addComment.success &&
      this.props.feedback.addComment != nextProps.feedback.addComment
    ) {
      this.textInput.clear();
      this.props.actions.feedback.getCommentUser(accessTokenApi, nextProps.feedback.detailFeedback.result.guid);
    }
  }

  handleScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
      listener: event => {
        if (event.nativeEvent.contentOffset.y > 10) {
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

  addComment = () => {
    if (this.state.comment.trim() === '' || this.state.data === null) {
      return;
    } else {
      let accessTokenAPI = this.props.account.accessTokenAPI;
      const { displayName, profilePictureId } = this.props.userProfile.profile.result.user;
      let comment = {
        conversationId: this.state.data.guid,
        content: this.state.comment,
        typeId: null,
        isPrivate: false,
        userName: displayName,
        profilePictureId: profilePictureId,
        moduleId: 6
      };
      this.props.actions.feedback.addCommentUser(accessTokenAPI, comment);
    }
  };

  _changeTypeFeedback(type) {
    this.setState({ type: type });
  }

  _changeProjectType(type) {
    this.setState({ typeProject: type });
  }

  _selectCategory(id) {
    this.setState({ categorySelectedId: id });
    if (this.state.isShowCategory) {
      this.setState({ isShowCategory: false });
    }
  }

  renderLoading() {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={"small"} color={Configs.colorMain} />
    </View>
  }


  renderHeader() {
    const { commentBoxId } = this.props;

    return <View>
      <Header
        isModal
        LinearGradient={true}
        leftIcon={IC_CLOSE}
        leftAction={() => this.props.onClose()}
        headercolor={'transparent'}
        showTitleHeader={this.state.isShowTitleHead}
        center={
          <View>
            <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'# ' + commentBoxId}</Text>
          </View>
        }
      />

      <AnimatedTitle
        scrollY={this.state.scrollY}
        label={'# ' + commentBoxId}
      />
    </View>
  }

  render() {
    const { data } = this.state;

    let date = moment(data && data.createdAt).format('l');
    let time = moment(data && data.createdAt).format('LT');

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        <StatusBar
          hidden={Platform.OS === 'ios' ? false : true}
        />
        {this.renderHeader()}
        {
          this.state.data ? <ScrollView
            alwaysBounceVertical={false}
            scrollEventThrottle={16}
            onScroll={this.handleScroll}
            contentContainerStyle={{
              paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
            }}
            contentInset={{
              top: HEADER_MAX_HEIGHT,
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT,
            }}
          >
            {
              <ItemScorll
                title={'Thông Tin'}
                view={
                  <View
                    style={{
                      height: Resolution.scaleHeight(200),
                      width: null,
                      flex: 1,
                      borderRadius: 10,
                      backgroundColor: '#FFF',
                      padding: Resolution.scale(20),
                      justifyContent: 'space-around'
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        Loại phản hồi
                      </Text>
                      <Text style={{ color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        {data.commentBoxType.name}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        Vấn đề
                      </Text>
                      <Text style={{ color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        {data.commentBoxCategory.name}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        Trạng Thái
                      </Text>
                      <View
                        style={{
                          borderRadius: 5,
                          backgroundColor: data.commentBoxStatus.colorCode
                        }}
                      >
                        <Text
                          style={{
                            color: '#FFF',
                            fontSize: Resolution.scale(10),
                            paddingVertical: Resolution.scale(5),
                            fontFamily: 'OpenSans-SemiBold',
                            paddingHorizontal: Resolution.scale(15)
                          }}
                        >
                          {data.commentBoxStatus.name}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        Ngày Gửi
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: Resolution.scale(10) }}>
                          <Image
                            style={{ marginRight: Resolution.scale(10), width: Resolution.scale(15), height: Resolution.scale(15) }}
                            source={require('../../../resources/icons/clock.png')}
                          />
                          <Text style={{ color: '#C9CDD4', fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Regular' }}>
                            {time}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            style={{ marginRight: Resolution.scale(10), width: Resolution.scale(15), height: Resolution.scale(15) }}
                            source={require('../../../resources/icons/calendar.png')}
                          />
                          <Text style={{ color: '#C9CDD4', fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Regular' }}>
                            {date}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                }
              />
            }
            <ItemScorll
              title={'Miêu Tả'}
              view={
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#FFF',
                    borderRadius: 5,
                    width: null,
                    padding: 10,
                    minHeight: 100
                    // marginBottom: rating > 0 && description != '' ? 0 : 200
                  }}
                >
                  <Text style={{ fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Regular' }}>{data.description}</Text>
                </View>
              }
            />
          </ScrollView> : this.renderLoading()
        }



        <Button
          style={{
            position: 'absolute',
            // bottom: this.state.detailOrder.currentStatus && this.state.detailOrder.currentStatus.id !== 11 ? 20 : 100,
            bottom: 50,
            right: 20
          }}
          onPress={() => this.setState({ isShowChat: true })}
        >
          <Image source={require('../../../resources/icons/chat-big.png')} />
          {this.props.feedback.commentUnread.result && this.props.feedback.commentUnread.result[0].unreadCount > 0 && (
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: 'red',
                borderRadius: 8,
                position: 'absolute',
                top: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 8 }}>
                {this.props.feedback.commentUnread.result[0].unreadCount}
              </Text>
            </View>
          )}
        </Button>

        {
          this.state.data ?
            this.renderContentModalChat() : null
        }
      </View>
    );
  }

  renderContentModalChat() {
    let focusChat = {};
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 50 }} isVisible={this.state.isShowChat}>
        <View
          style={{
            width: width,
            height: 50,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: 'row',
            backgroundColor: '#FFF',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20
          }}
        >
          <TouchableOpacity onPress={() => this.setState({ isShowChat: false })}>
            <Image source={require('../../../resources/icons/close-black.png')} />
          </TouchableOpacity>
          <Text>{'# ' + this.state.data && this.state.data.commentBoxId}</Text>
          <View />
        </View>
        <Animated.View style={{ flex: 1, backgroundColor: '#F6F8FD', paddingBottom: this.state.marginBottom }}>
          <FlatList
            data={this.state.listComment}
            style={{ flex: 1 }}
            keyExtractor={(item, index) => item.commentBoxId}
            renderItem={({ item, index }) => <ItemComment {...this.props} index={index} item={item} idUser={item.creatorUserId} />}
            ref={ref => (this.flatList = ref)}
            onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
            ListEmptyComponent={() => {
              return (
                <View style={{ flex: 1, alignItems: 'center', marginTop: 100, height: isIphoneX() ? 500 : height - 150 }}>
                  <Image source={IC_CHATEMTY} />
                  <Text
                    style={{ textAlign: 'center', color: '#BABFC8', marginTop: 10 }}
                  >{`Chưa có tin nào, nhắn thông tin \n cần trao đổi cho chúng tôi`}</Text>
                </View>
              );
            }}
            ListFooterComponent={() => <View style={{ marginBottom: 80 }} />}
          />
        </Animated.View>
        <KeyboardAvoidingView behavior="position" enabled>
          <LinearGradient
            colors={['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              {
                width: width - 40,
                position: 'absolute',
                bottom: 20,
                left: 20,
                height: 50,
                borderRadius: 10
              },
              focusChat
            ]}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
              <TextInput
                ref={input => {
                  this.textInput = input;
                }}
                editable={this.state.data && this.state.data.statusCode !== 'SUBMITTED' ? true : false}
                returnKeyType={'send'}
                style={{ flex: 1, color: '#FFF' }}
                onSubmitEditing={() => this.addComment()}
                onChangeText={e => this.setState({ comment: e })}
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                placeholder={'Nhập tin nhắn ...'}
              />
              <TouchableOpacity disabled={this.state.comment.trim() == '' ? true : false} onPress={() => this.addComment()}>
                <Image
                  style={{ opacity: this.state.comment.trim() == '' ? 0.5 : 1 }}
                  source={require('../../../resources/icons/send-mess.png')}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const style = StyleSheet.create({
  headerTitle: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    zIndex: -1
  },
})

class ItemScorll extends Component {
  render() {
    const { title, view } = this.props;
    return (
      <View style={{ marginHorizontal: Resolution.scale(20) }}>
        <Text
          style={{
            marginTop: Resolution.scale(20),
            marginBottom: Resolution.scale(10),
            color: '#505E75',
            fontSize: Resolution.scale(14),
            fontFamily: 'OpenSans-Bold'
          }}
        >
          {title}
        </Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalDetailFeedback);
