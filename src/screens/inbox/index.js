import Connect from '@stores';
import layout from './layout';
import {
    Animated,
    Platform
} from 'react-native';

import _ from "lodash";

class Inbox extends layout {

    constructor(props) {
        super(props);
        this.state = {
            isShowTitleHeader: false,
            data: [],
            dataIsActive: [],
            isRefresh: false,
            isRefreshActive: false,
            loadingMore: false,
            loadingMoreInboxActive: false,
            scrollY: new Animated.Value(0),
            isModalSelectUnit: false,
            isModalDetail: false,
            pageInbox: 1,
            pageInboxActive: 1,
            inboxId: null
        }
    }

    async componentWillMount() {
        await this._getListInbox(1);
        await this._getListInboxIsActive(1);
        let ida = this.props.navigation.getParam('params', false);
        if (ida.itemtype) {
            setTimeout(() => {
                this._openModalDetail(ida.itemtype);
            }, 300)
        }
    }

    async componentWillReceiveProps(nextProps) {

        if (this.props.inbox.listInbox.items !== nextProps.inbox.listInbox.items && nextProps.inbox.listInbox.success && this.state.isRefresh) {
            await this.setState({ data: nextProps.inbox.listInbox.items });
            await this.setState({ isRefresh: false })
        }

        if (this.props.inbox.listInbox.items !== nextProps.inbox.listInbox.items && nextProps.inbox.listInbox.success && !this.state.isRefresh) {
            await this.setState({ data: this.state.data.concat(nextProps.inbox.listInbox.items) });
            await this.setState({ loadingMore: false, isRefresh: false })
        }

        if (this.props.inbox.listInboxIsActive.items !== nextProps.inbox.listInboxIsActive.items && nextProps.inbox.listInboxIsActive.success && this.state.isRefreshActive) {
            await this.setState({ dataIsActive: nextProps.inbox.listInboxIsActive.items });
            await this.setState({ isRefreshActive: false })
        }

        if (this.props.inbox.listInboxIsActive.items !== nextProps.inbox.listInboxIsActive.items && nextProps.inbox.listInboxIsActive.success && !this.state.isRefreshActive) {
            await this.setState({ dataIsActive: this.state.dataIsActive.concat(nextProps.inbox.listInboxIsActive.items) });
            await this.setState({ loadingMoreInboxActive: false, isRefreshActive: false })
        }

        // setInboxActive
        if (this.props.inbox.setInboxActive !== nextProps.inbox.setInboxActive && nextProps.inbox.setInboxActive) {
            this._onRefresh(1);
            this._onRefreshIsActive(1);
        }

    }

    _setInboxActive(inboxID) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.inbox.setInboxActive(accessTokenApi, inboxID);
    }

    _getListInbox(page = this.state.pageInbox) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.inbox.getListInbox(accessTokenApi, page);
    }

    _getListInboxIsActive(page = this.state.pageInboxActive) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.inbox.getListInboxIsActive(accessTokenApi, page);
    }
    async _onRefresh() {
        if (this.state.isRefresh) {
            return;
        }
        await this.setState({ isRefresh: true, pageInbox: 1 })
        await this._getListInbox(1);
    }

    async _onRefreshIsActive() {
        if (this.state.isRefreshActive) {
            return;
        }
        await this.setState({ isRefreshActive: true, pageInboxActive: 1 })
        await this._getListInboxIsActive(1);
    }

    async _onEndReached() {
        let totalCount = this.props.inbox.listInbox.totalCount;
        if (this.state.loadingMore || totalCount === this.state.data.length) {
            return;
        }
        await this.setState({ loadingMore: true, pageInbox: this.state.pageInbox + 1 });
        // let start = this.state.data.length;
        await this._getListInbox(this.state.pageInbox);
    }

    async _onEndReachedInboxActive() {
        let totalCount = this.props.inbox.listInboxIsActive.totalCount;
        if (this.state.loadingMoreInboxActive || totalCount === this.state.dataIsActive.length) {
            return;
        }
        await this.setState({ loadingMoreInboxActive: true, pageInboxActive: this.state.pageInboxActive + 1 });
        // let start = this.state.dataIsActive.length;
        await this._getListInboxIsActive(this.state.pageInboxActive);
    }

    _closeModalSelectUnit() {
        this.setState({ isModalSelectUnit: false })
        this._onRefresh();
        this._onRefreshIsActive();
    }


    _openModalDetail(id) {
        this.setState({ inboxId: id, isModalDetail: true })
    }

    _closeModalDetail() {
        this.setState({ isModalDetail: false })
    }

}

export default Connect(Inbox);
