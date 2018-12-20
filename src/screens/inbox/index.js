import Connect from '@stores';
import layout from './layout';
import {
    Animated,
    Platform
} from 'react-native';
import Language from '../../utils/language';
import _ from "lodash";

class Inbox extends layout {

    constructor(props) {
        super(props);
        this.state = {
            isShowTitleHeader: false,
            data: [],
            dataIsActive: [],
            dataToManager: [],
            isRefresh: false,
            isRefreshActive: false,
            loadingMore: false,
            loadingMoreInboxActive: false,
            isModalNew: false,
            scrollY: new Animated.Value(0),
            isModalSelectUnit: false,
            isModalDetail: false,
            pageInbox: 1,
            pageInboxActive: 1,

            pageInboxToManager: 1,
            isRefreshToManager: false,
            loadingMoreToManager: false,

            inboxId: null
        }
    }

    async componentWillMount() {
        await this._getListInbox(1);
        await this._getListInboxIsActive(1);
        await this._getInboxToManager(1);
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

        //data to manager
        if (this.props.inbox.listInboxToManager.items !== nextProps.inbox.listInboxToManager.items && nextProps.inbox.listInboxToManager.success && this.state.isRefreshToManager) {
            await this.setState({ dataToManager: nextProps.inbox.listInboxToManager.items });
            await this.setState({ isRefreshToManager: false })
        }
        if (this.props.inbox.listInboxToManager.items !== nextProps.inbox.listInboxToManager.items && nextProps.inbox.listInboxToManager.success && !this.state.isRefreshToManager) {
            await this.setState({ dataToManager: this.state.dataToManager.concat(nextProps.inbox.listInboxToManager.items) });
            await this.setState({ loadingMoreToManager: false, isRefreshToManager: false })
        }

        // setInboxActive
        if (this.props.inbox.setInboxActive !== nextProps.inbox.setInboxActive && nextProps.inbox.setInboxActive) {
            this._onRefresh(1);
            this._onRefreshIsActive(1);
        }

        // setInboxActive
        if (this.props.inbox.setRead !== nextProps.inbox.setRead && nextProps.inbox.setRead.success) {
            let accessTokenApi = this.props.account.accessTokenAPI;
            let unitID = this.props.units.unitActive.unitId;
            this.props.actions.notification.getListCountModule(accessTokenApi, unitID);
        }

    }


    _setInboxReaded(inboxID) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        let languege = Language.listLanguage[this.props.app.languegeLocal].id
        this.props.actions.inbox.setInboxRead(accessTokenApi, languege, inboxID);
    }

    _setInboxActive(inboxID) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        let languege = Language.listLanguage[this.props.app.languegeLocal].id
        this.props.actions.inbox.setInboxActive(accessTokenApi, languege, inboxID);
    }

    _getInboxToManager(page = this.state.pageInboxToManager) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        let languege = Language.listLanguage[this.props.app.languegeLocal].id
        this.props.actions.inbox.getInboxToManagement(accessTokenApi, languege, page);
    }

    _getListInbox(page = this.state.pageInbox) {
        let languege = Language.listLanguage[this.props.app.languegeLocal].id
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.inbox.getListInbox(accessTokenApi, languege, page);
    }

    _getListInboxIsActive(page = this.state.pageInboxActive) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        let languege = Language.listLanguage[this.props.app.languegeLocal].id
        this.props.actions.inbox.getListInboxIsActive(accessTokenApi, languege, page);
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

    _onCloseModalNew() {
        this.setState({ isModalNew: false })
    }
    _openModalNew() {
        this.setState({ isModalNew: true })
    }


    async _openModalDetail(id) {
        this.setState({ inboxId: id, isModalDetail: true });
        let tempArrInbox = this.state.data.slice();
        let tempArrInboxActive = this.state.dataIsActive.slice();
        if (tempArrInbox.length > 0) {
            let inbox = await tempArrInbox.find(item => item.id === id) || null;
            if (inbox !== null && !inbox.state) {
                tempArrInbox[tempArrInbox.findIndex(i => i.id == inbox.id)].state = true;
                await this.setState({ data: tempArrInbox })
            }
        }
        if (tempArrInboxActive.length > 0) {
            let inboxActive = await tempArrInboxActive.find(item => item.id === id) || null;
            if (inboxActive !== null && !inboxActive.state) {
                tempArrInboxActive[tempArrInboxActive.findIndex(i => i.id == inboxActive.id)].state = true;
                await this.setState({ dataIsActive: tempArrInboxActive })
            }
        }
        this._setInboxReaded(id);
    }

    _closeModalDetail() {
        this.setState({ isModalDetail: false })
    }

}

export default Connect(Inbox);
