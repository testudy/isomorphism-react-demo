import fetch from 'isomorphic-fetch';
import {
    push,
} from 'react-router-redux';

import constants from './constants.jsx';
import uri from '../util/uri';

const {
    SET_USER,
    CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS,
    CREATE_TEST_FAILURE,
    FETCH_QUESTIONS_REQUEST,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE,
} = constants;

export function setUser(name, phone) {
    return {
        type: SET_USER,
        user: {
            name,
            phone,
        },
    };
}

export function createTest() {
    return (dispatch, getState) => {
        const user = getState().user;

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
            dispatch({
                type: CREATE_TEST_SUCCESS,
                user: json,
            });
            dispatch(push(`/test/${json.date}/${json.phone}`));
        }).catch((error) => {
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

        return fetch('/api/questions?' + uri.param(user), {
            headers: {
                'Accept': 'application/json',
            },
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
