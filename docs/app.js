const React = window.React;
const PropTypes = React.PropTypes;
const Redux = window.Redux;
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
        <p>This workshop has 2 parts, first 2 sessions with nodeschools, then 3 tasks creating a simple</p>
    </div>
);


const Preparations = () => (
    <div>
        <h1>Preparations</h1>
        <p>....</p>
    </div>
);

const Content = ({ contentId }) => {
    return (
        contentId === 'home' ? <Home /> :
        contentId === 'preperations' ? <Preparations /> :
        <Task />
    );
};
const ContentContainer = connect((state) => ({
    contentId: state.taskId || 'home'
}))(Content);

const TaskComponent = ({ task }) => (
    <div>
        <h1>{task.title}</h1>
        <p><strong>Description:</strong> {task.description}</p>
        {task.children.map((subTask, i) => (
            <div key={i}>
                <h2>{task.title} {subTask.title}</h2>
                <p>{subTask.description}</p>
                {subTask.steps && <ul className="bullets">
                    {subTask.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ul>}

                {subTask.image && <img className="pvm phl" src={subTask.image} />}

                {subTask.hints && subTask.hints.length > 0 ?
                    <div>
                        <h4>Hints</h4>
                        <Hints hints={subTask.hints} />
                    </div> :
                    null
                }

                {subTask.extras ? <div>
                    <h4>Extra stuff to do:</h4>
                    <Hints hints={subTask.extras} />
                    </div> : null}

                <p>Solution: {subTask.solution}</p>
            </div>
        ))}
    </div>
);

const Task = connect((state) => ({
    task: state.tasks[state.taskId]
}), (dispatch) => ({

}))(TaskComponent);

const HintsComponent = ({ hints }) => (
    <ul className="bullets">
        { hints.map((hint, i) => (
            <li key={i}>{i+1}: {hint}</li>
        )) }
    </ul>
);

const Hints = connect()(HintsComponent);

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
            <a href="#preperations">Preparations</a>
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
                <input type="checkbox" />&nbsp;
                <a href={"#" + task.id}>{task.name}</a>
            </li>
        ))}
    </ol>

</div>
)

const Menu = connect((state) => ({
    // log: console.log(state),
    tasksList: Object.keys(state.tasks).map(taskKey => state.tasks[taskKey]),
}))(MenuComponent);
