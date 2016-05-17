import React, {
    Component,
    PropTypes,
} from 'react';

import Layout from './layout';


export default class Index extends Component {

    render() {

        return (
            <Layout title={this.props.title}>
                <h1>{this.props.title}</h1>
                <script src="admin/vendors.js"></script>
                <script src="admin/app.js"></script>
            </Layout>
        );

    }

}

Index.propTypes = {
    title: PropTypes.string.isRequired,
};
