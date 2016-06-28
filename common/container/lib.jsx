import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
import {
    Link,
} from 'react-router';
import {
    Card,
    CardActions,
    CardHeader,
    CardTitle,
    CardText,
} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
    RadioButton,
    RadioButtonGroup,
} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {
    fetchLib,
    removeQuestion,
    setLibType,
} from '../action/backend.jsx';
import QuestionType from '../component/QuestionType.jsx';

import style from '../style';


class Lib extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(fetchLib());
    }


    handleRemove(questionId) {
        this.props.dispatch(removeQuestion(questionId));
    }


    handleType(type) {
        this.props.dispatch(setLibType(type));
    }


    render() {

        const questions = this.props.lib.map((question, index) => {
            let image = null;

            if (question.image) {
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
                            src={question.image}
                        />
                    </CardText>
                );
            }

            let options = null;
            if (question.multi) {
                options = question.options.map((option, index) => {
                    const number = String.fromCharCode('A'.charCodeAt(0) + index);
                    return (
                        <Checkbox key={`option-checkbox-${question._id}-${index}-${option.checked}`}
                            disabled={true}
                            defaultChecked={option.checked}
                            label={`${number}、${option.text}`}
                        />
                    );
                });
            } else {
                let defaultSelected = question.options.findIndex((option) => {
                    return option.checked;
                });
                options = (
                    <RadioButtonGroup name={`question${question._id}`} defaultSelected={`${defaultSelected}`}>
                        {question.options.map((option, index) => {
                            const number = String.fromCharCode('A'.charCodeAt(0) + index);
                            return (
                                <RadioButton key={`option-radio-${question._id}-${index}-${option.checked}`}
                                    disabled={true}
                                    value={`${index}`}
                                    label={`${number}、${option.text}`}
                                />
                            );
                        })}
                    </RadioButtonGroup>
                );
            }

            // 只有单选框出现了不更新选择框的问题，复选框没有出现，故先只解决单选框的问题。
            let defaultSelected = question.options.findIndex((option) => {
                return option.checked;
            });

            return (
                <Card key={`question${question._id}-${defaultSelected}`} style={{
                    padding: '16px',
                }}>
                    <CardHeader
                        title={`${index + 1}、${question.title}`}
                        style={{
                            padding: 0,
                            margin: '0 0 16px 0',
                        }}
                        children={
                            <IconMenu
                                style={style.cardHeaderMenu}
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                >
                                <Link to={`/backend/lib/update/${question._id}`}>
                                    <MenuItem primaryText="修改" />
                                </Link>
                                <MenuItem primaryText="删除"  onTouchTap={()=>{
                                    this.handleRemove(question._id);
                                }}/>
                            </IconMenu>
                        }
                    />
                    {image}
                    <CardActions style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        {options}
                    </CardActions>
                </Card>
            );
        });

        return (
            <Paper style={style.container}>
                <Card style={{
                    padding: '16px',
                }}>
                    <CardTitle style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        <QuestionType
                            selectStyle={{width: 150}}
                            type={this.props.libType}
                            onTypeChange={(value) => this.handleType(value)}
                        />题库
                    </CardTitle>
                </Card>
                {questions}
            </Paper>
        );
    }

}


function select(state) {
    const libType = state.libType;
    const lib = [];

    state.lib.forEach(function (question) {
        question.type = question.type || 1;
        if (parseInt(question.type, 10) === libType) {
            lib.push(question);
        }
    });

    return {
        lib,
        libType,
    };
}


export default connect(select)(Lib);
