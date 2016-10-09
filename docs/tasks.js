'use strict';
const ReactDOM = window.ReactDOM;
const App = window.App;
const Redux = window.Redux;
const createStore = Redux.createStore;
const Provider = ReactRedux.Provider;

const actions = {
    'ADD_TASK': 'ADD_TASK',
    'SET_USER_INFO': 'SET_USER_INFO', // - username
    'SHOW_TASK': 'TASK_SHOW',
    'TASK_START': 'TASK_START', // - taskId
    'TASK_STOP': 'TASK_STOP', //- taskId
    'SHOW_HINT': 'SHOW_HINT', // - taskId, hintId
};

const initialInputState = (tasks) => {
    return {
        userName: null,
        taskId: null,
        taskState: {

        },
        tasks: {
            /* */
        }
    };
}


// ADD_TASK
function addTask(state, value) {
    const newTaskMap = Object.assign({}, state.tasks);
    newTaskMap[value.id] = value;
    return Object.assign({}, state, { tasks: newTaskMap });
}

// SET_USER_INFO
function setUserInfo (state, value) {
    return Object.assign({}, state, { userName: value });
}

// SHOW_TASK
function showTask (state, value) {
    return Object.assign({}, state, { taskId: value });
}

// TASK_START
function setTaskStart (state, value) {
    return Object.assign({}, state, { taskId: value });
}

// TASK_STOP
function setTaskStop (state, value) {
    return Object.assign({}, state, { taskId: value });
}

// SHOW_HINT
function showHint(state, value) {
    return Object.assign({}, state, { taskId: value });
}

const appStateReducer = function (state = initialInputState(), action) {
    if (!state) {
        throw new Error('Missing state');
    }
    switch (action.type) {
        case actions.ADD_TASK:
            return addTask(state, action.value);
        case actions.SET_USER_INFO:
            return setUserInfo(state, action.value);
        case actions.SHOW_TASK:
            return showTask(state, action.value);
        case actions.TASK_START:
            return setTaskStart(state, action.value);
        case actions.TASK_STOP:
            return setTaskStop(state, action.value);
        case actions.SHOW_HINT:
            return showHint(state, action.value);
        default:
            return state;
    }
};

window.tasks = (function () {

    const taskList = [];

    function parseHash (hash) {
        return String(hash).replace(/^#/, '');
    }

    function toKey (k) {
        return String(k)
            .replace(/\s+/gm, '-')
            .toLowerCase();
    }

    const store = createStore(
        appStateReducer,
        initialInputState(),
        window.devToolsExtension ? window.devToolsExtension() : undefined
    );

    function render (task, tasks) {
        const elem = document.getElementById('content');
        ReactDOM.render((<Provider store={store}><App /></Provider>), elem);
    }

    setTimeout(function init () {
        window.addEventListener('popstate', handleRoute);
        function handleRoute () {
            const key = toKey(parseHash(window.location.hash));
            if (key) {
                // render(tasks[key], taskList);
                store.dispatch({
                    type: actions.SHOW_TASK,
                    value: key,
                });
            }
        }
        render(tasks.home, taskList);
        handleRoute();
        // console.log({ tasks: tasks })
    }, 0);

    return function register (taskName, task) {
        task.name = taskName;
        task.id = toKey(taskName);
        // tasks[taskSpec.key] = taskSpec;
        // taskList.push(taskSpec);
        store.dispatch({
            type: actions.ADD_TASK,
            value: task
        });


    };
})(window.nunjucks);
