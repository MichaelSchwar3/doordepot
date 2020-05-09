import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./components/App";

//test imports
import { signup, login, logout } from './actions/session_actions';


const Root = ({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);


document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let store;
    if (window.currentUser) {
        const preLoadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { currentUserId: window.currentUser.id }
        };
        store = configureStore(preLoadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    //Beginning of Testing
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.login = login;
    window.signup = signup;
    window.logout = logout;
    window.store = store;

    //End of Testing
    ReactDOM.render(<Root store={store} />, root);
});