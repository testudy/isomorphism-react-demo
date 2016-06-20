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
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
            option: '',
            optionsErrorText: '',
            multi: !!parseInt(this.props.params.multi, 10),
        };
    }

    handleOption(option) {
        option = option.trim();
        this.setState({
            option,
        });
    }

    hasOption(text) {
        return !!this.state.options.find((option) => {
            return option.text === text;
        });
    }

    validateOption() {
        if (this.state.option.length === 0) {
            this.setState({
                optionsErrorText: '请填写选项',
            });
            return false;
        }
        if (this.hasOption(this.state.option)) {
            this.setState({
                optionsErrorText: '请重新填写选项，选项重复',
            });
            return false;
        }

        this.setState({
            optionsErrorText: '',
        });
        return true;

    }

    addOption() {
        if (this.validateOption()) {
            const option = this.state.option;
            this.setState({
                options: [...this.state.options].concat({
                    text: option,
                    checked: false,
                }),
                option: '',
            });
            console.log(this.state.option);
        }
    }

    handleKeyDown(keyCode) {
        if (keyCode === 13) {
            this.addOption();
        }
    }


    handleImage(image) {
        console.log(image);
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
                    <div style={{
                        position: 'relative',
                    }}>
                        <Checkbox key={`option-${index}`}
                            defaultChecked={option.checked}
                            value={`${index}`}
                            label={`${number}、${option.text}`}
                        />
                        <IconMenu
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                zIndex: 10,
                            }}
                            iconButtonElement={<IconButton style={{
                                width: '24px',
                                height: '24px',
                                padding: '0',
                                border: 'none',
                            }}><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                            <MenuItem primaryText="修改" onTouchTap={()=>{
                                alert('修改');
                            }}/>
                            <MenuItem primaryText="删除"  onTouchTap={()=>{
                                alert('删除');
                            }}/>
                        </IconMenu>
                    </div>
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
                            defaultValue={this.state.title}
                            multiLine={true}
                            rows={2}
                        />
                        {image}
                        {options}
                        <br />
                        <TextField
                            hintText="相机"
                            errorText={this.state.optionsErrorText}
                            floatingLabelText="请输入选项"
                            value={this.state.option}
                            onChange={(event) => this.handleOption(event.target.value)}
                            onKeyDown={(event) => this.handleKeyDown(event.keyCode)}
                        />
                        <FlatButton
                            label="添加选项"
                            labelPosition="after"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            secondary={true}
                            onClick={() => this.addOption()}
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
                            <input type="file" accept="image/*"
                                onChange={(event) => this.handleImage(event.target.files[0])}
                                style={style.fileButton} />
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
