/* eslint-disable react-hooks/exhaustive-deps */
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { setItem } from '../utils/BrowserDB';

const SignInPage = ({ history }) => {
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
                    <IonRow>
                        <IonTitle>Login</IonTitle>
                    </IonRow>
                    <IonButton className="ion-margin-end" color="secondary" onClick={ () => history.push('/signin') } slot="end">
                        Create Account
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
                <IonItem className="ion-no-margin" lines="none">
                    <IonButton className="ion-inner-padding ion-margin-top" size="default" onClick={ buttonClick } color="secondary">Log In</IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    );
  };

export default SignInPage;
