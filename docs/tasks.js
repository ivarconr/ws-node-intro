'use strict';
const React = window.React;
const ReactDOM = window.ReactDOM;

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<div className="line">
            <div className="unit r-size2of3">
                {!this.props.task.key ? <Home /> : <Task task={this.props.task} />}
            </div>
            <div className="unit r-size1of3">
                <Menu current={this.props.task.key} tasks={this.props.tasks} />
            </div>
        </div>)
    }
}

const Task = (props) => (
    <div>
        <h1>{props.task.title}</h1>
        <p><strong>Description:</strong> {props.task.description}</p>
        {props.task.children.map((subTask, i) => (
            <div key={i}>
                <h2>{props.task.title} {subTask.title}</h2>
                <p>{subTask.description}</p>

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
            </div>
        ))}
    </div>
)

const Hints = ({ hints }) => (
    <ol>
        { hints.map((hint, i) => (
            <li key={i}>{i+1}: {hint}</li>
        )) }
    </ol>
);


const Home = () => (
    <div>
        <h1>Welcome to the workshop</h1>
        <p>text....</p>
    </div>
);

const Menu = ({ tasks }) => (<div>
    <h2>Schedule</h2>
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
    <h4>Slides:</h4>
    <p>...</p>
    <h3>2) Tasks:</h3>
    <ol>
        <li>
            <a href="#home">Start</a>
        </li>
        {tasks.map((task, i) => (
            <li key={i}>
                <a href={"#" + task.key}>{task.name}</a>
            </li>
        ))}
    </ol>

    <h3>Preparations</h3>
    <ol>
        <li>
            <a href="#preperations">Preparations</a>
        </li>
    </ol>
</div>
)

window.tasks = (function () {
    var tasks = {
        home: {},
    };

    var taskList = [];

    function parseHash (hash) {
        return String(hash).replace(/^#/, '');
    }

    function toKey (k) {
        return String(k)
            .replace(/\s+/gm, '-')
            .toLowerCase();
    }

    function render (task, tasks) {
        var elem = document.getElementById('content');
        ReactDOM.render(<App task={task} tasks={tasks} />, elem);
    }

    setTimeout(function init () {
        window.addEventListener('popstate', handleRoute);
        function handleRoute () {
            var key = toKey(parseHash(window.location.hash));
            if (tasks[key]) {
                render(tasks[key], taskList);
            } else {
                render(tasks.home, taskList);
            }
        }
        handleRoute();
        console.log({ tasks: tasks })
    }, 0);

    return function register (taskName, taskSpec) {
        taskSpec.name = taskName;
        taskSpec.key = toKey(taskName);
        tasks[taskSpec.key] = taskSpec;
        taskList.push(taskSpec);
    };
})(window.nunjucks);
