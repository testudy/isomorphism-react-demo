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
import thunkMiddleware from 'redux-thunk';

import reducers from '../../../common/reducer/frontend.jsx';

const routerMiddlewareWithBrowserHistory = routerMiddleware(browserHistory);

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, routerMiddlewareWithBrowserHistory)(createStore);

const store = createStoreWithMiddleware(combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
})));

export default store;
