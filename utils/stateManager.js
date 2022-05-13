// state manager class
class StateManager {
    constructor(userId) {
        this.userId = userId;
        this.state = "start";
        this.stateTracker = {
            "start": true,
            "birthday": false,
            "days_to_birthday": false,
            "goodbye": false
        }
    }
    getCurrentState() {
        return this.state;
    }
    setCurrentState(state) {
        this.state = state;
        this.stateTracker[state] = true;
    }
}

module.exports = StateManager;