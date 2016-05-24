import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    combineReducers,
} from 'redux';
import {
    Provider,
} from 'react-redux';
import {
    Router,
    browserHistory,
} from 'react-router';
import {
    syncHistoryWithStore,
    routerReducer,
} from 'react-router-redux';

import reducers from '../../common/reducers.jsx';
import routes from '../../common/routes.jsx';

const store = createStore(combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
})));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Provider store={store}>
    <Router history={history}>
        {routes}
    </Router>
</Provider>, document.getElementById('app'));
