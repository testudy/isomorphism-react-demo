import React from 'react';
import {
    Router,
    browserHistory,
} from 'react-router';

import {
    syncHistoryWithStore,
} from 'react-router-redux';

import store from './store';
import routes from '../../common/routes.jsx';

const history = syncHistoryWithStore(browserHistory, store);

export default (
    <Router history={history}>
        {routes}
    </Router>
);
