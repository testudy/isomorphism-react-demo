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
            imageFile: null,
            options: [
                {
                    text: '纸币',
                    checked: false,
                },
                {
                    text: '相机',
                    checked: true,
                },
            ],
            optionsText: '',
            optionsErrorText: '',
            multi: !!parseInt(this.props.params.multi, 10),
        };
        this.state.optionsText = this.stringifyOptions(this.state.options);
    }

    stringifyOptions(options) {
        return options.map((option) => {
            return option.text;
        }).join('\n');
    }

    parseOptions(optionsText) {
        return optionsText.split(/[\n\r]/).map((optionText) => {
            optionText = optionText.trim();
            if (optionText.length === 0) {
                return;
            }
            const oldOption = this.findOption(optionText);
            return {
                text: optionText,
                checked: oldOption && oldOption.checked,
            };
        }).filter((option) => !!option);
    }

    findOption(optionText) {
        return this.state.options.find((option) => {
            return option.text === optionText;
        });
    }

    hasOption(optionText) {
        return !!this.findOption(optionText);
    }

    validateOption() {
        if (this.state.optionsText.length === 0) {
            this.setState({
                optionsErrorText: '请填写选项',
            });
            return false;
        }

        this.setState({
            optionsErrorText: '',
        });
        return true;

    }

    handleOptionsText(optionsText) {
        this.setState({
            optionsText,
        });
    }

    updateOptions() {
        if (this.validateOption()) {
            const optionsText = this.state.optionsText;
            this.setState({
                options: this.parseOptions(optionsText),
            });
        }
    }

    handleOptions(selectedIndex) {
        const options = this.state.options.map((option, index) => {
            return {
                text: option.text,
                checked: index === selectedIndex,
            };
        });
        this.setState({
            options: options,
        });
    }

    handleImage(image) {
        if (image) {
            this.setState({
                image: window.URL.createObjectURL(image),
                imageFile: image,
            });
        }
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
                    onChange={(event, value) => {
                        const selectedIndex = parseInt(value, 10);
                        this.handleOptions(selectedIndex);
                    }}
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

        let image = null;

        if (this.state.image) {
            image = (
                <CardText style={{
                    padding: 0,
                    margin: '16px 0',
                }}>
                    <img
                        style={{
                            maxWidth: '100%',
                        }}
                        src={this.state.image}
                    />
                </CardText>
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
                            value={this.state.title}
                            multiLine={true}
                            rows={1}
                        />
                        {image}
                        {options}
                        <br />
                        <TextField
                            hintText="相机"
                            errorText={this.state.optionsErrorText}
                            floatingLabelText="请输入选项"
                            value={this.state.optionsText}
                            multiLine={true}
                            rows={1}
                            onChange={(event) => this.handleOptionsText(event.target.value)}
                        />
                    </CardText>
                    <CardActions style={style.cardActions}>
                        <RaisedButton
                            label="添加或更新选项"
                            labelPosition="before"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            primary={true}
                            onClick={() => this.updateOptions()}
                        />
                        <RaisedButton
                            label="添加或更新图片"
                            labelPosition="before"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            primary={true}
                        >
                            <input type="file" accept="image/*"
                                onChange={(event) => this.handleImage(event.target.files[0])}
                                style={style.fileButton}
                            />
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
                            label="放弃题目"
                            labelPosition="after"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            secondary={true}
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
