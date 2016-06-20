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
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../style';


class CreateQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleErrorText: '',
            image: '',
            options: [
                {
                    text: '纸币',
                    checked: false,
                },
                {
                    text: '相机',
                    checked: true,
                },
                {
                    text: '两个都选',
                    checked: false,
                },
                {
                    text: '都不选，找食物',
                    checked: false,
                },
            ],
            optionsErrorText: '',
            multi: !!parseInt(this.props.params.multi, 10),
        };
    }

    render() {

        let options = null;
        if (this.state.multi) {
            options = this.state.options.map((option, index) => {
                const number = String.fromCharCode('A'.charCodeAt(0) + index);
                return (
                    <Checkbox key={`option-${index}`}
                        defaultChecked={option.checked}
                        value={`${index}`}
                        label={`${number}、${option.text}`}
                    />
                );
            });
        } else {
            const valueSelected = this.state.options.findIndex((option) => {
                return option.checked;
            });
            options = (
                <RadioButtonGroup name={`options`}
                    valueSelected={String(valueSelected)}
                >
                    {this.state.options.map((option, index) => {
                        const number = String.fromCharCode('A'.charCodeAt(0) + index);
                        return (
                            <RadioButton key={`option-${index}`}
                                value={`${index}`}
                                label={`${number}、${option.text}`}
                            />
                        );
                    })}
                </RadioButtonGroup>
            );
        }

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
                            errorText={this.state.titleErrorText}
                            floatingLabelText="请输入题面"
                            defaultValue={this.state.title}
                            multiLine={true}
                            rows={2}
                        />
                        {options}
                        <br />
                        <TextField
                            hintText="相机"
                            errorText={this.state.optionsErrorText}
                            floatingLabelText="请输入选项"
                            defaultValue={this.state.phone}
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
