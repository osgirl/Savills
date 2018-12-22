'use strict';

export default class {
  static listLanguage = [
    {
      id: 'en',
      icon: '🇲🇾',
      title: 'English',
      data: {
        // Login
        LOGIN_BTN_LANGUAGE: 'Language',
        LOGIN_TXT_PLACEHOLDER_EMAIL: 'Username or email',
        LOGIN_TXT_PLACEHOLDER_PASSWORD: 'Password',
        LOGIN_TXT_FORGOTPASSWORD: 'Forgot Password',
        LOGIN_BTN_LOGIN: 'Login',

        // Forgot
        FORGOT_TXT_CONTENT:
          'A password reset link will be sent to your password. If you dont get an email within a few minutes, plesase re-try',
        FORGOT_TXT_PLACEHOLDER: 'Email address',
        FORGOT_BTN_SEND: 'Send',

        //CHOOSE PROJECT
        PROJECT_TXT_CONTENT: 'Choose Your Project',

        //CHOOSE APARTMENT
        APARTMENT_TXT_CONTENT: 'Choose Your Apartment',

        //HOME
        HOME_TXT_EVENTS: 'Events',
        HOME_TXT_BOOKING: 'Booking',
        HOME_TXT_WORKORDER: 'Work Order',
        HOME_TXT_INBOX: 'Inbox',
        HOME_TXT_FEEDBACK: 'Feedback',
        HOME_TXT_E_LIBARY: 'Libary',
        HOME_TXT_CONTACTS: 'Contacts',
        HOME_TXT_FRONTDESK: 'Frontdesk',
        HOME_TXT_FREE: 'Fee',
        HOME_TXT_INVOICE: 'Invoice',
        HOME_TXT_FAQ: 'FAQ',

        //PROFILE
        PROFILE_TXT_CHANGEAVATAR: 'Change avatar',
        PROFILE_TXT_UNIT: 'Unit',
        PROFILE_TXT_PHONE: 'Phone number',
        PROFILE_TXT_FIRST: 'First name',
        PROFILE_TXT_LAST: 'Last name',
        PROFILE_TXT_DISPLAY: 'Display name',
        PROFILE_BTN_SETTING: 'Setting',
        PROFILE_BTN_CHANGEPASS: 'Change Password',
        PROFILE_BTN_LOGOUT: 'LOGOUT',

        //EVENTS
        EVENTS_TXT_TITLE: 'Events',
        EVENTS_TXT_ALLTITLE: 'All events',
        EVENTS_TXT_WEEK: ['Su', 'Mo', 'Tu.', 'We', 'Th', 'Fr', 'Sa'],
        EVENTS_TXT_MONTH: [
          'January / ',
          'February / ',
          'March / ',
          'April / ',
          'May / ',
          'June / ',
          'July / ',
          'August / ',
          'September / ',
          'October / ',
          'November / ',
          'December / '
        ],

        //CONTACTS
        CONTACTS_TXT_TITLE: 'Contacts',

        // FEE
        FEE_TXT_FEE: 'Fee',
        FEE_TITLE_BTN_CHECKALL: 'All',
        FEE_TITLE_BTN_HISTORY: 'History',

        FEE_DO_TITLEHEADER: 'Detail order',
        FEE_DO_SUMMARY: 'Summary en',
        FEE_DO_SERVICE_FEE: 'Service fee en',
        FEE_DO_TXT_TOTAL: 'Total',

        FEE_HT_TXTHEADER: 'History',

        FEE_RECEIPT_TITLEHEADER: 'Detail',
        FEE_RECEIPT_NO: 'Receipt No',
        FEE_RECEIPT: 'Receipt',
        FEE_RECEIPT_METHOD: 'Method',
        FEE_RECEIPT_TOTAL: 'In total',
        FEE_RECEIPT_TITLE_DETAIL: 'Details',

        // FEEDBACK

        FB_TITLEHEADER: 'Feedback',

        FB_CREATE_TITLEHEADER: 'New Feedback',
        FB_CREATE_BTNSEND: 'Send',
        FB_TYPE_FEEDBACK: 'Feedback Type',
        FB_PROBLEM_FEEDBACK: 'Feedback problem',
        FB_PROBLEM: 'Problem',

        FB_ALERT_NO_TYPE: 'Type Feedback is require',
        FB_ALERT_NO_FEEDBACK: 'Feedback is require',
        FB_ALERT_NO_PROBLEM: 'Comment is require',

        FB_DT_DESCRIPTION: 'Description',
        FB_DT_TYPE: 'Type',
        FB_DT_PROBLEM: 'Problem',
        FB_DT_STATUS: 'Status',
        FB_DT_DAY: 'Date create',
        FB_DT_depict: 'comment',
        FB_DT_BTNCANCLE: 'Cancle',

        //INBOX

        IB_TITLEHEADER: 'INBOX',
        IB_TITLE_TAB_NEW: 'New',
        IB_TITLE_TAB_SEND: 'Send',
        IB_TITLE_TAB_STORE: 'Storage',

        IB_DT_TITLEHEADER: 'Detail',
        IB_DT_DESCRIPT: 'Description',
        IB_DT_IMAGE: 'Image',

        IB_CR_TITLEHEADER: 'New Inbox',
        IB_CR_TITLE: 'Title',
        IB_CR_DESCRIPT: 'Description',
        IB_CR_TITLE_BTN: 'Send',
        IB_CR_ENTER_TITLE: 'Enter Title',
        IB_CR_ENTER_DESCRIPT: 'Enter Description',

        //LIBARY
        LB_TITLEHEADER: 'Libary',

        //NOTIFICATION
        NOTIFICATION_TXT_TITLE: 'Notification',

        SELECT_LANGUAGE: 'Select Language',

        ST_DETAIL_NOTI: 'DETAIL_NOTIFICATION',
        ST_LANGUAGE: 'Language'
        //WORKORDER
        //BOOKING
      }
    },
    {
      id: 'vi',
      icon: '🇻🇳',
      title: 'Tiếng việt',
      data: {
        // LOGIN
        TITLE: 'Tiếng việt',
        LOGIN_BTN_LANGUAGE: 'Ngôn ngữ',
        LOGIN_TXT_PLACEHOLDER_EMAIL: 'Tên đăng nhập hoặc email',
        LOGIN_TXT_PLACEHOLDER_PASSWORD: 'Mật khẩu',
        LOGIN_TXT_FORGOTPASSWORD: 'Quên mật khẩu',
        LOGIN_BTN_LOGIN: 'Đăng nhập',

        // Forgot
        FORGOT_TXT_CONTENT:
          'Liên kết đặt lại mật khẩu sẽ được gửi đến mật khẩu của bạn. Nếu bạn không nhận được email trong vòng vài phút, vui lòng thử lại',
        FORGOT_TXT_PLACEHOLDER: 'Địa chỉ email',
        FORGOT_BTN_SEND: 'Gửi',

        //CHOOSE PROJECT
        PROJECT_TXT_CONTENT: 'Chọn dự án của bạn',

        //CHOOSE APARTMENT
        APARTMENT_TXT_CONTENT: 'Choose Your Apartment',

        //HOME
        HOME_TXT_EVENTS: 'Sự kiện',
        HOME_TXT_BOOKING: 'đặt tiện ích',
        HOME_TXT_WORKORDER: 'Yêu cầu',
        HOME_TXT_INBOX: 'Hộp thư',
        HOME_TXT_FEEDBACK: 'Góp ý',
        HOME_TXT_E_LIBARY: 'Thư viện',
        HOME_TXT_CONTACTS: 'Liên hệ',
        HOME_TXT_FRONTDESK: 'Lễ tân',
        HOME_TXT_FREE: 'Chi phí',
        HOME_TXT_INVOICE: 'Hoá đơn',
        HOME_TXT_FAQ: 'FAQ-vn',

        //PROFILE
        PROFILE_TXT_CHANGEAVATAR: 'Thay đổi avatar',
        PROFILE_TXT_UNIT: 'Căn hộ',
        PROFILE_TXT_PHONE: 'Số điện thoại',
        PROFILE_TXT_FIRST: 'Họ',
        PROFILE_TXT_LAST: 'Tên',
        PROFILE_TXT_DISPLAY: 'Tên hiển thị',
        PROFILE_BTN_SETTING: 'Cài đặt',
        PROFILE_BTN_CHANGEPASS: 'Thay đổi mật khẩu',
        PROFILE_BTN_LOGOUT: 'Đăng xuất',

        //EVENTS
        EVENTS_TXT_TITLE: 'Sự kiện',
        EVENTS_TXT_ALLTITLE: 'Tất cả sự kiện',
        EVENTS_TXT_WEEK: ['CN', 'T2', 'T3.', 'T4', 'T5', 'T6', 'T7'],
        EVENTS_TXT_MONTH: [
          'Tháng 1 / ',
          'Tháng 2 / ',
          'Tháng 3 / ',
          'Tháng 4 / ',
          'Tháng 5 / ',
          'Tháng 6 / ',
          'Tháng 7 / ',
          'Tháng 8 / ',
          'Tháng 9 / ',
          'Tháng 10 / ',
          'Tháng 11 / ',
          'Tháng 12 / '
        ],

        //CONTACTS
        CONTACTS_TXT_TITLE: 'Liên hệ',

        //NOTIFICATION
        NOTIFICATION_TXT_TITLE: 'Thông báo',

        //WORKORDER
        WO_CANCEL_ORDER: 'Bạn muốn hủy order này',
        WO_SENTDAY: 'Ngày Gửi',
        WO_AREA: 'Khu Vực',
        WO_PERSON: 'Người Phụ Trách',
        WO_NO_PERSON: 'Chưa có người phụ trách',
        WO_REVIEWED: 'Bạn đã đánh giá dịch vụ',
        WO_IMAGE: 'Hình Ảnh',
        WO_CONTENT_REVIEW: 'Nhập nội dung nhận xét',
        WO_REVIEW_SERVICE: 'Hãy đánh giá dịch vụ của \n Chúng tôi',
        WO_EMAIL: 'Mail',
        WO_PHONE: 'SĐT',
        WO_CATEGORY_SELECTED: 'Danh mục đã chọn',
        WO_DES_EMPTY: 'Thiếu Thông Tin',
        WO_NEW_ORDER: 'Dịch vụ mới',
        WO_REQUEST: 'Yêu cần',
        WO_PENDING: 'Đang xử lý',

        //BOOKING
        BK_SERVICES: 'Dịch vụ',
        BK_CANCEL_BK: 'Bạn muốn hủy sự kiện này',
        BK_CHANGE: 'Change',
        BK_DETAIL_ROLE: 'Chi tiết quy định',
        BK_CHOOSE_AMENITY: 'Chọn tiện nghi',
        BK_CREATE_UTILITI: 'Đặt tiện ích',

        //SETTING

        ST_SELECT_LANGUAGE: 'Chọn ngôn ngữ',
        ST_DETAIL_NOTI: 'Thông báo chi tiết',
        ST_LANGUAGE: 'Ngôn ngữ',

        // PROFILE:

        PF_SELECT_CAMERA: 'Chọn từ máy ảnh',
        PF_SELECT_STORAGE: 'Chọn từ bộ nhớ máy',

        // FEEDBACK

        FB_TITLEHEADER: 'Góp ý',

        FB_CREATE_TITLEHEADER: 'Tạo góp ý',
        FB_CREATE_BTNSEND: 'Gửi',
        FB_TYPE_FEEDBACK: 'Loại phản hồi',
        FB_PROBLEM_FEEDBACK: 'Vấn đề phản hồi',
        FB_PROBLEM: 'Vấn đề',

        FB_ALERT_NO_TYPE: 'Thiếu loại phản hồi',
        FB_ALERT_NO_FEEDBACK: 'Thiếu vấn đề phản hồi',
        FB_ALERT_NO_PROBLEM: 'Thiếu miêu tả',

        FB_DT_DESCRIPTION: 'Thông tin',
        FB_DT_TYPE: 'Loại phản hồi',
        FB_DT_PROBLEM: 'Vấn đè',
        FB_DT_STATUS: 'Trạng thái',
        FB_DT_DAY: 'Ngày gửi',
        FB_DT_depict: 'Miêu tả',
        FB_DT_BTNCANCLE: 'Hủy',

        // FEE
        FEE_TXT_FEE: 'Phí',
        FEE_TITLE_BTN_CHECKALL: 'Tắt cả',
        FEE_TITLE_BTN_HISTORY: 'Lịch sử',

        FEE_DO_TITLEHEADER: 'Chi tiết đơn hàng',
        FEE_DO_SUMMARY: 'Summary vi',
        FEE_DO_SERVICE_FEE: 'Service fee vi',
        FEE_DO_TXT_TOTAL: 'Tổng cộng',

        FEE_HT_TXTHEADER: 'Lịch sử',

        FEE_RECEIPT_TITLEHEADER: 'Chi tiết',
        FEE_RECEIPT_NO: 'Receipt mã',
        FEE_RECEIPT: 'Receipt vi',
        FEE_RECEIPT_METHOD: 'Phương thức',
        FEE_RECEIPT_TOTAL: 'tổng tiền',
        FEE_RECEIPT_TITLE_DETAIL: 'Chi tiết',

        //INBOX

        IB_TITLEHEADER: 'Tin nhắn',
        IB_TITLE_TAB_NEW: 'Mới',
        IB_TITLE_TAB_SEND: 'Đã gửi',
        IB_TITLE_TAB_STORE: 'Đã lưu',

        IB_DT_TITLEHEADER: 'Chi tiết',
        IB_DT_DESCRIPT: 'Thông tin',
        IB_DT_IMAGE: 'Hình ảnh',

        IB_CR_TITLEHEADER: 'Tạo mới',
        IB_CR_TITLE: 'Chủ đề',
        IB_CR_DESCRIPT: 'Nội dung',
        IB_CR_TITLE_BTN: 'Gửi',
        IB_CR_ENTER_TITLE: 'Nhập tiêu đề',
        IB_CR_ENTER_DESCRIPT: 'Nhập nội dung',

        //LIBARY
        LB_TITLEHEADER: 'Thư viện',

        //COMMON:

        NO_COMMENT: 'Không có tin nhắn',
        COMPLETE: 'Hoàn tất',
        CANCEL: 'Hủy',
        SEND: 'Gửi',
        CLOSE: 'Đóng',
        SELECT_IMAGE: 'Chọn Hình',
        BACK: 'Quay Lại',
        AGREE: 'Đồng ý',
        CONTENT: 'Nhập nội dung...',
        CONTENT_CHAT: 'Nhập tin nhắn...',
        INFOMATION: 'Thông tin',
        APARTMENT: 'Căn Hộ',
        STATUS: 'Trạng Thái',
        DAY: 'Ngày',
        TIME: 'Thời gian',
        DESCRIPT: 'Miêu Tả',
        CHAT_EMPTY: 'Chưa có tin nào, nhắn thông tin \n cần trao đổi cho chúng tôi',
        CONFIRM: 'Xác nhận',
        ACCEPT: 'Chấp nhận',

        SELECT_LANGUAGE: 'Chọn ngôn ngữ'
      }
    }
  ];
}
