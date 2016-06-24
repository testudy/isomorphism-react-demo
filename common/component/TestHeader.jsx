import React, {
    Component,
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
        return (
            <Paper style={{
                position: 'fixed',
                width: '100%',
                zIndex: '100',
            }}
                zDepth={2}
            >
                <TestProgress questions={this.props.questions} />
                <AppBar
                    title="TEA素质测评"
                    iconElementRight={<TestAction questions={this.props.questions} onSubmit={this.props.onSubmit} />}
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
