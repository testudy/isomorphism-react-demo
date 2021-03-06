import constants from '../constants.jsx';

const {
    CREATE_QUESTION_SUCCESS,
    GET_QUESTION_SUCCESS,
    UPDATE_QUESTION_SUCCESS,
    REMOVE_QUESTION_SUCCESS,
    FETCH_Lib_SUCCESS,
    FETCH_REPORT_SUCCESS,
    SET_LIB_TYPE,
} = constants;

/**
 * Question
 * @param {Array} state 前Lib
 * @return {Array} Lib
 */
function question(state = {}, action) {
    if (action.type === GET_QUESTION_SUCCESS) {
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

    if (action.type === REMOVE_QUESTION_SUCCESS) {
        const index = state.findIndex((question) => {
            return question._id === action.questionId;
        });
        return [...state.slice(0, index), ...state.slice(index + 1)];
    }

    if (action.type === UPDATE_QUESTION_SUCCESS) {
        const index = state.findIndex((question) => {
            return question._id === action.question._id;
        });
        return [...state.slice(0, index), action.question, ...state.slice(index + 1)];
    }

    return state;
}

function tests(state = {}, action) {
    if (action.type === FETCH_REPORT_SUCCESS) {
        return Object.assign({}, state, action.tests);
    }
    return state;
}

function title() {
    return 'TEA素质测评系统后台';
}

function libType(state = 1, action) {
    if (action.type === SET_LIB_TYPE) {
        return action.libType;
    }
    return state;
}

const reducers = {
    title,
    question,
    lib,
    libType,
    tests
};

export default reducers;
