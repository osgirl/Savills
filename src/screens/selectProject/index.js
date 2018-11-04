import Connect from '@stores';
import layout from './layout';

class SelectProject extends layout {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            unMount: true
        }
    }

    async _gotoChooseApartment(project) {
        this.setState({ loading: true })
        this.props.actions.account.setTenantActive(project);
        await this.props.actions.account.switchToUserAccount(this.props.account.accessToken, project.tenantId, project.id);
    }

    async componentWillReceiveProps(nextProps) {
        if (this.state.unMount) {
            if (this.props.account.switchAccount !== nextProps.account.switchAccount && nextProps.account.switchAccount.success && !nextProps.account.isGetSwichToUserAccount) {
                let accessToken = this.props.account.accessToken;
                let Token = nextProps.account.switchAccount.result.switchAccountToken;
                await this.props.actions.account.linkedAccountAuthenticate(accessToken, Token);
            }

            if (this.props.account.linkedAccountAuthenticate !== nextProps.account.linkedAccountAuthenticate && nextProps.account.linkedAccountAuthenticate.success && !nextProps.account.isGetAccessTokenAPI) {
                await this.props.actions.account.setAccessApiTokenLocal(nextProps.account.linkedAccountAuthenticate.result.accessToken);
                await this.props.actions.account.setEncTokenLocal(nextProps.account.linkedAccountAuthenticate.result.encryptedAccessToken);
                await this.props.actions.userProfile.getCurrentLoginInformations(nextProps.account.linkedAccountAuthenticate.result.accessToken);
                await this.props.actions.userProfile.getImageUserProfile(nextProps.account.linkedAccountAuthenticate.result.accessToken);
                await this.props.actions.units.getUnits(nextProps.account.linkedAccountAuthenticate.result.accessToken);
                await this.props.actions.account.setIsAccessTokenAPI(true);
            }

            if (this.props.units.listUnits !== nextProps.units.listUnits && nextProps.units.listUnits.success && !nextProps.units.isGetlisUnit) {
                if (nextProps.units.listUnits.result.items && nextProps.units.listUnits.result.items.length === 1) {
                    await this.props.actions.units.setUnitLocal(nextProps.units.listUnits.result.items[0]);
                    await this.props.navigation.navigate('Home');
                    this.setState({ loading: false })
                    this.props.actions.units.setIsGetlisUnit(true);

                } else {
                    let arrTemp = nextProps.units.listUnits.result.items;
                    let unitTemp = null;
                    arrTemp.map(item => {
                        if (item.isDefault) {
                            unitTemp = item;
                        }
                    })
                    if (unitTemp && unitTemp !== null) {
                        this.props.actions.units.setUnitLocal(unitTemp);
                        this.props.navigation.navigate('Home');
                        this.props.actions.units.setIsGetlisUnit(true);
                        this.setState({ loading: false, unMount: false })
                    } else {
                        this._gotoChooseApartment(this.props.account.tenantLocal);
                        this.props.actions.units.setIsGetlisUnit(true);
                        this.setState({ loading: false, unMount: false })
                    }
                }
            }
        }
    }

}

export default Connect(SelectProject);
