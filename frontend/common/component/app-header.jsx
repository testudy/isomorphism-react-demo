import React, {
    Component,
} from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentSave from 'material-ui/svg-icons/content/save';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';


export default class AppHeader extends Component {

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
        this.timer = setTimeout(() => this.progress(5), 1000);
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

    progress(completed) {
        if (completed > 100) {
            this.setState({
                completed: 100,
            });
        } else {
            this.setState({
                completed,
            });

            const diff = Math.round(Math.random() * 10);

            this.timer = setTimeout(() => this.progress(completed + diff), 1000);
        }
    }

    render() {
        return (
            <Paper style={{
                position: 'fixed',
                width: '100%',
                zIndex: '100',
            }}
                zDepth={2}
            >
                <LinearProgress mode="determinate"
                    value={this.state.completed}
                    style={{
                        borderRadius: 0,
                    }}
                />
                <AppBar
                    title="TEA素质测评"
                    iconElementRight={
                        <div>
                            <RaisedButton
                                label="开始"
                                labelPosition="after"
                                labelStyle={{
                                    verticalAlign: 'middle',
                                }}
                                primary={true}
                                icon={<ContentSend />}
                            />
                            <RaisedButton
                                label={this.state.countdown}
                                labelPosition="after"
                                labelStyle={{
                                    verticalAlign: 'middle',
                                }}
                                primary={true}
                                icon={<ActionSchedule />}
                            />
                            <RaisedButton
                                label="继续"
                                labelPosition="after"
                                labelStyle={{
                                    verticalAlign: 'middle',
                                }}
                                primary={true}
                                icon={<ContentSend />}
                            />
                            <RaisedButton
                                label="保存"
                                labelPosition="after"
                                labelStyle={{
                                    verticalAlign: 'middle',
                                }}
                                primary={true}
                                icon={<ContentSave />}
                            />
                        </div>
                    }
                    iconStyleRight={{
                        marginTop: 0,
                        marginRight: 0,
                        alignSelf: 'center',
                    }}
                    showMenuIconButton={false}
                />
            </Paper>
        );
    }

}
