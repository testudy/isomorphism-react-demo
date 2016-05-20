import React, {
    Component,
} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer';


export default class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {
        return (
            <div>
                <AppBar
                    title="TEA评测系统"
                    iconElementRight={<FlatButton label="OK" />}
                    onLeftIconButtonTouchTap={() => this.handleToggle()}
                />
                <Drawer
                    open={this.state.open}
                    docked={false}
                    onRequestChange={() => this.handleToggle()}
                >
                    <AppBar
                        title="系统菜单"
                        onLeftIconButtonTouchTap={() => this.handleToggle()}
                    />
                    <MenuItem leftIcon={<SocialPeople />}>测评列表</MenuItem>
                    <MenuItem leftIcon={<ActionQuestionAnswer />}>测评题库</MenuItem>
                </Drawer>
            </div>
        );
    }

    handleToggle() {
        console.log(arguments);
        this.setState({
            open: !this.state.open,
        });
    }

}
