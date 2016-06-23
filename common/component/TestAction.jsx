import React, {
    Component,
} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentSave from 'material-ui/svg-icons/content/save';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';

export default class TestAction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
            countdown: '30:00',
        };
        this.countdown = 30 * 60;
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
                clearInterval(this.schedule);
            }
            this.setState({
                countdown: this.format(diff),
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        clearInterval(this.schedule);
    }

    render() {
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
                />
            </div>
        );
    }
}
