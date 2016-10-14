const React = window.React;
const ReactDOM = window.ReactDOM;
const firebase = window.firebase;

window.fbApp = firebase.initializeApp({
    apiKey: 'AIzaSyD2EHAw1D94bKzBaGlvsjJ5JeFiOo_aog8',
    authDomain: 'finn-workshop.firebaseapp.com',
    databaseURL: 'https://finn-workshop.firebaseio.com',
    storageBucket: 'finn-workshop.appspot.com',
    messagingSenderId: '443724460687',
});

const data = window.fbApp.database().ref('progress');

data.on('value', (snapshot) => {
    render(snapshot.val());
});

const App = ({ users, topHintUsers }) => (
    <div>

        <div className="line">
            <div className="unit size2of3">
                <h1>Stats</h1>
                <ul className="line cols2upto480 cols4upto768 cols6upto990">
                {users.map((user, i) => (
                    <li key={i} className="unit centerify" >
                        <img className="rounded-border r-mtm" src={user.user.photoURL} width="100" /><br />
                        <strong>{user.user.displayName}</strong><br />
                        {user.currentTask && <span> er på <strong>{user.currentTask}</strong> / <span style={{ color: 'blue' }}>{user.subTask}</span></span>}
                    </li>
                ))}
                </ul>
            </div>
            <div className="unit size1of3">
                <h1>Hints heroes</h1>
                <ol>
                {topHintUsers.map((user, i) => (
                    <li key={i}>
                        <strong>{user.user.displayName}</strong> {user.hintsUsed}
                    </li>
                ))}
                </ol>
            </div>
        </div>
    </div>
);

const allTasks = ['task-1', 'task-2', 'task-3'];

function render (snapshot) {
    const users = Object
        .keys(snapshot || {})
        .map(key => snapshot[key])
        .map(userState => {
            const tasks = allTasks.filter(key => {
                return !(userState[key] && userState[key].start && userState[key].stop);
            });

            if (tasks[0] && userState[tasks[0]].start) {
                userState.currentTask = tasks[0];
                userState.subTask = userState[tasks[0]].subTaskId + 1;
            }

            return userState;
        });

    const topHintUsers = users.map((user) => {
        let hintsUsed = 0;
        allTasks.forEach(taskId => {
            if (!user[taskId] || !user[taskId].subTasks) { return 0; }

            Object.keys(user[taskId].subTasks).forEach(subKey => {
                const hints =  user[taskId].subTasks[subKey].hints;
                if (hints) {
                    hintsUsed += Object.keys(hints).length;
                }
            });
        });
        user.hintsUsed = hintsUsed;
        return user;
    }).sort((userA, userB) => (userA.hintsUsed > userB.hintsUsed ? 1 : -1))
    .slice(0, 10);

    ReactDOM.render((<App users={users} topHintUsers={topHintUsers} />), document.getElementById('content'));
}
