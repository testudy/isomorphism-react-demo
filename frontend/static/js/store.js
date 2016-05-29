import {
    createStore,
    combineReducers,
} from 'redux';
import {
    routerReducer,
} from 'react-router-redux';

import reducers from '../../common/reducers.jsx';

const store = createStore(combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
})));

export default store;
