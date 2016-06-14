import React, {
    Component,
} from 'react';
import {
    Link,
} from 'react-router';
import {
    connect,
} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import style from '../style';


export default class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <Paper style={style.header}
                    zDepth={2}
                >
                    <AppBar
                        title="TEA评测系统"
                        onLeftIconButtonTouchTap={() => this.handleToggle()}
                    />
                </Paper>
                <Drawer
                    open={this.state.open}
                    docked={false}
                    onRequestChange={() => this.handleToggle()}
                >
                    <AppBar
                        title="系统菜单"
                        onLeftIconButtonTouchTap={() => this.handleToggle()}
                    />
                    <Link to="/backend/"><MenuItem leftIcon={<SocialPeople />}>测评列表</MenuItem></Link>
                    <Link to="/backend/lib"><MenuItem leftIcon={<ActionQuestionAnswer />}>测评题库</MenuItem></Link>
                </Drawer>
                {this.props.children}
            </div>
            </MuiThemeProvider>
        );
    }

    handleToggle() {
        console.log(arguments);
        this.setState({
            open: !this.state.open,
        });
    }

}
