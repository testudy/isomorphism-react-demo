import constants from '../constants.jsx';

const {
    SET_TEST_ANSWER,
    CREATE_TEST_SUCCESS,
    FETCH_TEST_SUCCESS,
} = constants;

/**
 * 当前测试
 * @param {Array} state 前题目列表
 * @return {Array} 题目列表
 */
function test(state = {questions: [],}, action) {
    if (action.type === CREATE_TEST_SUCCESS) {
        return Object.assign({}, state, action.user);
    }

    if (action.type === FETCH_TEST_SUCCESS) {
        return action.test;
    }

    if (action.type === SET_TEST_ANSWER) {
        const index = state.questions.findIndex((question) => question._id === action.questionId);
        const newState = Object.assign({}, state);
        newState.questions[index].answer = action.answer;
        return newState;
    }

    return state;
}


const reducers = {
    test,
};

export default reducers;
