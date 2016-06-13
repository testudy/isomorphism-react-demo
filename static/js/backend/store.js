import {
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';

import {
    browserHistory,
} from 'react-router';

import {
    routerReducer,
    routerMiddleware,
} from 'react-router-redux';


import reducers from '../../../common/router/Backend.jsx';


const routerMiddlewareWithBrowserHistory = routerMiddleware(browserHistory);

const createStoreWithMiddleware = applyMiddleware(routerMiddlewareWithBrowserHistory)(createStore);


const store = createStoreWithMiddleware(combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
})));


export default store;
