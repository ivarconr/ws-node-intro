const Immutable = window.Immutable;

window.actions = {
    ADD_TASK: 'ADD_TASK',
    SET_USER_INFO: 'SET_USER_INFO', // - username
    SHOW_TASK: 'SHOW_TASK',
    SHOW_NEXT_SUB_TASK: 'SHOW_NEXT_SUB_TASK',
    SHOW_PREV_SUB_TASK: 'SHOW_PREV_SUB_TASK',
    TASK_START: 'TASK_START', // - taskId
    TASK_STOP: 'TASK_STOP', // - taskId
    SHOW_HINT: 'SHOW_HINT', // - taskId, hintId
};

window.initialInputState = () => Immutable.fromJS({
    userName: null,
    taskId: null,
    progressState: {},
    tasks: {},
});

// ADD_TASK
function addTask (state, value) {
    return state.withMutations((ctx) => {
        ctx.setIn(['tasks', value.id], value);
        ctx.setIn(['progressState', value.id], Immutable.fromJS({
            start: null,
            stop: null,
            subTaskId: 0,
            subTasks: value.children.reduce((o, subTask, index) => {
                // MUTATE:
                subTask.id = [value.id, index].join('__');
                o[subTask.id] = {
                    start: null,
                    stop: null,
                    hints: {},
                    extras: {},
                };
                return o;
            }, {}),
        }));
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

// SHOW_NEXT_SUB_TASK
function showNextSubTask (state, value) {
    const index = state.getIn(['progressState', value, 'subTaskId']);
    return state.setIn(['progressState', value, 'subTaskId'], index + 1);
}

// SHOW_PREV_SUB_TASK
function showPrevSubTask (state, value) {
    const index = state.getIn(['progressState', value, 'subTaskId']);
    return state.setIn(['progressState', value, 'subTaskId'], index - 1);
}

// TASK_START
function setTaskStart (state, value) {
    if (taskIsNotReady(state, value)) {
        return state;
    }
    return state.setIn(['progressState', value, 'start'], Date.now());
}

// TASK_STOP
function setTaskStop (state, value) {
    if (taskIsNotReady(state, value)) {
        return state;
    }
    return state.setIn(['progressState', value, 'stop'], Date.now());
}

// SHOW_HINT
function showHint (state, value) {
    // oh gosh.....
    const [id, subTaskId, type, hintId] = value.split('__');
    return state.setIn(['progressState', id, 'subTasks', [id, subTaskId].join('__'), type, hintId], Date.now());
}

window.appStateReducer = (state = window.initialInputState(), action) => {
    if (!state) {
        throw new Error('Missing state');
    }

    // console.log(action.type, action.value, state.get('progressState').toJS());
    switch (action.type) {
        case window.actions.ADD_TASK:
            return addTask(state, action.value);
        case window.actions.SET_USER_INFO:
            return setUserInfo(state, action.value);
        case window.actions.SHOW_TASK:
            return showTask(state, action.value);
        case window.actions.SHOW_NEXT_SUB_TASK:
            return showNextSubTask(state, action.value);
        case window.actions.SHOW_PREV_SUB_TASK:
            return showPrevSubTask(state, action.value);
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
