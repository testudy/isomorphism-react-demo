import React, {
    Component,
} from 'react';
import {
    push,
} from 'react-router-redux';
import Paper from 'material-ui/Paper';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
    RadioButton,
    RadioButtonGroup,
} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../style';


export default class EditQuestion extends Component {

    constructor(props) {
        super(props);
        this.initState(this.props.question);
    }

    initState(initQuestion) {
        this.state = {
            title: initQuestion.title,
            titleErrorText: '',
            image: initQuestion.image,
            imageFile: null,
            options: initQuestion.options || [],
            optionsText: '',
            optionsErrorText: '',
            multi: initQuestion.multi,
            type: initQuestion.type || 1,
        };
        this.state.optionsText = this.stringifyOptions(this.state.options);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.question !== this.props.question) {
            this.initState(nextProps.question);
        }
    }

    handleTitle(title) {
        this.setState({
            title,
        });
    }

    validateTitle() {
        if (this.state.title.length === 0) {
            this.setState({
                titleErrorText: '请填写题面',
            });
            return false;
        }

        this.setState({
            titleErrorText: '',
        });
        return true;

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
                checked: !!(oldOption && oldOption.checked),
            };
        }).filter((option) => !!option);
    }

    findOption(optionText) {
        return this.state.options.find((option) => {
            return option.text === optionText;
        });
    }

    validateOptions() {
        if (this.state.options.length <= 1) {
            this.setState({
                optionsErrorText: '请填写至少两个选项',
            });
            return false;
        }
        const hasSelected = !!this.state.options.find((option) => {
            return option.checked;
        });
        if (!hasSelected) {
            this.setState({
                optionsErrorText: '请勾选至少一个选项',
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
        this.setState({
            options: this.parseOptions(optionsText),
        });
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

    handleType(type) {
        this.setState({
            type,
        });
    }

    submit() {
        if (this.validateTitle() && this.validateOptions()) {
            window.URL.revokeObjectURL(this.state.image);
            this.props.onSubmit({
                title: this.state.title,
                image: this.state.imageFile || this.state.image,
                options: this.state.options,
                multi: this.state.multi,
                type: this.state.type,
            });
        }
    }

    cancel() {
        this.props.onCancel();
    }

    render() {

        let options = null;
        if (this.state.multi) {
            options = this.state.options.map((option, index) => {
                const number = String.fromCharCode('A'.charCodeAt(0) + index);
                return (
                    <Checkbox key={`option-checkbox-${index}`}
                        defaultChecked={option.checked}
                        label={`${number}、${option.text}`}
                        onCheck={(event) => {
                            option.checked = event.target.checked;
                        }}
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
                            <RadioButton key={`option-radio-${index}`}
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
                    textAlign: 'center',
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
                            onChange={(event) => this.handleTitle(event.target.value) }
                        />
                        <SelectField value={this.state.type} onChange={(event, index, value) => this.handleType(value)}>
                            <MenuItem value={1} primaryText="概念性推理" />
                            <MenuItem value={2} primaryText="策略性推理" />
                            <MenuItem value={3} primaryText="批判性评估" />
                            <MenuItem value={4} primaryText="复杂信息理解" />
                        </SelectField>
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
                            label={this.props.submitLabel}
                            labelPosition="after"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            primary={true}
                            onClick={(event) => this.submit()}
                        />
                        <RaisedButton
                            label={this.props.cancelLabel}
                            labelPosition="after"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            secondary={true}
                            onClick={(event) => this.cancel()}
                        />
                    </CardActions>
                </Card>
            </Paper>
        );
    }

}
