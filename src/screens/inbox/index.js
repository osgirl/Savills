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
            isModalSelectUnit: false
        }
    }

    componentWillMount() {
        this._getListInbox();
        this._getListInboxIsActive();
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.inbox.listInbox.items !== nextProps.inbox.listInbox.items && nextProps.inbox.listInbox.success) {
            if (this.state.isRefresh) {
                await this.setState({ data: nextProps.inbox.listInbox.items });
                await this.setState({ isRefresh: false });
            } else if (this.state.loadingMore) {
                await this.setState({ data: this.state.data.concat(nextProps.inbox.listInbox.items) });
                await this.setState({ loadingMore: false })
            } else {
                await this.setState({ data: nextProps.inbox.listInbox.items });
            }
        }

        if (this.props.inbox.listInbox.items === nextProps.inbox.listInbox.items && nextProps.inbox.listInbox.success) {
            if (this.state.isRefresh) {
                await this.setState({ isRefresh: false })
            }
            if (this.state.loadingMore) {
                await this.setState({ loadingMore: false })
            }
        }



        if (this.props.inbox.listInboxIsActive.items !== nextProps.inbox.listInboxIsActive.items && nextProps.inbox.listInboxIsActive.success) {
            if (this.state.isRefreshActive) {
                await this.setState({ dataIsActive: nextProps.inbox.listInboxIsActive.items });
                await this.setState({ isRefreshActive: false })
            } else if (this.state.loadingMoreInboxActive) {
                await this.setState({ dataIsActive: this.state.dataIsActive.concat(nextProps.inbox.listInboxIsActive.items) });
                await this.setState({ loadingMoreInboxActive: false })
            } else {
                await this.setState({ dataIsActive: nextProps.inbox.listInboxIsActive.items });
            }
        }

        if (this.props.inbox.listInboxIsActive.items === nextProps.inbox.listInboxIsActive.items && nextProps.inbox.listInboxIsActive.success) {
            if (this.state.isRefreshActive) {
                await this.setState({ isRefreshActive: false })
            }
            if (this.state.loadingMoreInboxActive) {
                await this.setState({ loadingMoreInboxActive: false })
            }
        }


        // setInboxActive
        if (this.props.inbox.setInboxActive !== nextProps.inbox.setInboxActive && nextProps.inbox.setInboxActive.success) {
            this._getListInbox();
            this._getListInboxIsActive()
        }

    }

    _setInboxActive(inboxID) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.inbox.setInboxActive(accessTokenApi, inboxID);
    }

    _getListInbox(start = 1) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.inbox.getListInbox(accessTokenApi, start);
    }

    _getListInboxIsActive(start = 1) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.inbox.getListInboxIsActive(accessTokenApi, start);
    }
    async _onRefresh() {
        if (this.state.isRefresh) {
            return;
        }
        await this.setState({ isRefresh: true })
        await this._getListInbox();
    }

    async _onRefreshIsActive() {
        if (this.state.isRefreshActive) {
            return;
        }
        await this.setState({ isRefreshActive: true })
        await this._getListInboxIsActive();
    }

    async _onEndReached() {
        let totalCount = this.props.inbox.listInbox.totalCount;
        if (this.state.loadingMore || totalCount === this.state.data.length) {
            return;
        }
        this.setState({ loadingMore: true });
        let start = this.state.data.length;
        await this._getListInbox(start);
    }

    async _onEndReachedInboxActive() {
        let totalCount = this.props.inbox.listInboxIsActive.totalCount;
        if (this.state.loadingMoreInboxActive || totalCount === this.state.dataIsActive.length) {
            return;
        }
        this.setState({ loadingMoreInboxActive: true });
        let start = this.state.dataIsActive.length;
        await this._getListInboxIsActive(start);
    }

    _closeModalSelectUnit() {
        this.setState({ isModalSelectUnit: false })
    }

}

export default Connect(Inbox);
