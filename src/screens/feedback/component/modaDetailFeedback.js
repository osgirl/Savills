import React, { Component } from 'react';

import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import Connect from '@stores';
import { Header, Button, ModalChat, AnimatedTitle } from '@components';

import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import moment from 'moment';

import IC_CLOSE from '@resources/icons/close.png';

import Configs from '@utils/configs';
import Resolution from '@utils/resolution';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = Resolution.scale(60);

class ModalDetailFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      chatText: '',
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
  }

  _getDetail() {
    const { commentBoxId } = this.props;
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    setTimeout(() => {
      this.props.actions.feedback.getDetail(accessTokenApi, languege, commentBoxId);
    }, 300);
  }

  componentDidMount() {
    this._getDetail();
  }

  componentWillReceiveProps(nextProps) {
    const { itemSelected } = this.props;
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = this.props.app.listLanguage[this.props.app.languegeLocal].id;

    if (
      this.props.feedback.detailFeedback &&
      this.props.feedback.detailFeedback.result !== nextProps.feedback.detailFeedback.result &&
      nextProps.feedback.detailFeedback.success
    ) {
      this.setState({ data: nextProps.feedback.detailFeedback.result });
      this.props.actions.feedback.getCommentUnread(accessTokenApi, nextProps.feedback.detailFeedback.result.commentBoxId, 6);
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
    let languege = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    if (this.state.loadingUpdateStatus) {
      return;
    }
    this.setState({ loadingUpdateStatus: true });
    let accessTokenAPI = this.props.account.accessTokenAPI;
    const { data } = this.state;
    this.props.actions.feedback.updateStatus(accessTokenAPI, data.commentBoxId, 'DELETED', languege);
  }

  addComment = () => {
    if (this.state.chatText.trim() === '' || this.state.data === null) {
      return;
    } else {
      this.setState({ chatText: '' });
      let accessTokenAPI = this.props.account.accessTokenAPI;
      const { displayName, profilePictureId } = this.props.userProfile.profile.result.user;
      let comment = {
        conversationId: this.state.data.guid,
        content: this.state.chatText,
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

  renderModalCancel = languages => {
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
              {languages.FB_TITLE_CACEL}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => this.setState({ showModalConfirmCancel: false })}
                style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 12, color: '#404040', fontFamily: 'Opensans-SemiBold' }}>
                  {languages.FB_TITLE_CACEL_BACK}
                </Text>
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
                    <Text style={{ fontSize: 12, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>
                      {' '}
                      {languages.FB_TITLE_CACEL_AGREE}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  renderFooter(languages) {
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
              justifyContent: 'center'
            }}
            onPress={() => this.setState({ showModalConfirmCancel: true })}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{languages.FB_DT_BTNCANCLE}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  render() {
    const { data } = this.state;
    let date = moment(data && data.createdAt).format('l');
    let time = moment(data && data.createdAt).format('LT');
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.renderHeader()}
        {this.state.data ? (
          <ScrollView
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
                title={languages.FB_DT_INFO}
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
                        {languages.FB_DT_TYPE}
                      </Text>
                      <Text style={{ color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        {data.commentBoxType.name}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}
                      >
                        {languages.FB_DT_PROBLEM}
                      </Text>
                      <Text style={{ color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                        {data.commentBoxCategory.name}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{ flex: 1, color: '#505E75', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}
                      >
                        {languages.FB_DT_STATUS}
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
                        {languages.FB_DT_DAY}
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
              title={languages.FB_DT_COMMENT}
              view={
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#FFF',
                    borderRadius: 5,
                    width: null,
                    padding: Resolution.scale(10),
                    paddingLeft: Resolution.scale(20),
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

        {this.renderFooter(languages)}
        {this.renderModalCancel(languages)}

        <Button
          style={{
            position: 'absolute',
            // bottom: this.state.detailOrder.currentStatus && this.state.detailOrder.currentStatus.id !== 11 ? 20 : 100,
            bottom: 50,
            right: 20
          }}
          onPress={() =>
            this.setState({ isShowChat: true }, () => {
              let accessTokenApi = this.props.account.accessTokenAPI;
              this.props.actions.feedback.getCommentUser(accessTokenApi, this.props.feedback.detailFeedback.result.guid);
            })
          }
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

        {this.state.data ? this.renderContentModalChat(languages) : null}
      </View>
    );
  }

  renderContentModalChat(languages) {
    let id = this.props.userProfile.profile.result.user.id;
    return (
      <ModalChat
        isVisible={this.state.isShowChat}
        title={this.state.data && this.state.data.commentBoxId}
        idUser={id}
        chatEmpty={languages.FB_DETAIL_CHAT_EMPTY}
        placeholder={languages.FB_DETAIL_CHAT}
        listComment={this.state.listComment}
        editableTextInput={this.state.data && this.state.data.statusCode !== 'SUBMITTED' ? true : false}
        disabledBtn={this.state.chatText.trim() === '' ? true : false}
        addComment={() => this.addComment()}
        onChangeText={text => this.setState({ chatText: text })}
        opacityBtnSend={this.state.chatText.trim() == '' ? 0.5 : 1}
        onClose={() => this.setState({ isShowChat: false })}
        refTextInout={input => {
          this.textInput = input;
        }}
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
