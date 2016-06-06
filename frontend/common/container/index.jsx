import React, {
    Component,
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

class Index extends Component {

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
                                    errorText="请填写您的姓名，方便我们后续和您联系"
                                    floatingLabelText="您的姓名"
                                />
                                <br />
                                <TextField
                                    hintText="186-1051-9100"
                                    errorText="请填写您的手机号码，方便我们后续和您联系"
                                    floatingLabelText="您的手机号码"
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
                            />
                            </CardActions>
                        </Card>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(Index);
