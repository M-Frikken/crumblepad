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
                    <IonButton className="ion-margin-end" color="secondary" onClick={ () => history.push('/login') } slot="end">
                        Log In
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
                <IonItem className="ion-no-margin" lines="none">
                    <IonButton className="ion-inner-padding ion-margin-top" onClick={ buttonClick } size="default" color="secondary">Register</IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    );
  };

export default SignInPage;
