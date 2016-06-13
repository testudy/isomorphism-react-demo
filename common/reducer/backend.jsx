import constants from '../constants.jsx';

const {
    FETCH_Lib_SUCCESS,
} = constants;

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
    lib,
};

export default reducers;
