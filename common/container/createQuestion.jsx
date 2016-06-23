import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
import {
    push,
} from 'react-router-redux';

import EditQuestion from '../component/EditQuestion.jsx';
import {
    createQuestion,
} from '../action/backend.jsx';


class CreateQuestion extends Component {

    constructor(props) {
        super(props);
        this.initState();
    }


    initState() {
        this.state = {
            multi: !!parseInt(this.props.params.multi, 10),
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.params.multi !== this.props.params.multi) {
            this.setState({
                multi: !!parseInt(nextProps.params.multi, 10),
            });
        }
    }


    submit(question) {
        this.props.dispatch(createQuestion(question));
    }


    cancel() {
        this.props.dispatch(push('/backend/lib'));
    }


    render() {
        return (
            <EditQuestion question={{
                    multi: this.state.multi,
                }}
                submitLabel="保存题目"
                cancelLabel="放弃题目"
                onSubmit={(question) => this.submit(question)}
                onCancel={() => this.cancel()}
            />
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(CreateQuestion);
