import React, {
    Component,
    PropTypes,
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
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import style from '../style';


export default class Backend extends Component {

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
                        title={this.props.title}
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
                    <Link to="/backend/lib"><MenuItem leftIcon={<ContentInbox />}>测评题库</MenuItem></Link>
                    <Link to="/backend/lib/create/0"><MenuItem leftIcon={<ContentAddCircle />}>添加单选题</MenuItem></Link>
                    <Link to="/backend/lib/create/1"><MenuItem leftIcon={<ContentAddBox />}>添加多选题</MenuItem></Link>
                </Drawer>
                {this.props.children}
            </div>
            </MuiThemeProvider>
        );
    }

    handleToggle() {
        this.setState({
            open: !this.state.open,
        });
    }

}

Backend.propTypes = {
    title: PropTypes.string.isRequired,
};

function select(state) {
    return {
        title: state.title,
    };
}


export default connect(select)(Backend);
