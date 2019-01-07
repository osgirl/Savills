'use strict';

export default class {
  static listLanguage = [
    {
      id: 'zh-CN',
      icon: '🇭🇰',
      title: 'China',
      data: {
        NO_INTERNET: 'There are no internet detected. Could you try to turn on network and try again?'
      }
    },
    {
      id: 'en',
      icon: '🇬🇧',
      title: 'English',
      data: {
        NO_INTERNET: 'There are no internet detected. Could you try to turn on network and try again?'
      }
    },
    {
      id: 'vi',
      icon: '🇻🇳',
      title: 'Tiếng việt',
      data: {
        NO_INTERNET: 'Mạng không ổn định hoặc bạn chưa bật wifi. '
      }
    }
  ];
}
