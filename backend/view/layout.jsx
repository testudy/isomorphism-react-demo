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
                    <style>{"\
                        html { font-family: Roboto, sans-serif; -webkit-font-smoothing: antialiased; }\
                        body, h1, h2, h3, h4, h5, h6 { margin: 0; }\
                        body { font-size: 15px; line-height: 24px; }\
                        a { color: #ff4081; text-decoration: none; }\
                        a:hover { text-decoration: underline; }\
                    "}</style>
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>
        );
    },
});


module.exports = Layout;
