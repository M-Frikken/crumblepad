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
    const [error, setError] = useState(null);

    const buttonClick = () => {
        firebase.login(
            { email, password }
        ).then(
            user => {
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
                    <IonTitle className="headerTitle">Login</IonTitle>
                    <IonButton className="register" onClick={ () => history.push('/register') } slot="end">
                        Register
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                { renderError() }
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
