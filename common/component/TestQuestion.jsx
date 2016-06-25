import React, {
    Component,
} from 'react';
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
import ActionSchedule from 'material-ui/svg-icons/action/schedule';


export default class TestQuestion extends Component {

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
                        <Checkbox key={`option${question._id}-${index}`}
                            disabled={this.props.done}
                            value={`${index}`}
                            label={`${number}、${option.text}`}
                            defaultChecked={question.answer && question.answer.indexOf(index) > -1}
                            onCheck={(event) => {
                                const answer = question.answer && [...question.answer] || [];
                                const indexOfAnswer = answer.indexOf(index);
                                if (event.target.checked) {
                                    if (indexOfAnswer === -1) {
                                        answer.push(index);
                                    }
                                } else {
                                    if (indexOfAnswer !== -1) {
                                        answer.splice(indexOfAnswer, 1);
                                    }
                                }
                                this.props.onSetAnswer(question._id, answer);
                            }}
                        />
                    );
                });
            } else {
                options = (
                    <RadioButtonGroup name={`question${question._id}`}
                        defaultSelected={`${question.answer && question.answer[0]}`}
                        onChange={(event, value) => {
                            const answer = [parseInt(value, 10)];
                            this.props.onSetAnswer(question._id, answer);
                        }}
                    >
                        {question.options.map((option, index) => {
                            const number = String.fromCharCode('A'.charCodeAt(0) + index);
                            return (
                                <RadioButton key={`option${question._id}-${index}`}
                                    disabled={this.props.done}
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
            <div>
                {questions}
            </div>
        );
    }

}
