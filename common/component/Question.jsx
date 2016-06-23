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


export default class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questions !== this.props.questions) {
            this.setState({
                questions: nextProps.questions,
            });
        }
    }

    render() {
        const questions = this.state.questions.map((question, index) => {
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
                            value={`${index}`}
                            label={`${number}、${option.text}`}
                            onCheck={(event) => {
                                if (!question.answers) {
                                    question.answers = [];
                                }
                                const indexOfAnswers = question.answers.indexOf(index);
                                if (event.target.checked) {
                                    if (indexOfAnswers === -1) {
                                        question.answers.push(index);
                                    }
                                } else {
                                    if (indexOfAnswers !== -1) {
                                        question.answers.splice(indexOfAnswers, 1);
                                    }
                                }
                            }}
                        />
                    );
                });
            } else {
                options = (
                    <RadioButtonGroup name={`question${question._id}`}
                        onChange={(event, value) => {
                            question.answers = [parseInt(value, 10)];
                        }}
                    >
                        {question.options.map((option, index) => {
                            const number = String.fromCharCode('A'.charCodeAt(0) + index);
                            return (
                                <RadioButton key={`option${question._id}-${index}`}
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
