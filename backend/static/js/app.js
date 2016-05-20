import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


import React, {
    Component,
} from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <AppBar
                    title="TEA评测系统"
                    onTitleTouchTap={this.handleTouchTap}
                    iconElementRight={<FlatButton label="OK" />}
                    onLeftIconButtonTouchTap={this.handleRightIconButtonTouchTap}
                />
            </MuiThemeProvider>
        );
    }

    handleTouchTap(e) {
        console.log(e);
        alert(e.type);
    }

    handleRightIconButtonTouchTap(e) {
        console.log(e);
        alert(e.type);
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
