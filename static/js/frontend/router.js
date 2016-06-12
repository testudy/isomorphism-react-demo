import React from 'react';
import {
    Router,
    browserHistory,
} from 'react-router';

import {
    syncHistoryWithStore,
} from 'react-router-redux';

import store from './store';
import AppRouter from '../../../common/AppRouter.jsx';

const history = syncHistoryWithStore(browserHistory, store);

export default (<AppRouter history={history} />);
