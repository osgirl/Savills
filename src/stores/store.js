import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import {
    composeWithDevTools
} from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';


// import thunk from 'redux-thunk';
// import {
//     testMiddleware
// } from './middlewares'

// import testMiddleware from './middlewares/testMiddleware';

import storageMiddleware from './middlewares/storageMiddleware';

import sagaRoot from './saga';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

const finalCreateStore = composeWithDevTools(
    applyMiddleware(sagaMiddleware, storageMiddleware)
)(createStore);
const store = finalCreateStore(reducers);

sagaMiddleware.run(sagaRoot);

export default store;
