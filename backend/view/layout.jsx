const React = require('React');


const Layout = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
    },

    render: function () {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>{this.props.title}</title>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <meta name="renderer" content="webkit" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui" />
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>
        );
    },
});


module.exports = Layout;
