import React, {
    Component,
} from 'react';

import {
    Router,
    Route,
} from 'react-router';

import report from '../container/report.jsx';


export default class BackendRouter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router {...this.props}>
                <Route path="/backend" component={report} />
                <Route path="/backend/lib" component={report} />
            </Router>
        );
    }

}
