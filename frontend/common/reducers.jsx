import constants from './constants.jsx';

const {
    SET_USER,
    CREATE_TEST_SUCCESS,
} = constants;

const testQuestions = [
    {
        id: 1,
        title: '有人为了测试大猩猩聪明程度，特地在大猩猩面前放了一叠百元纸币和一部相机，请问猩猩会选哪个？',
        options: [
            '纸币',
            '相机',
            '两个都选',
            '都不选，找食物',
        ],
    },
    {
        id: 2,
        title: '用一支粉笔，在黑板上画一个正方形，最少需要几笔(每一笔不能拐弯)？',
        image: 'http://lorempixel.com/600/337/nature/?t=1',
        options: [
            '1',
            '2',
            '3',
            '4',
        ],
    },
    {
        id: 3,
        title: '唐僧最喜欢哪个女妖精，谁最知道？',
        options: [
            '孙悟空',
            '猪八戒',
            '沙和尚',
            '白龙马',
        ],
    },
    {
        id: 6,
        title: '如果我们叫张家为张户，李家为李户，那么我们不能这样称呼哪家呢？',
        image: 'http://lorempixel.com/600/337/nature/?t=2',
        options: [
            '马',
            '孙',
            '赵',
            '杨',
        ],
        multi: true,
    },
];

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
function questions(state = testQuestions) {
    return state;
}


const reducers = {
    user,
    questions,
};

export default reducers;
