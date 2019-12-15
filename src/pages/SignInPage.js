/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonRow, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput } from '@ionic/react';
import { useFirebase } from 'react-redux-firebase';

const SignInPage = ({ history }) => {
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
            () => history.push('/home')
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
                        <IonTitle>Register</IonTitle>
                    </IonRow>
                    <IonButton onClick={ () => history.push('/login') } slot="end">
                        Login page
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                { renderError() }
                <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput value={ username } onInput={ e => setUsername(e.currentTarget.value) }></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput value={ email } onInput={ e => setEmail(e.currentTarget.value) }></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      value={ password }
                      type="password"
                      clearOnEdit={ false }
                      onInput={ e => setPassword(e.currentTarget.value) }>
                    </IonInput>
                </IonItem>
                <IonButton onClick={ buttonClick } color="orange">Login</IonButton>
            </IonContent>
        </IonPage>
    );
  };

export default SignInPage;
