const React = window.React;
// const PropTypes = React.PropTypes;
// const Redux = window.Redux;
const ReactRedux = window.ReactRedux;
const connect = ReactRedux.connect;
const showdown  = window.showdown;
const converter = new showdown.Converter();
window.converter = converter;

const Markdown = ({ content }) => (
    <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
);

const User = ({ user }) => (
    <div>
        <div className="centerify r-margin profileimg">
            <img className="rounded-border r-mtm" src={user.photoURL} width="125" />
        </div>
        <p className="centerify">Hei, {user.displayName}!</p>
    </div>
);

const AppComponent = ({ user }) => (<div className="line">
    <div className="unit r-size2of3">
        <div className="mod shadow mtm">
            <div className="inner">
                <div className="bd">
                    <ContentContainer />
                </div>
            </div>
        </div>
    </div>
    <div className="unit r-size1of3">
        <Menu />
        { !user && <window.LoginComponent /> }
        { user &&  <User user={user} />}
    </div>
</div>);

window.App = connect((state) => ({
    user: state.getIn(['progressState', 'user']),
}))(AppComponent);

const Home = () => (
    <div>
        <h1>Welcome to the workshop</h1>
        <div className="mod green-skin mhl">
            <div className="inner">
                <div className="bd">
                    <p>Solutions are available on Github, but do not check them until afterwards.</p>
                </div>
            </div>
        </div>

        <div className="mod border-stone mhl">
            <div className="inner">
                <div className="bd bg-banana">
                    <h4>About hints</h4>
                    <p>We provide hints for each task, but hope you try to solve the task without them.
                    The user who uses fewest hints might get a reward.</p>
                </div>
            </div>
        </div>


        <div className="mod border-stone mhl">
            <div className="inner">
                <div className="bd">
                    <h4>Resources</h4>
                    <p>Node.js resources to be aware of:</p>
                    <ul className="bullets">
                        <li><a href="https://nodejs.org/dist/latest-v6.x/docs/api/" target="_blank">nodejs.org api docs</a></li>
                        <li><a href="https://www.npmjs.com/" target="_blank">npmjs.com/</a></li>
                        <li><a href="https://npms.io/" target="_blank">Search for modules npms.io/</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const Content = ({ contentId }) => (contentId === 'home' ? <Home /> : <Task />);

const ContentContainer = connect((state) => ({
    contentId: state.get('taskId') || 'home',
}))(Content);


class HidableImage extends React.Component {
    constructor (props) {
        super(props);

        this.state = { hidden: true };
        this.toggle = this.toggle.bind(this);
    }

    toggle () {
        this.setState({ hidden: !this.state.hidden });
    }

    render () {
        const { src } = this.props;
        return (
        <div className="pvm phl clickable" onClick={this.toggle}>
            {this.state.hidden ? <button className="small">Vis bilde</button> : <img className="pvm phl" src={src} />}
        </div>);
    }
}

const TaskComponent = ({
        notReady,
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
        hasUserName,
    }) => (
        hasUserName === false ?
        (<div>
            <h1>{task.title}</h1>
            <label>Please log in before starting:</label>
            <window.LoginComponent />
        </div>) :
        (<div>
        {(
            (!startTime && !stopTime) ||
            (startTime && stopTime)
        ) && <div>
            <h1>{task.title}</h1>
            <Markdown content={task.description} />
        </div>}

        {notReady && (
            <div className="mod green-skin mhl">
                <div className="inner">
                    <div className="bd">
                        <h3>This task is not ready</h3>
                        <p>Please complete previous task before starting "{task.title}".</p>
                    </div>
                </div>
            </div>)
        }

        {!notReady && !startTime && <p><button className="large primary" onClick={() => startTask(task.id)}>Start {task.title}</button></p>}
        {stopTime &&
            <div className="mod green-skin mam mhl">
            <div className="inner">
                <div className="bd">
                    <p>Task completed in {Math.round((stopTime - startTime) / 1000)} seconds</p>
                </div>
            </div>
        </div>}
        {startTime && subTask && (
            <div>
                <p>
                {<button className="" disabled={!canGoPrev} onClick={() => goPrevSubTask(task.id)}>Previous</button>}
                &nbsp;
                {canGoNext && <button className="primary fright" onClick={() => goNextSubTask(task.id)}>Show next</button>}
                {!canGoNext && <button className={stopTime ? 'fright' : ' fright order'} onClick={() => stopTask(task.id)}>Complete {task.title}</button>}
                </p>

                <h2><small>{task.title} /</small> {subTask.title}</h2>
                <hr />
                <div className="mbl">
                    <Markdown content={subTask.description} />
                    {subTask.steps && <ul className="bullets">
                        {subTask.steps.map((step, i) => (
                            <li key={i} className="mbm">
                                <Markdown content={step} />
                            </li>
                        ))}
                    </ul>}

                    {subTask.files && subTask.files.map((entry, i) => (
                        <p key={i}><a href={entry.path} target="_blank">Provided file: {entry.name}</a></p>
                    ))}

                    {subTask.image && <HidableImage src={subTask.image} />}
                </div>

                {subTask.hints && subTask.hints.length > 0 ?
                    <div className="mbl">
                        <h3>{subTask.hints.length} Hint{subTask.hints.length === 1 ? '' : 's'}</h3>
                        <hr />
                        <Hints hints={subTask.hints} parentId={task.id} id="hints" />
                    </div> :
                    null
                }

                {subTask.extras ? <div className="mbl">
                    <h3>Extra stuff to do:</h3>
                    <hr />
                    <Hints hints={subTask.extras} parentId={task.id} id="extras" />
                    </div> : null}

                    {subTask.solution && <p>Solution: {subTask.solution}</p>}

            </div>
        )}
    </div>)
);

const Task = connect((state) => {
    const id = state.get('taskId');
    const task = state.getIn(['tasks', id]);
    const subTaskId = state.getIn(['progressState', id, 'subTaskId']);
    const canGoPrev = subTaskId > 0;
    const canGoNext = (subTaskId + 1) < task.children.length;
    return {
        notReady: window.taskIsNotReady(state, id),
        hasUserName: !!state.getIn(['progressState', 'user']),
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

const Hint = ({ hint }) => {
    if (hint && hint.js) {
        return (<div>
            <h5>{hint.title}</h5>
            <pre className="language-javascript"><code className="language-javascript" dangerouslySetInnerHTML={{ __html: window.Prism.highlight(hint.js, window.Prism.languages.javascript) }} /></pre>
        </div>);
    }

    return <Markdown content={hint} />;
};

const HintsComponent = ({ hintIds, hints, subTaskId, id, showHint }) => (
    <div>
    <ul className="bullets">
        { hints.map((hint, i) => {
            const hintId = [subTaskId, id, i].join('__');
            return (<li key={i} className="mbm">
                {hintIds && hintIds[i] ?
                    <Hint hint={hint} /> :
                    <button className="small order" onClick={() => showHint(hintId)}>Show {hint.js ? 'code ' : ''}{id}</button>}
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
    <svg viewBox="0 0 124 64" className="mvm mhl" style={{ maxWidth: '250px' }}>
        <title>FINN.no</title>
        <path fill="#06bffc" d="M119.8 58V6c0-1-.8-1.9-1.9-1.9H66c-1 0-1.9.8-1.9 1.9v53.8H118c1 0 1.8-.8 1.8-1.8"/>
        <path fill="#0063fc" d="M22.5 4.2H6C5 4.2 4.2 5 4.2 6v52c0 1 .8 1.9 1.9 1.9H60V41.5C59.9 20.9 43.2 4.2 22.5 4.2"/>
        <path fill="#ffffff" d="M118 0H66c-3.3 0-6 2.7-6 6v17.4C53.2 9.6 38.9 0 22.5 0H6C2.7 0 0 2.7 0 6v52c0 3.3 2.7 6 6 6h112c3.3 0 6-2.7 6-6V6c0-3.3-2.7-6-6-6m1.8 58c0 1-.8 1.9-1.9 1.9H64.1V6c0-1 .8-1.9 1.9-1.9h52c1 0 1.9.8 1.9 1.9v52zM4.2 58V6C4.2 5 5 4.2 6 4.2h16.5c20.6 0 37.4 16.8 37.4 37.4v18.3H6c-1-.1-1.8-.9-1.8-1.9"/>
    </svg>
    <h2>Node.js Workshop</h2>

    <ol>
        <li>
            <a href="#home">Frontpage</a>
        </li>

        <li>
            <a href="https://docs.google.com/presentation/d/1IBXeQxZOrAQsXv4zXUOStNEDORhW3nyzMNrs9HY5yW0/edit?usp=sharing" target="_blank">
                Workshop slides
            </a>
        </li>
        <li>
            <a href="https://github.com/workshopper/learnyounode" target="_blank">
                Learn you node
            </a>
        </li>
    </ol>

    <h3>Tasks:</h3>
    <ol>
        {tasksList.map((task, i) => (
            <li key={i}>
                <div className="pam ptn fancyinput" style={{ borderBottom: '1px solid #bbb', display: 'block' }}>
                    <input type="checkbox" disabled checked={task.completed}/>
                    <label className="truncate blockify fancyinput-label ">
                        <a href={`#${task.id}`}>
                            {task.name}
                        </a>
                    </label>
                </div>

                {task.active && task.children.length > 0 &&
                    <ol className="pan man pvm">
                        {task.children.map((child, i2) => (<li key={i2} className="pll">
                            <div className="fancyinput">
                                <input type="checkbox" disabled checked={child.completed}/>
                                <label className="truncate blockify fancyinput-label ">{child.title}</label>
                            </div>
                        </li>))}
                    </ol>

                }
            </li>
        ))}
    </ol>

</div>
);

const Menu = connect((state) => ({
    tasksList: state.get('tasks').toArray()
    .map(entry => {
        const taskId = state.getIn(['taskId']);
        const done = state.getIn(['progressState', taskId, 'stop']);
        entry.active = entry.id === taskId;
        const subTaskId = state.getIn(['progressState', taskId, 'subTaskId']);

        if (entry.active) {
            entry.children.forEach((child, index) => {
                child.completed = done || index < subTaskId;
            });
        }
        entry.completed = state.getIn(['progressState', entry.id, 'stop']);
        return entry;
    }),
}))(MenuComponent);
