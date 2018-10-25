import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './actions';

export default connect((state) => ({
    ...state
}), (dispatch) => {
    let acts = {};
    for (let key in actions) {
        acts[key] = bindActionCreators(actions[key], dispatch);
    }
    return {
        actions: acts
    };
}, null, { "withRef": true });
