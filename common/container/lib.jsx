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
import {
    fetchLib,
} from '../action/backend.jsx';
import CreateQuestion from '../component/CreateQuestion.jsx';

import style from '../style';


class Lib extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(fetchLib());
    }

    render() {

        const questions = this.props.lib.map((question, index) => {
            let image = null;

            if (question.image) {
                image = (
                    <CardText style={{
                        padding: 0,
                        margin: '16px 0',
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
                        <Checkbox key={`option${question._id}-${index}`}
                            value={`${index}`}
                            label={`${number}、${option}`}
                        />
                    );
                });
            } else {
                options = (
                    <RadioButtonGroup name={`question${question._id}`}>
                        {question.options.map((option, index) => {
                            const number = String.fromCharCode('A'.charCodeAt(0) + index);
                            return (
                                <RadioButton key={`option${question._id}-${index}`}
                                    value={`${index}`}
                                    label={`${number}、${option}`}
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
                    />
                    {image}
                    <CardActions style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        {options}
                    </CardActions>
                    <CardActions style={style.cardActions}>
                        <RaisedButton
                            label="编辑题目"
                            labelPosition="after"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            primary={true}
                            onClick={(event) => this.submit()}
                        />
                        <RaisedButton
                            label="删除题目"
                            labelPosition="after"
                            labelStyle={{
                                verticalAlign: 'middle',
                            }}
                            primary={true}
                            onClick={(event) => this.submit()}
                        />
                    </CardActions>
                </Card>
            );
        });

        return (
            <Paper style={style.container}>
                {questions}
                <Card style={style.card}>
                    <CardActions style={style.cardActions}>
                    <RaisedButton
                        label="新建单选题目"
                        labelPosition="after"
                        labelStyle={{
                            verticalAlign: 'middle',
                        }}
                        primary={true}
                        onClick={(event) => this.submit()}
                    />
                    <RaisedButton
                        label="新建多选题目"
                        labelPosition="after"
                        labelStyle={{
                            verticalAlign: 'middle',
                        }}
                        primary={true}
                        onClick={(event) => this.submit()}
                    />
                    </CardActions>
                </Card>
                <CreateQuestion />
            </Paper>
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(Lib);
