import React, {
    Component,
    PropTypes,
} from 'react';
import {
    connect,
} from 'react-redux';
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
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import style from '../style';

import {
    createTest,
} from '../action/frontend.jsx';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameErrorText: '',
            phone: '',
            phoneErrorText: '',
        };
    }


    handleName(name) {
        this.setState({
            name: name.trim(),
        });
    }


    validateName() {
        const NAME_RE = /^[\w\u4e00-\u9fff]{2,}$/;

        const name = this.state.name;

        if (NAME_RE.test(name)) {
            this.setState({
                nameErrorText: '',
            });
            return true;
        }

        this.setState({
            nameErrorText: '请填写您的姓名，方便我们后续和您联系',
        });
        return false;
    }


    handlePhone(phone) {
        this.setState({
            phone: phone.trim(),
        });
    }


    validatePhone() {
        const PHONE_RE = /^\d{3}\-?\d{4}\-?\d{4}$/;
        const phone = this.state.phone;

        if (PHONE_RE.test(phone)) {
            this.setState({
                phoneErrorText: '',
            });
            return true;
        }

        this.setState({
            phoneErrorText: '请填写您的手机号码，方便我们后续和您联系',
        });
        return false;
    }


    submit() {
        if (this.validateName() &&
                this.validatePhone()) {
            this.props.dispatch(createTest({
                name: this.state.name,
                phone: this.state.phone,
            }));
        }
    }


    handleKeyDown(keyCode) {
        const ENTER_KEY_CODE = 13;

        if (keyCode === ENTER_KEY_CODE) {
            this.submit();
        }
    }


    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <Paper style={style.header}
                        zDepth={2}
                    >
                        <AppBar
                            title="TEA素质测评"
                            showMenuIconButton={false}
                        />
                    </Paper>
                    <Paper style={style.container}>
                        <Card style={style.card}>
                            <CardHeader
                                title="个人信息填写"
                                style={style.cardHeader}
                            />
                            <CardText style={style.cardText}>
                                <TextField
                                    hintText="王少伟"
                                    errorText={this.state.nameErrorText}
                                    floatingLabelText="请输入您的姓名"
                                    defaultValue={this.state.name}
                                    onChange={(event) => this.handleName(event.target.value)}
                                    onKeyDown={(event) => this.handleKeyDown(event.keyCode)}
                                />
                                <br />
                                <TextField
                                    hintText="186-1051-9100"
                                    errorText={this.state.phoneErrorText}
                                    floatingLabelText="您的手机号码"
                                    defaultValue={this.state.phone}
                                    onChange={(event) => this.handlePhone(event.target.value)}
                                    onKeyDown={(event) => this.handleKeyDown(event.keyCode)}
                                />
                            </CardText>
                            <CardActions style={style.cardActions}>
                            <RaisedButton
                                label="开始答题"
                                labelPosition="after"
                                labelStyle={{
                                    verticalAlign: 'middle',
                                }}
                                primary={true}
                                icon={<ContentSend />}
                                onClick={() => this.submit()}
                            />
                            </CardActions>
                        </Card>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }

}

Index.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


function select(state) {
    return state;
}


export default connect(select)(Index);
