import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AppHeader from '../component/app-header.jsx';
import TestPause from '../component/TestPause.jsx';
import Question from '../component/question.jsx';


class Test extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppHeader />
                    <Paper style={{
                        width: '960px',
                        paddingTop: '68px',
                        margin: 'auto auto  68px',
                    }}>
                        <TestPause />
                        <Question questions={this.props.questions} />
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
