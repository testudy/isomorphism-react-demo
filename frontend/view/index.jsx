import React, {
    Component,
    PropTypes,
} from 'react';

import Layout from './layout';


export default class Index extends Component {

    render() {

        return (
            <Layout title={this.props.title}>
                <div id="app" />
                <script src="/vendors.js"></script>
                <script src="/app.js"></script>
            </Layout>
        );

    }

}

Index.propTypes = {
    title: PropTypes.string.isRequired,
};
