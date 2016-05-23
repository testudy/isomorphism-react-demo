import React, {
    Component,
} from 'react';
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
import ActionSchedule from 'material-ui/svg-icons/action/schedule';


export default class Question extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const questions = this.props.questions.map((question, index) => {
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
                        <Checkbox key={`option${question.id}-${index}`}
                            value={`${index}`}
                            label={`${number}、${option}`}
                        />
                    );
                });
            } else {
                options = (
                    <RadioButtonGroup name={`question${question.id}`}>
                        {question.options.map((option, index) => {
                            const number = String.fromCharCode('A'.charCodeAt(0) + index);
                            return (
                                <RadioButton key={`option${question.id}-${index}`}
                                    value={`${index}`}
                                    label={`${number}、${option}`}
                                />
                            );
                        })}
                    </RadioButtonGroup>
                );
            }

            return (
                <Card key={`question${question.id}`} style={{
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
                </Card>
            );
        });
        return (
            <Paper style={{
                width: '960px',
                paddingTop: '68px',
                margin: 'auto auto  68px',
            }}>
                <Card style={{
                    padding: '16px',
                }}>
                    <CardText style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        <div style={{
                            textAlign: 'center',
                        }}>
                            <ActionSchedule style={{
                                width: 96,
                                height: 96,
                            }}/>
                        </div>
                    </CardText>
                </Card>
                <Card style={{
                    padding: '16px',
                }}>
                    <CardHeader
                        title="个人信息填写"
                        style={{
                            padding: 0,
                            margin: '0 0 16px 0',
                        }}
                    />
                    <CardText style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
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
                </Card>
                {questions}
            </Paper>
        );
    }

}
