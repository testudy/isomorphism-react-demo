import React, {
    Component,
    PropTypes,
} from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import TestAction from './TestAction.jsx';
import TestProgress from './TestProgress.jsx';


export default class TestHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let progress = null;
        let action = null;
        if (!this.props.done) {
            progress = <TestProgress questions={this.props.questions} />;
            action = <TestAction questions={this.props.questions} onSubmit={this.props.onSubmit} />;
        }
        return (
            <Paper style={{
                position: 'fixed',
                width: '100%',
                zIndex: '100',
            }}
                zDepth={2}
            >
                {progress}
                <AppBar
                    title="TEA素质测评"
                    iconElementRight={action}
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

TestHeader.propTypes = {
    questions: PropTypes.array.isRequired,
};
