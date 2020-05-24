/* eslint-disable react-hooks/exhaustive-deps */
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import '../styles/Header.css';
import { setItem } from '../utils/BrowserDB';

const RegisterPage = ({ history }) => {
    const firebase = useFirebase();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const buttonClick = () => {
        console.log(error, email, password, username);
        firebase.createUser(
            { email, password },
            { username, email }
        ).then(
            () => firebase.login(
                { email, password }
            )
            // () => history.push('/home')
        ).then(
            user => {
                console.log(user);
                setItem('uid', user.user.user.uid);
                history.push('/home')
            }
        ).catch(
            err => {
                setError(err.message);
            }
        );
    }

    const renderError = () => {
        if (!error) return null;
        return <p>{ error }</p>;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="orange">
                <IonTitle className="headerTitle">Register</IonTitle>
                    <IonButton className="login" onClick={ () => history.push('/login') } slot="end">
                        Login
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                { renderError() }
                <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput className="ion-margin-top" value={ username } onInput={ e => setUsername(e.currentTarget.value) }></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput className="ion-margin-top" value={ email } onInput={ e => setEmail(e.currentTarget.value) }></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={ password }
                      type="password"
                      clearOnEdit={ false }
                      onInput={ e => setPassword(e.currentTarget.value) }>
                    </IonInput>
                </IonItem>
                <IonButton
                  onClick={ buttonClick }
                  color="orange"
                  margin-start="10px"
                  margin-top="10px"
                >
                    Login
                </IonButton>
            </IonContent>
        </IonPage>
    );
  };

export default RegisterPage;
