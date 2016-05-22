import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


import React, {
    Component,
} from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppHeader from '../../common/component/app-header.jsx';
import Question from '../../common/component/question.jsx';

class App extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppHeader />
                    <Question />
                </div>
            </MuiThemeProvider>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
