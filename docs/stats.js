const React = window.React;
const ReactDOM = window.ReactDOM;
const CircularProgressbar = window.CircularProgressbar.default;
const auth = window.auth;
const data = window.fbApp.database().ref('progress');

data.on('value', (snapshot) => {
    render(snapshot.val());
});

auth.onAuthStateChanged((user) => {
    if (!user) {
        renderToDOM({ users: [], topHintUsers: [] });
    }
});

const Stats = ({ users }) => (<div>
    <h1>Stats</h1>
        <hr />
        <ul className="line cols2upto480 cols4upto768 cols6upto990">
        {users.map((user, i) => (
            <li key={i} className="unit size1of6 centerify">
                <div style={{ position: 'relative' }} className="mhs">
                    <div style={{ position: 'absolute', left: '-1px', right: '-1px', top: '0', bottom: 0 }}>
                        <CircularProgressbar
                            strokeWidth={5}
                            initialAnimation
                            percentage={user.taskProgress || 0} />
                    </div>
                    <img className="rounded-border" src={user.user.photoURL} style={{
                        backgroundImage: `url(${user.user.photoURL})`,
                        backgroundRepeat: 'none',
                        backgroundSize: 'cover',
                        width: '100%',
                        height: 0,
                        paddingBottom: '100%',
                        objectFit: 'cover',
                    }}/><br />
                </div>
                <div style={{ height: '50px'/* todo use flex instead */ }}>
                <strong>{user.user.displayName}</strong><br />
                {user.currentTask && <span> er på <strong>{user.currentTask}</strong> / <span style={{ color: 'blue' }}>{user.subTask}</span></span>}
                </div>
            </li>
        ))}
        </ul>
    </div>);

const App = ({ users, topHintUsers }) => (
    <div className="mod bg-ice mtl">
        <div className="line ">
            <div className="unit size3of4">
                <div className="mod mrl">
                    <div className="inner">
                        <div className="bd">
                            <Stats users={users} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="unit size1of4">
                <div className="mod ">
                    <div className="inner bg-banana">
                        <div className="bd ">
                            <h1>Hints</h1>
                            <hr />
                            <dl className="multicol">
                            {topHintUsers.map((user, i) => (
                                <div key={i}>
                                    <dt>{user.user.displayName}</dt>
                                    <dd>{user.hintsUsed}</dd>
                                </div>
                            ))}
                            </dl>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <window.LoginComponent />
    </div>
);

const allTasks = ['task-1', 'task-2', 'task-3'];
const cHolders = [
    'sveinung.rosaker@gmail.com',
    'benjamin.lager@gmail.com',
    'ivarconr@gmail.com',
    'post@trygve-lie.com',
];

function render (snapshot) {
    const users = Object
        .keys(snapshot || {})
        .map(key => snapshot[key])
        .filter(state => !state || !state.user || !state.user.email || !cHolders.includes(state.user.email))
        .map(userState => {
            // remaining tasks that has not been completed
            const tasks = allTasks
                .filter(key => !(userState[key] && userState[key].start && userState[key].stop));

            if (tasks[0] && userState[tasks[0]].start) {
                userState.currentTask = tasks[0];
                userState.subTask = userState[tasks[0]].subTaskId + 1;
            }
            if (tasks.length === allTasks.length) {
                userState.taskProgress = 0;
            } else if (tasks.length === 0) {
                userState.taskProgress = 100;
            } else {
                const tasksLeft = allTasks.length - tasks.length;
                userState.taskProgress = (tasksLeft / allTasks.length * 100).toFixed(0);
            }
            return userState;
        });

    const topHintUsers = users.map((user) => {
        let hintsUsed = 0;
        allTasks.forEach(taskId => {
            if (!user[taskId] || !user[taskId].subTasks) { return 0; }

            Object.keys(user[taskId].subTasks).forEach(subKey => {
                const hints = user[taskId].subTasks[subKey].hints;
                if (hints) {
                    hintsUsed += Object.keys(hints).length;
                }
            });
        });
        user.hintsUsed = hintsUsed;
        return user;
    }).sort((userA, userB) => (userA.hintsUsed > userB.hintsUsed ? 1 : -1))
    .slice(0, 10);
    renderToDOM({ users, topHintUsers });
}


function renderToDOM ({ users, topHintUsers }) {
    ReactDOM.render((<App users={users} topHintUsers={topHintUsers} />), document.getElementById('content'));
}
