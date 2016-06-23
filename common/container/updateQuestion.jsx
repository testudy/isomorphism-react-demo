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
    getQuestion,
    updateQuestion,
} from '../action/backend.jsx';


class UpdateQuestion extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(getQuestion(this.props.params.questionId));
    }


    submit(question) {
        this.props.dispatch(updateQuestion(Object.assign({
            _id: this.props.question._id,
        }, question)));
    }


    cancel() {
        this.props.dispatch(push('/backend/lib'));
    }


    render() {
        const question = this.props.question;
        return (
            <EditQuestion question={{
                    title: question.title,
                    image: question.image,
                    options: question.options,
                    multi: question.multi,
                }}
                submitLabel="保存修改"
                cancelLabel="放弃修改"
                onSubmit={(question) => this.submit(question)}
                onCancel={() => this.cancel()}
            />
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(UpdateQuestion);
