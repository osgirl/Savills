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
  VirtualizedList,
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

import ModalChat from "@components/modalChat";

import IC_CHATEMTY from '@resources/icons/chat_emty.png';
import IC_CLOSE from '@resources/icons/close.png';
import Configs from '../../../utils/configs';

const { width, height } = Dimensions.get('window');

import AnimatedTitle from '@components/animatedTitle';

import Language from '../../../utils/language';

const HEADER_MAX_HEIGHT = 60;

class ModalDetailFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      isShowTitleHeader: false,
      showModalConfirmCancel: false,
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
      data: null,
      loadingUpdateStatus: false
    };

    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  _getDetail() {
    const { commentBoxId } = this.props;
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = Language.listLanguage[this.props.app.languegeLocal].id;
    setTimeout(() => {
      this.props.actions.feedback.getDetail(accessTokenApi, languege, commentBoxId);
    }, 300);
  }

  componentDidMount() {
    this._getDetail();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
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
    let languege = Language.listLanguage[this.props.app.languegeLocal].id;

    if (
      this.props.feedback.detailFeedback &&
      this.props.feedback.detailFeedback.result !== nextProps.feedback.detailFeedback.result &&
      nextProps.feedback.detailFeedback.success
    ) {
      this.setState({ data: nextProps.feedback.detailFeedback.result });
      this.props.actions.feedback.getCommentUnread(accessTokenApi, nextProps.feedback.detailFeedback.result.commentBoxId, 6);
      this.props.actions.feedback.getCommentUser(accessTokenApi, nextProps.feedback.detailFeedback.result.guid);
    }

    if (this.props.feedback.listComment !== nextProps.feedback.listComment && nextProps.feedback.listComment.success) {
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

    if (this.props.feedback.updateStatus !== nextProps.feedback.updateStatus && nextProps.feedback.updateStatus.success) {
      this._getDetail();
      this.setState({ loadingUpdateStatus: false, showModalConfirmCancel: false });
      this.props.onRefresh();
      this.getModuleCount();
    }
  }

  getModuleCount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let unitID = this.props.units.unitActive.unitId;
    this.props.actions.notification.getListCountModule(accessTokenApi, unitID);
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

  async _updateStatus() {
    let languege = Language.listLanguage[this.props.app.languegeLocal].id;
    if (this.state.loadingUpdateStatus) {
      return;
    }
    this.setState({ loadingUpdateStatus: true });
    let accessTokenAPI = this.props.account.accessTokenAPI;
    const { data } = this.state;
    this.props.actions.feedback.updateStatus(accessTokenAPI, data.commentBoxId, 'DELETED', languege);
  }

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
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'small'} color={Configs.colorMain} />
      </View>
    );
  }

  renderHeader() {
    const { commentBoxId } = this.props;

    return (
      <View>
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

        <AnimatedTitle scrollY={this.state.scrollY} label={'# ' + commentBoxId} />
      </View>
    );
  }

  renderModalCancel = () => {
    return (
      <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.showModalConfirmCancel}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: width - 40,
              height: 120,
              borderRadius: 10,
              backgroundColor: '#FFF',
              marginHorizontal: 20,
              alignItems: 'center',
              padding: 20
            }}
          >
            <Text style={{ marginBottom: 20, color: '#BABFC8', fontFamily: 'Opensans-SemiBold', fontSize: 14 }}>
              Bạn muốn hủy feedback này
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => this.setState({ showModalConfirmCancel: false })}
                style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 12, color: '#404040', fontFamily: 'Opensans-SemiBold' }}>Quay Lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this._updateStatus()}
                style={{
                  flex: 1,
                  marginLeft: 20
                }}
              >
                <LinearGradient
                  colors={['#4A89E8', '#8FBCFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
                >
                  {this.state.loadingUpdateStatus ? (
                    <ActivityIndicator size={'small'} color={'#FFF'} />
                  ) : (
                      <Text style={{ fontSize: 12, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>Đồng ý</Text>
                    )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  changeStatusBar = () => {
    if (this.state.showModalConfirmCancel) StatusBar.setHidden(true);
    else {
      StatusBar.setHidden(false);
    }
  };

  renderFooter() {
    let LG = Language.listLanguage[this.props.app.languegeLocal].data;
    let status = (this.state.data && this.state.data.commentBoxStatus.id) || 0;
    if (status === 1) {
      return (
        <View
          style={{
            width: width,
            height: 80,
            backgroundColor: '#FFF',
            padding: 20,
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#343D4D',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 20
            }}
            onPress={() => this.setState({ showModalConfirmCancel: true })}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{LG.FB_DT_BTNCANCLE}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  render() {
    const { data } = this.state;
    let LG = Language.listLanguage[this.props.app.languegeLocal].data;
    let date = moment(data && data.createdAt).format('l');
    let time = moment(data && data.createdAt).format('LT');

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        <StatusBar hidden={Platform.OS === 'ios' ? false : true} />
        {this.renderHeader()}
        {this.changeStatusBar()}
        {this.state.data ? (
          <ScrollView
            alwaysBounceVertical={false}
            scrollEventThrottle={16}
            onScroll={this.handleScroll}
            contentContainerStyle={{
              paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0
            }}
            contentInset={{
              top: HEADER_MAX_HEIGHT
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT
            }}
          >
            {
              <ItemScorll
                title={LG.FB_DT_DESCRIPTION}
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
                      <Text
                        style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}
                      >
                        {LG.FB_DT_TYPE}
                      </Text>
                      <Text style={{ color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        {data.commentBoxType.name}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}
                      >
                        {LG.FB_DT_PROBLEM}
                      </Text>
                      <Text style={{ color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        {data.commentBoxCategory.name}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}
                      >
                        {LG.FB_DT_STATUS}
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
                      <Text
                        style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}
                      >
                        {LG.FB_DT_DAY}
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
                            style={{
                              marginRight: Resolution.scale(10),
                              width: Resolution.scale(15),
                              height: Resolution.scale(15)
                            }}
                            source={require('../../../resources/icons/clock.png')}
                          />
                          <Text style={{ color: '#C9CDD4', fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Regular' }}>
                            {time}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            style={{
                              marginRight: Resolution.scale(10),
                              width: Resolution.scale(15),
                              height: Resolution.scale(15)
                            }}
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
              title={LG.FB_DT_depict}
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
          </ScrollView>
        ) : (
            this.renderLoading()
          )}

        {this.renderFooter()}
        {this.renderModalCancel()}

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

        {this.state.data ? this.renderContentModalChat() : null}
      </View>
    );
  }

  renderContentModalChat() {
    let id = this.props.userProfile.profile.result.user.id;
    return (
      <ModalChat
        isVisible={this.state.isShowChat}
        title={this.state.data && this.state.data.commentBoxId}
        idUser={id}
        listComment={this.state.listComment}
        editableTextInput={this.state.data && this.state.data.statusCode !== 'SUBMITTED' ? true : false}
        disabledBtn={this.state.comment.trim().length > 0 ? false : true}
        addComment={() => this.addComment()}
        onChangeText={(text) => this.setState({ comment: text })}
        opacityBtnSend={this.state.comment.trim() == '' ? 0.5 : 1}
        onClose={() => this.setState({ isShowChat: false })}
        refTextInout={
          input => {
            this.textInput = input;
          }
        }
      />
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
  }
});

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
