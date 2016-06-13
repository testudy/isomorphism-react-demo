import React, {
    Component,
} from 'react';

import {
    Router,
    Route,
    IndexRoute,
} from 'react-router';

import backend from '../container/backend.jsx';
import report from '../container/report.jsx';
import lib from '../container/lib.jsx';


export default class BackendRouter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router {...this.props}>
                <Route path="/backend" component={backend}>
                    <IndexRoute component={report} />
                    <Route path="lib" component={lib} />
                </Route>
            </Router>
        );
    }

}
