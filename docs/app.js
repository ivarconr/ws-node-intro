const React = window.React;
// const PropTypes = React.PropTypes;
// const Redux = window.Redux;
const ReactRedux = window.ReactRedux;
const connect = ReactRedux.connect;

window.App = () => (<div className="line">
    <div className="unit r-size2of3">
        <ContentContainer />
    </div>
    <div className="unit r-size1of3">
        <Menu />
    </div>
</div>);

const Home = () => (
    <div>
        <h1>Welcome to the workshop</h1>
        <p>This workshop has 2 parts.</p>
        <p>first 2 sessions with nodeschools, then 3 main tasks creating a chat application</p>
        <div className="mod green-skin mhl">
            <div className="inner">
                <div className="bd">
                    <p>Solutions are available on Github, but do not check them until afterwards.</p>
                </div>
            </div>
        </div>
    </div>
);

const Content = ({ contentId }) => (contentId === 'home' ? <Home /> : <Task />);

const ContentContainer = connect((state) => ({
    contentId: state.get('taskId') || 'home',
}))(Content);

const TaskComponent = ({
        task,
        startTask,
        stopTask,
        startTime,
        stopTime,
        subTask,
        canGoNext,
        canGoPrev,
        goNextSubTask,
        goPrevSubTask,
    }) => (
    <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>

        {!startTime && <p><button className="primary" onClick={() => startTask(task.id)}>Start</button></p>}
        {stopTime &&
            <div className="mod green-skin mhl">
            <div className="inner">
                <div className="bd">
                    <p>Task completed in {Math.round((stopTime - startTime) / 1000)} seconds</p>
                </div>
            </div>
        </div>}
        {startTime && subTask && (
            <div>
                <p>
                {canGoPrev && <button className="" onClick={() => goPrevSubTask(task.id)}>Previous</button>}
                &nbsp;
                {canGoNext && <button className="primary" onClick={() => goNextSubTask(task.id)}>Show next</button>}
                {!canGoNext && <button className="fright" onClick={() => stopTask(task.id)}>Complete task</button>}
                </p>

                <h2>{task.title} {subTask.title}</h2>
                <p>{subTask.description}</p>

                {subTask.steps && <ul className="bullets">
                    {subTask.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ul>}


                {subTask.files && subTask.files.map((entry, i) => (
                    <p key={i}><a href={entry.path} target="_blank">Provided file: {entry.name}</a></p>
                ))}

                {subTask.image && <img className="pvm phl" src={subTask.image} />}

                {subTask.hints && subTask.hints.length > 0 ?
                    <div>
                        <h4>Hints</h4>
                        <Hints hints={subTask.hints} parentId={task.id} id="hints" />
                    </div> :
                    null
                }

                {subTask.extras ? <div>
                    <h4>Extra stuff to do:</h4>
                    <Hints hints={subTask.extras} parentId={task.id} id="extras" />
                    </div> : null}

                    {subTask.solution && <p>Solution: {subTask.solution}</p>}

            </div>
        )}


    </div>
);

const Task = connect((state) => {
    const id = state.get('taskId');
    const task = state.getIn(['tasks', id]);
    const subTaskId = state.getIn(['progressState', id, 'subTaskId']);
    const canGoPrev = subTaskId > 0;
    const canGoNext = (subTaskId + 1) < task.children.length;
    return {
        task,
        startTime: state.getIn(['progressState', id, 'start']),
        stopTime: state.getIn(['progressState', id, 'stop']),
        canGoPrev,
        canGoNext,
        subTask: task.children[subTaskId],
    };
}, (dispatch) => ({
    goNextSubTask (value) {
        dispatch({
            type: window.actions.SHOW_NEXT_SUB_TASK,
            value,
        });
    },
    goPrevSubTask (value) {
        dispatch({
            type: window.actions.SHOW_PREV_SUB_TASK,
            value,
        });
    },
    startTask (value) {
        dispatch({
            type: window.actions.TASK_START,
            value,
        });
    },
    stopTask (value) {
        dispatch({
            type: window.actions.TASK_STOP,
            value,
        });
    },
}))(TaskComponent);

const HintsComponent = ({ hintIds, hints, subTaskId, id, showHint }) => (
    <div>
    <ul className="bullets">
        { hints.map((hint, i) => {
            const hintId = [subTaskId, id, i].join('__');
            return (<li key={i}>
                {hintIds && hintIds[i] ?
                    hint : <span className="link linkblock clickable" onClick={() => showHint(hintId)}>Show {id}</span>}
            </li>);
        }) }
    </ul>
    </div>
);

const Hints = connect((state, { id }) => {
    const taskId = state.getIn(['taskId']);
    const subTaskId = state.getIn(['progressState', taskId, 'subTaskId']);
    const subTaskStateId = [taskId, subTaskId].join('__');
    const hintIds = state.getIn([
        'progressState', taskId, 'subTasks', subTaskStateId, id,
    ]).toJS();
    return {
        subTaskId: subTaskStateId,
        hintIds,
    };
}, (dispatch) => ({
    showHint (value) {
        return dispatch({
            type: window.actions.SHOW_HINT,
            value,
        });
    },
}))(HintsComponent);

const MenuComponent = ({ tasksList }) => (<div>
    <svg viewBox="0 0 124 64" className="mvm mhl">
        <title>FINN.no</title>
        <path fill="#06bffc" d="M119.8 58V6c0-1-.8-1.9-1.9-1.9H66c-1 0-1.9.8-1.9 1.9v53.8H118c1 0 1.8-.8 1.8-1.8"/>
        <path fill="#0063fc" d="M22.5 4.2H6C5 4.2 4.2 5 4.2 6v52c0 1 .8 1.9 1.9 1.9H60V41.5C59.9 20.9 43.2 4.2 22.5 4.2"/>
        <path fill="#ffffff" d="M118 0H66c-3.3 0-6 2.7-6 6v17.4C53.2 9.6 38.9 0 22.5 0H6C2.7 0 0 2.7 0 6v52c0 3.3 2.7 6 6 6h112c3.3 0 6-2.7 6-6V6c0-3.3-2.7-6-6-6m1.8 58c0 1-.8 1.9-1.9 1.9H64.1V6c0-1 .8-1.9 1.9-1.9h52c1 0 1.9.8 1.9 1.9v52zM4.2 58V6C4.2 5 5 4.2 6 4.2h16.5c20.6 0 37.4 16.8 37.4 37.4v18.3H6c-1-.1-1.8-.9-1.8-1.9"/>
    </svg>
    <h2>FINN Node.js Workshop</h2>

    <ol>
        <li>
            <a href="#home">Frontpage</a>
        </li>

        <li>
            <a href="https://docs.google.com/presentation/d/1IBXeQxZOrAQsXv4zXUOStNEDORhW3nyzMNrs9HY5yW0/edit?usp=sharing" target="_blank">
                Workshop slides
            </a>
        </li>
    </ol>

    <h3>1) Nodeschools</h3>
    <ol>
        <li>
            <a href="https://github.com/workshopper/learnyounode" target="_blank">
                Learn you node
            </a>
        </li>
        <li>
            <a href="https://github.com/npm/how-to-npm" target="_blank">
                How to NPM
            </a>
        </li>
    </ol>

    <h3>2) Tasks:</h3>
    <ol>
        {tasksList.map((task, i) => (
            <li key={i}>
                <input type="checkbox" disabled checked={task.completed}/>&nbsp;
                <a href={`#${task.id}`}>{task.name}</a>
            </li>
        ))}
    </ol>

</div>
);

const Menu = connect((state) => ({
    tasksList: state.get('tasks').toArray()
    .map(entry => {
        entry.completed = state.getIn(['progressState', entry.id, 'stop']);
        return entry;
    }),
}))(MenuComponent);
