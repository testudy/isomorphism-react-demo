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
    REMOVE_QUESTION_REQUEST,
    REMOVE_QUESTION_SUCCESS,
    REMOVE_QUESTION_FAILURE,
    FETCH_Lib_REQUEST,
    FETCH_Lib_SUCCESS,
    FETCH_Lib_FAILURE,
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

        return fetch('/api/questions', {
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
