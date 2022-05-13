const redisCl = require('../config/redisConnect').RedisClient;
const StateManager = require('../utils/stateManager');

const startSession = async (userId) => {
    const userState = new StateManager(userId);
    await redisCl.set(userId, userState.getCurrentState());
    return await redisCl.get(userId);
}

const getUserState = async (userId) => {
    const state = await redisCl.get(userId);
    if (state) {
        return state;
    } else {
        return await startSession(userId);
    }
}

const setUserState = async (userId, state) => {
    // end user session if state is  goodbye
    if(state === "goodbye") {
        return await redisCl.del(userId)
    }
    const userState = new StateManager(userId);
    userState.setCurrentState(state);
    if(await redisCl.set(userId, userState.getCurrentState())) return true;
    return false;
}

module.exports = {
    getUserState,
    setUserState
}