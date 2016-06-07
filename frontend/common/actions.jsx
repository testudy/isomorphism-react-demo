import fetch from 'isomorphic-fetch';
import {
    push,
} from 'react-router-redux';

import constants from './constants.jsx';

const {
    CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS,
    CREATE_TEST_FAILURE,
    FETCH_QUESTIONS_REQUEST,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE,
} = constants;

export function createTest() {
    return (dispatch, getState) => {
        //const user = getState().user;
        const user = {
            name: 'test',
            phone: '18610519178',
        };

        dispatch({
            type: CREATE_TEST_REQUEST,
        });

        return fetch('/api/test', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((response) => response.json()).then((json) => {
            console.log(json);
            dispatch({
                type: CREATE_TEST_SUCCESS,
                user: json,
            });
            dispatch(push(`/test/${json.date}/${json.phone}`));
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: CREATE_TEST_FAILURE,
            });
        });
    };
}

export function fetchQuestions() {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_QUESTIONS_REQUEST,
        });

        const user = getState().user;

        return fetch('/api/questions', {
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((response) => response.json()).then((json) => {
            dispatch({
                type: FETCH_QUESTIONS_SUCCESS,
                questions: json,
            });
        }).catch((errpr) => {
            dispatch({
                type: FETCH_QUESTIONS_FAILURE,
            });
        });
    };
}
