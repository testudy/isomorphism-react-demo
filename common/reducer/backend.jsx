import constants from '../constants.jsx';

const {
    CREATE_QUESTION_SUCCESS,
    FETCH_Lib_SUCCESS,
} = constants;

/**
 * Question
 * @param {Array} state 前Lib
 * @return {Array} Lib
 */
function question(state = {}, action) {
    if (action.type === CREATE_QUESTION_SUCCESS) {
        return Object.assign({}, action.question);
    }
    return state;
}

/**
 * Lib
 * @param {Array} state 前Lib
 * @return {Array} Lib
 */
function lib(state = [], action) {
    if (action.type === FETCH_Lib_SUCCESS) {
        return [...action.lib];
    }
    return state;
}

const reducers = {
    question,
    lib,
};

export default reducers;
