import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
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
                            src={`/${question.image}`}
                        />
                    </CardText>
                );
            }

            let options = null;
            if (question.multi) {
                options = question.options.map((option, index) => {
                    const number = String.fromCharCode('A'.charCodeAt(0) + index);
                    return (
                        <Checkbox key={`option-checkbox-${question._id}-${index}`}
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
                                <RadioButton key={`option-radio-${question._id}-${index}`}
                                    disabled={true}
                                    value={`${index}`}
                                    label={`${number}、${option.text}`}
                                />
                            );
                        })}
                    </RadioButtonGroup>
                );
            }

            return (
                <Card key={`question${question._id}`} style={{
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
                                <MenuItem primaryText="修改" onTouchTap={()=>{
                                    alert('修改');
                                }}/>
                                <MenuItem primaryText="删除"  onTouchTap={()=>{
                                    console.log('删除', question._id);
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
