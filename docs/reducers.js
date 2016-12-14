const Immutable = window.Immutable;

const VER = 16;

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

function getStored (key) {
    let item;
    try {
        item = window.localStorage.getItem(`${key}${VER}`);
        return JSON.parse(item);
    } catch (e) {
        // console.log(e, item);
    }
}

function store (result, key) {
    try {
        window.localStorage.setItem(`${key}${VER}`, JSON.stringify(result));
    } catch (e) {
        // console.log(e);
    }
}

window.initialInputState = () => Immutable.fromJS({
    taskId: null,
    progressState: getStored('progressState') || {
        start: Date.now(),
        user: null,
    },
    tasks: {},
});

// ADD_TASK
function addTask (state, value) {
    return state.withMutations((ctx) => {
        ctx.setIn(['tasks', value.id], value);

        // lets default if no state stored
        if (!ctx.getIn(['progressState', value.id])) {
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
        }

        return ctx;
    });
}

// SET_USER_INFO
function setUserInfo (state, value) {
    return state.setIn(['progressState', 'user'], value);
}

const taskDirection = ['task-1', 'task-2', 'task-3'];
function taskIsNotReady (state, value) {
    const shouldBeComplete = taskDirection.slice(0, taskDirection.indexOf(value));

    if (shouldBeComplete.length === 0) {
        return false;
    }

    const uncompleted = shouldBeComplete.filter((key) => {
        const start = state.getIn(['progressState', key, 'start']);
        const end = state.getIn(['progressState', key, 'stop']);
        return !(start && end);
    });

    if (uncompleted.length > 0) {
        return true;
    }

    return false;
}

// SHOW_TASK
function showTask (state, value) {
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

    let newState = state;

    switch (action.type) {
        case window.actions.ADD_TASK:
            newState = addTask(state, action.value);
            break;
        case window.actions.SET_USER_INFO:
            newState = setUserInfo(state, action.value);
            break;
        case window.actions.SHOW_TASK:
            newState = showTask(state, action.value);
            break;
        case window.actions.SHOW_NEXT_SUB_TASK:
            newState = showNextSubTask(state, action.value);
            break;
        case window.actions.SHOW_PREV_SUB_TASK:
            newState = showPrevSubTask(state, action.value);
            break;
        case window.actions.TASK_START:
            newState = setTaskStart(state, action.value);
            break;
        case window.actions.TASK_STOP:
            newState = setTaskStop(state, action.value);
            break;
        case window.actions.SHOW_HINT:
            newState = showHint(state, action.value);
            break;
    }

    if (newState.get('progressState') !== state.get('progressState')) {
        const data = newState.get('progressState').toJS();
        store(newState.get('progressState').toJS(), 'progressState');
        if (data.user) {
            console.log(data);
            try {
                window.fbApp.database()
                    .ref(`progress/${
                        data.user.displayName
                            .toLowerCase()
                            .replace(/\s+/gm, '_')
                            // .replace(/[æøå]/img, 'a')
                    }`)
                    .set(data);
            } catch (e) {

            }
        }
    }


    return newState;
};
