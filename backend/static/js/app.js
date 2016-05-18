import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


import React, {
    Component,
} from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    RaisedButton,
} from 'material-ui';

class App extends Component {

    render() {
        return (<MuiThemeProvider muiTheme={getMuiTheme()}>
                <RaisedButton label="Default" />
            </MuiThemeProvider>);
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
