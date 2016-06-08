import constants from './constants.jsx';

const {
    SET_USER,
    CREATE_TEST_SUCCESS,
    FETCH_QUESTIONS_SUCCESS,
} = constants;

function user(state = {}, action) {
    if (action.type === SET_USER || action.type === CREATE_TEST_SUCCESS) {
        return Object.assign({}, action.user);
    }
    return state;
}


/**
 * 题目列表
 * @param {Array} state 前题目列表
 * @return {Array} 题目列表
 */
function questions(state = [], action) {
    if (action.type === FETCH_QUESTIONS_SUCCESS) {
        return [...action.questions];
    }
    return state;
}


const reducers = {
    user,
    questions,
};

export default reducers;
