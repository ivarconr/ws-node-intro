const React = window.React;
const ReactDOM = window.ReactDOM;
const App = window.App;
const Redux = window.Redux;
const ReactRedux = window.ReactRedux;
const createStore = Redux.createStore;
const Provider = ReactRedux.Provider;
const appStateReducer = window.appStateReducer;
const initialInputState = window.initialInputState;

window.tasks = (function () {
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

    function render () {
        ReactDOM.render((<Provider store={store}><App /></Provider>), document.getElementById('content'));
    }

    setTimeout(function init () {
        window.addEventListener('popstate', handleRoute);
        function handleRoute () {
            const key = toKey(parseHash(window.location.hash));
            if (key) {
                store.dispatch({
                    type: window.actions.SHOW_TASK,
                    value: key,
                });
            }
        }
        render();
        handleRoute();
    }, 0);

    return function register (taskName, task) {
        task.name = taskName;
        task.id = toKey(taskName);

        store.dispatch({
            type: window.actions.ADD_TASK,
            value: task,
        });
    };
})(window.nunjucks);
