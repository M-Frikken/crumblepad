import { IonRouterOutlet, IonToast } from '@ionic/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import ArchivePage from './ArchivePage';
import LoginPage from './LoginPage';
import NoteAddPage from './NoteAddPage';
import NoteListPage from './NoteListPage';
import SettingsPage from './SettingsPage';
import RegisterPage from './RegisterPage';
import PremiumUsersPage from './PremiumUsersPage';
import { hideMessage } from '../store/Message.actions';

const Router = () => {
    const { message, isActive } = useSelector(({ message }) => message);
    const dispatch = useDispatch();

    return (
        <>
        <IonToast
            isOpen={ isActive }
            onDidDismiss={ () => dispatch(hideMessage()) }
            message={ message }
            duration={ 600 }
            position="top"
        />
        <IonRouterOutlet id="content">
            <Route path="/note/:noteId" component={ NoteAddPage } />
            <Route path="/premium/users" component={ PremiumUsersPage } />
            <Route path="/home" component={ NoteListPage } exact={ true } />
            <Route path="/register" component={ RegisterPage } exact={ true } />
            <Route path="/login" component={ LoginPage } exact={ true } />
            <Route path="/archive" component={ ArchivePage } exact={ true } />
            <Route path="/settings" component={ SettingsPage } exact={ true } />
            <Route path="/" component={() => <Redirect to="/home" />} exact={ true } />
            <Redirect to="/login" />
        </IonRouterOutlet>
        </>
    )
}

export default Router;