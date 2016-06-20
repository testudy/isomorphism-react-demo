import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
import Paper from 'material-ui/Paper';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import {
    RadioButton,
    RadioButtonGroup,
} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../style';


class CreateQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameErrorText: '',
            phone: '',
            phoneErrorText: '',
        };
    }

    render() {

        return (
            <Paper style={style.container}>
                <Card style={style.card}>
                    <CardHeader
                        title="新建题目"
                        style={style.cardHeader}
                    />
                    <CardText style={style.cardText}>
                        <TextField
                            style={{width: '100%'}}
                            hintText="有人为了测试大猩猩聪明程度，特地在大猩猩面前放了一叠百元纸币和一部相机，请问猩猩会选哪个？"
                            errorText={this.state.nameErrorText}
                            floatingLabelText="请输入题面"
                            defaultValue={this.state.name}
                            multiLine={true}
                            rows={2}
                            onChange={(event) => this.handleName(event.target.value)}
                            onKeyDown={(event) => this.handleKeyDown(event.keyCode)}
                        />
                        <br />
                        <TextField
                            hintText="相机"
                            errorText={this.state.phoneErrorText}
                            floatingLabelText="请输入选项"
                            defaultValue={this.state.phone}
                            onChange={(event) => this.handlePhone(event.target.value)}
                            onKeyDown={(event) => this.handleKeyDown(event.keyCode)}
                        />
                        <FlatButton
                            label="添加选项"
                            labelPosition="after"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            secondary={true}
                            onClick={(event) => this.submit()}
                        />
                    </CardText>
                    <CardActions style={style.cardActions}>
                        <RaisedButton
                            label="上传或替换图片"
                            labelPosition="before"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            primary={true}
                            onClick={(event) => this.submit()}
                        >
                            <input type="file" style={style.fileButton} />
                        </RaisedButton>
                        <RaisedButton
                            label="保存题目"
                            labelPosition="after"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            primary={true}
                            onClick={(event) => this.submit()}
                        />
                        <RaisedButton
                            label="放弃保存"
                            labelPosition="after"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            primary={true}
                            onClick={(event) => this.submit()}
                        />
                    </CardActions>
                </Card>
            </Paper>
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(CreateQuestion);
