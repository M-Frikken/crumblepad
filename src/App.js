import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import React from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebaseConfig from './components/firebase';
import Menu from './components/Menu';
import Router from './pages/Router';
import store from './store';
/* Theme variables */
import './theme/variables.css';





try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {}

const rrfProps = {
    firebase,
    config: {
        userProfile: "users"
    },
    dispatch: store.dispatch
}

const App = () => (
    <Provider store={ store }>
        <ReactReduxFirebaseProvider { ...rrfProps }>
            <IonApp>
                <IonReactRouter>
                    <Menu />
                    <Router />
                </IonReactRouter>
            </IonApp>
        </ReactReduxFirebaseProvider>
    </Provider>
);

export default App;
