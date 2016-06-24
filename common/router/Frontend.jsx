import React, {
    Component,
} from 'react';

import {
    Router,
    Route,
} from 'react-router';

import Index from '../container/index.jsx';
import Test from '../container/test.jsx';
import Done from '../container/done.jsx';

export default class AppRouter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router {...this.props}>
                <Route path="/" component={Index} />
                <Route path="/:date/:phone" component={Test} />
                <Route path="/done" component={Done} />
            </Router>
        );
    }
}
