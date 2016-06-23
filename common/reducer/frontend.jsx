import constants from '../constants.jsx';

const {
    CREATE_TEST_SUCCESS,
    FETCH_TEST_SUCCESS,
} = constants;

function user(state = {}, action) {
    if (action.type === CREATE_TEST_SUCCESS) {
        return Object.assign({}, action.user);
    }
    return state;
}


/**
 * 当前测试
 * @param {Array} state 前题目列表
 * @return {Array} 题目列表
 */
function test(state = {questions: []}, action) {
    if (action.type === FETCH_TEST_SUCCESS) {
        return action.test;
    }
    return state;
}


const reducers = {
    user,
    test,
};

export default reducers;
