import React, {
    Component,
    PropTypes,
} from 'react';
import {
    connect,
} from 'react-redux';
import {
    Link,
} from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import style from '../style';

class Done extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <Paper style={style.header}
                        zDepth={2}
                    >
                        <AppBar
                            title={this.props.title}
                            showMenuIconButton={false}
                        />
                    </Paper>
                    <Paper style={style.container}>
                        <Card style={style.card}>
                            <CardHeader
                                title={`${this.props.name} 同学：`}
                                style={style.cardHeader}
                            />
                            <CardText style={style.cardText}>
                                <p>谢谢您参加我们的基础素质测评，祝您面试顺利！期待和您成为同事一起工作。</p>
                            </CardText>
                            <CardActions style={style.cardActions}>
                                <Link to="/">
                                    <RaisedButton
                                        label="返回首页"
                                        labelPosition="after"
                                        primary={true}
                                    />
                                </Link>
                            </CardActions>
                        </Card>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }

}

Done.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};


function select(state) {
    return {
        title: state.title,
        name: state.test.name || 'Hello',
    };
}


export default connect(select)(Done);
