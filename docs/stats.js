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

const App = ({ users }) => (
    <div>
        <h1>Stats</h1>
        <ul>
        {users.map((user, i) => (
            <li key={i}>
                <strong>{user.userName}</strong> {user.currentTask && `er på ${user.currentTask}`}
            </li>
        ))}
        </ul>
    </div>
);

function render (snapshot) {
    const users = Object
        .keys(snapshot)
        .map(key => snapshot[key])
        .map(obj => {
            const tasks = ['task-1', 'task-2', 'task-3'].filter(key => {
                return !(obj[key] && obj[key].start && obj[key].stop);
            });

            if (obj[tasks[0]].start) {
                obj.currentTask = tasks[0];
            }


            return obj;
        });


    ReactDOM.render((<App users={users} />), document.getElementById('content'));
}
