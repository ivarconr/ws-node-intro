'use strict';

const Immutable = window.Immutable;

window.actions = {
    ADD_TASK: 'ADD_TASK',
    SET_USER_INFO: 'SET_USER_INFO', // - username
    SHOW_TASK: 'TASK_SHOW',
    TASK_START: 'TASK_START', // - taskId
    TASK_STOP: 'TASK_STOP', // - taskId
    SHOW_HINT: 'SHOW_HINT', // - taskId, hintId
};

window.initialInputState = () => Immutable.fromJS({
    userName: null,
    taskId: null,
    progressState: {
        /*
        learn-you-node,
        how-to-npm,
        task-1: {
            hint-id-1: true,
            startTime,
            stopTime,
        }
        */
    },
    tasks: {
        /* */
    },
});

// ADD_TASK
function addTask (state, value) {
    return state.withMutations((ctx) => {
        ctx.setIn(['tasks', value.id], value);
        ctx.setIn(['progressState', value.id], { hints: {}});
        return ctx;
    });
}

// SET_USER_INFO
function setUserInfo (state, value) {
    return state.set('userName', value);
}

function taskIsNotReady (state, value) {
    // check if previous state has been stopped
    // TODO
    return false;
}

// SHOW_TASK
function showTask (state, value) {
    if (taskIsNotReady(state, value)) {
        return state;
    }
    return state.set('taskId', value);
}


// TASK_START
function setTaskStart (state, value) {
    if (taskIsNotReady(state, value)) {
        return state;
    }
    return state.setIn(['progressState', value.id, 'start'], new Date());
}

// TASK_STOP
function setTaskStop (state, value) {
    if (taskIsNotReady(state, value)) {
        return state;
    }
    return state.setIn(['progressState', value.id, 'stop'], new Date());
}

// SHOW_HINT
function showHint (state, value) {
    const [id, hintId] = value.id.split('-');
    return state.setIn(['progressState', id, 'hint', hintId], true);
}

window.appStateReducer = (state = window.initialInputState(), action) => {
    if (!state) {
        throw new Error('Missing state');
    }
    switch (action.type) {
        case window.actions.ADD_TASK:
            return addTask(state, action.value);
        case window.actions.SET_USER_INFO:
            return setUserInfo(state, action.value);
        case window.actions.SHOW_TASK:
            return showTask(state, action.value);
        case window.actions.TASK_START:
            return setTaskStart(state, action.value);
        case window.actions.TASK_STOP:
            return setTaskStop(state, action.value);
        case window.actions.SHOW_HINT:
            return showHint(state, action.value);
        default:
            return state;
    }
};
