import Connect from '@stores';
import layout from './layout';

class Launcher extends layout {

    componentWillMount() {
        this.props.navigation.navigate('Login');
    }

    async componentDidMount(){
        await this.props.actions.account.getAccessTokenLocal();
        await this.props.actions.account.getTenantLocal();
        
        // if (this.props.account.accessToken && this.props.account.tenantLocal) {
            
        // }
    }

}

export default Connect(Launcher);
