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
} from '../action/backend.jsx';

import style from '../style';


class Lib extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(fetchLib());
    }


    handleRemove(questionId) {
        this.props.dispatch(removeQuestion(questionId));
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
                {questions}
            </Paper>
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(Lib);
