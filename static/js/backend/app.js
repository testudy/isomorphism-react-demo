import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


import React, {
    Component,
} from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppMenu from '../../../common/component/app-menu.jsx';
import Report from '../../../common/component/report.jsx';

class App extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppMenu />
                    <Report />
                </div>
            </MuiThemeProvider>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
