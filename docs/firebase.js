const React = window.React;
const firebase = window.firebase;
const firebaseui = window.firebaseui;

window.fbApp = firebase.initializeApp({
    apiKey: 'AIzaSyD2EHAw1D94bKzBaGlvsjJ5JeFiOo_aog8',
    authDomain: 'finn-workshop.firebaseapp.com',
    databaseURL: 'https://finn-workshop.firebaseio.com',
    storageBucket: 'finn-workshop.appspot.com',
    messagingSenderId: '443724460687',
});

const auth = window.auth = firebase.auth();
const authUi = new firebaseui.auth.AuthUI(auth);

window.LoginComponent = React.createClass({
    componentDidMount () {
        const uiConfig = {
            callbacks: {
                signInSuccess: (user) => {
                    if (this.props.onSignIn) {
                        this.props.onSignIn(user);
                    }
                    return false;
                },
            },
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
        };
        authUi.start('#firebaseui-auth', uiConfig);
    },
    componentWillUnmount () {
        authUi.reset();
    },
    render () {
        return (
            <div id="firebaseui-auth"></div>
        );
    },
});
