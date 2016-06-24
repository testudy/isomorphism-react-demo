import React, {
    Component,
    PropTypes,
} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import Dialog from 'material-ui/Dialog';


export default class TestAction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            completed: 0,
            countdown: '1:00',
        };
        this.countdown = 1 * 60;
        this.start = Date.now();
    }

    format(seconds) {
        let minutes = Math.floor(seconds / 60);

        seconds %= 60;

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    componentDidMount() {
        this.schedule = setInterval(() => {
            let diff = this.countdown - Math.round((Date.now() - this.start) / 1000);

            if (diff <= 0) {
                diff = 0;
                this.props.onSubmit();
                clearInterval(this.schedule);
            }
            this.setState({
                countdown: this.format(diff),
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.schedule);
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    handleDetermine() {
        this.props.onSubmit();
    }

    submit() {
        const completed = this.props.questions.reduce((value, question) => {
            if (question.answer && question.answer.length > 0) {
                value += 1;
            }

            return value;
        }, 0) / this.props.questions.length;

        if (completed !== 1) {
            this.setState({
                open: true,
                completed,
            });
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={() => this.handleClose()}
            />,
            <FlatButton
                label="提交"
                primary={true}
                onTouchTap={() => this.handleDetermine()}
            />,
        ];

        return (
            <div>
                <RaisedButton
                    label={`保存 ${this.state.countdown}`}
                    labelPosition="after"
                    labelStyle={{
                        verticalAlign: 'middle',
                    }}
                    primary={true}
                    icon={<ContentSave />}
                    onClick={() => this.submit()}
                />
                <Dialog
                    title="提交确定"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    答题完成率{Math.round(this.state.completed * 100)}%，确定提交吗？
                </Dialog>
            </div>
        );
    }
}

TestAction.propTypes = {
    questions: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
