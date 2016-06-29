import React from 'react';
import {
    browserHistory,
} from 'react-router';
import {
    syncHistoryWithStore,
} from 'react-router-redux';
import store from './store';
import BackendRouter from '../../../common/router/Backend.jsx';

const history = syncHistoryWithStore(browserHistory, store);

export default (
    <BackendRouter history={history} />
);
