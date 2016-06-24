import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TestHeader from '../component/TestHeader.jsx';
import TestQuestion from '../component/TestQuestion.jsx';

import {
    setTestAnswer,
    fetchQuestions,
} from '../action/frontend.jsx';


class Test extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(fetchQuestions(this.props.params.date, this.props.params.phone));
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <TestHeader />
                    <Paper style={{
                        width: '960px',
                        paddingTop: '68px',
                        margin: 'auto auto  68px',
                    }}>
                        <TestQuestion questions={this.props.test.questions}
                            onSetAnswer={(questionId, answer) => {
                                this.props.dispatch(setTestAnswer(questionId, answer));
                            }}
                        />
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(Test);
