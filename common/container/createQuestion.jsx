import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
import Paper from 'material-ui/Paper';
import CreateQuestion from '../component/CreateQuestion.jsx';

import style from '../style';


class Lib extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Paper style={style.container}>
                <CreateQuestion />
            </Paper>
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(Lib);
