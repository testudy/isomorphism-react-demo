import fetch from 'isomorphic-fetch';
import {
    push,
} from 'react-router-redux';

import constants from '../constants.jsx';
import uri from '../../util/uri';

const {
    FETCH_Lib_REQUEST,
    FETCH_Lib_SUCCESS,
    FETCH_Lib_FAILURE,
} = constants;


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
