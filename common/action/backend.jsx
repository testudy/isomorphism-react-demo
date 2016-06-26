import fetch from 'isomorphic-fetch';
import {
    push,
} from 'react-router-redux';

import constants from '../constants.jsx';
import uri from '../../util/uri';

const {
    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_FAILURE,
    GET_QUESTION_REQUEST,
    GET_QUESTION_SUCCESS,
    GET_QUESTION_FAILURE,
    UPDATE_QUESTION_REQUEST,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_FAILURE,
    REMOVE_QUESTION_REQUEST,
    REMOVE_QUESTION_SUCCESS,
    REMOVE_QUESTION_FAILURE,
    FETCH_Lib_REQUEST,
    FETCH_Lib_SUCCESS,
    FETCH_Lib_FAILURE,
    FETCH_REPORT_REQUEST,
    FETCH_REPORT_SUCCESS,
    FETCH_REPORT_FAILURE,
} = constants;


export function createQuestion(question) {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_QUESTION_REQUEST,
        });

        const body = new FormData();
        body.append('question', JSON.stringify(question));
        body.append('image', question.image);

        return fetch('/api/backend/question', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
            },
            body: body,
        }).then((response) => response.json()).then((json) => {
            dispatch({
                type: CREATE_QUESTION_SUCCESS,
                question: json,
            });
            dispatch(push('/backend/lib'));
        }).catch((error) => {
            dispatch({
                type: CREATE_QUESTION_FAILURE,
            });
        });

    };
}


export function getQuestion(questionId) {
    return (dispatch, getState) => {
        dispatch({
            type: GET_QUESTION_REQUEST,
        });

        const data = {
            questionId
        };

        return fetch('/api/backend/question?' + uri.param(data), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json()).then((json) => {
            dispatch({
                type: GET_QUESTION_SUCCESS,
                question: json.question,
            });
        }).catch((error) => {
            dispatch({
                type: GET_QUESTION_FAILURE,
            });
        });

    };
}


export function updateQuestion(patchQuestion) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_QUESTION_REQUEST,
        });

        const body = new FormData();
        body.append('question', JSON.stringify(patchQuestion));
        if (typeof patchQuestion.image !== 'string') {
            body.append('image', patchQuestion.image);
        }

        return fetch('/api/backend/question', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
            },
            body: body,
        }).then((response) => response.json()).then((json) => {
            dispatch({
                type: UPDATE_QUESTION_SUCCESS,
                question: json.question,
            });
            dispatch(push('/backend/lib'));
        }).catch((error) => {
            dispatch({
                type: UPDATE_QUESTION_FAILURE,
            });
        });

    };
}


export function removeQuestion(questionId) {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_QUESTION_REQUEST,
        });

        return fetch('/api/backend/question', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId
            }),
        }).then((response) => response.json()).then((json) => {
            dispatch({
                type: REMOVE_QUESTION_SUCCESS,
                questionId: json.questionId,
            });
        }).catch((error) => {
            dispatch({
                type: REMOVE_QUESTION_FAILURE,
            });
        });

    };
}


export function fetchLib() {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_Lib_REQUEST,
        });

        return fetch('/api/backend/questions', {
            headers: {
                'Accept': 'application/json',
            },
        }).then((response) => response.json()).then((json) => {
            dispatch({
                type: FETCH_Lib_SUCCESS,
                lib: json,
            });
        }).catch((errpr) => {
            dispatch({
                type: FETCH_Lib_FAILURE,
            });
        });
    };
}

export function fetchTests(date) {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_REPORT_REQUEST,
        });

        const data = {
            date,
        };

        return fetch('/api/tests?' + uri.param(data), {
            headers: {
                'Accept': 'application/json',
            },
        }).then((response) => response.json()).then((json) => {
            dispatch({
                type: FETCH_REPORT_SUCCESS,
                tests: {
                    [date]: json,
                },
            });
        }).catch((errpr) => {
            dispatch({
                type: FETCH_REPORT_FAILURE,
            });
        });
    };
}
