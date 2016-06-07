import fetch from 'isomorphic-fetch';

import constants from './constants.jsx';

const {
    CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS,
    CREATE_TEST_FAILURE,
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
        }).then(response => response.json()).then((json) => {
            console.log(json);
            dispatch({
                type: CREATE_TEST_SUCCESS,
                questions: json
            });
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: CREATE_TEST_FAILURE,
            });
        });;
    };
}
