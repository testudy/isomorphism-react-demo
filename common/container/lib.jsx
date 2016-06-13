import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';


class Lib extends Component {

    render() {
        return (
            <div>Lib</div>
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(Lib);
