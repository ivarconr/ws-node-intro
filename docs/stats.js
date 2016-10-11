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
        <h1>Stats</h1>
        <ul>
        {users.map((user, i) => (
            <li key={i}>
                <strong>{user.userName}</strong> {user.currentTask && `er på ${user.currentTask} og på subtask ${user.subTask}`}
            </li>
        ))}
        </ul>
        <h2>Hints heroes</h2>
        <ol>
        {topHintUsers.map((user, i) => (
            <li key={i}>
                <strong>{user.userName}</strong> {user.hintsUsed}
            </li>
        ))}
        </ol>

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

            if (userState[tasks[0]].start) {
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
