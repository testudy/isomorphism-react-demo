import React, {
    Component,
} from 'react';

import {
    Router,
    Route,
} from 'react-router';

import Index from './container/index.jsx';

export default class AppRouter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router {...this.props}>
                <Route path="/" component={Index} />
                <Route path="/:date/:phone" component={Index} />
            </Router>
        );
    }
}
