import fetch from 'isomorphic-fetch';
import {
    push,
} from 'react-router-redux';

import constants from '../constants.jsx';
import uri from '../../util/uri';

const {
    CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS,
    CREATE_TEST_FAILURE,
    FETCH_TEST_REQUEST,
    FETCH_TEST_SUCCESS,
    FETCH_TEST_FAILURE,
} = constants;

export function createTest(user) {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_TEST_REQUEST,
        });

        return fetch('/api/test', {
            method: 'PUT',
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
            dispatch(push(`/${json.date}/${json.phone}`));
        }).catch((error) => {
            dispatch({
                type: CREATE_TEST_FAILURE,
            });
        });
    };
}

export function fetchQuestions(date, phone) {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_TEST_REQUEST,
        });

        const data = {
            date,
            phone,
        };

        return fetch('/api/test?' + uri.param(data), {
            headers: {
                'Accept': 'application/json',
            },
        }).then((response) => response.json()).then((json) => {
            dispatch({
                type: FETCH_TEST_SUCCESS,
                test: json,
            });
        }).catch((errpr) => {
            dispatch({
                type: FETCH_TEST_FAILURE,
            });
            //dispatch(push(`/`));
        });
    };
}
