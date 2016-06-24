import React, {
    Component,
} from 'react';
import LinearProgress from 'material-ui/LinearProgress';


export default class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.progress();
    }

    progress() {
        const completed = this.props.questions.reduce((value, question) => {
            if (question.answer && question.answer.length > 0) {
                value += 1;
            }
            return value;
        }, 0) / this.props.questions.length;;
        this.setState({
            completed,
        });
    }

    render() {
        return (
            <LinearProgress mode="determinate"
                value={this.state.completed}
                max={1}
                style={{
                    borderRadius: 0,
                }}
            />
        );
    }

}
