import {
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import {
    routerReducer,
} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../../common/reducers.jsx';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
})));

export default store;
