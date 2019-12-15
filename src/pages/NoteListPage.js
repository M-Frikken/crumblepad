import { IonMenuButton, IonMenuToggle, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonButton } from '@ionic/react';
import { add, timer, lock } from 'ionicons/icons';
import React from 'react';
import NoteList from '../components/NoteList';
import { Link } from 'react-router-dom';
import { TEMPORARY, PERMANENT } from '../components/Note';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const NoteListPage = ({ history }) => {
  const firebase = useFirebase();
  const username = useSelector(state => state.firebase.profile.username)

  const renderButton = () => {
    return (
      <IonFabList side="top">
        <Link to={ `/note/${ PERMANENT }` }>
          <IonFabButton size="small"><IonIcon icon={ lock } /></IonFabButton>
        </Link>
        <Link to={ `/note/${ TEMPORARY }` }>
          <IonFabButton size="small"><IonIcon icon={ timer } /></IonFabButton>
        </Link>
      </IonFabList>
    )
  }

  const logout = () => {
    firebase.logout();
    history.push('/login');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="orange">
          <IonButtons slot="start">
            <IonMenuToggle><IonMenuButton></IonMenuButton></IonMenuToggle>
          </IonButtons>
          <IonTitle>
            Notes for { username }
          </IonTitle>
          <IonButton onClick={ logout } slot="end">
            Log out
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NoteList />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="orange">
            <IonIcon icon={ add } />
          </IonFabButton>
          { renderButton() }
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default NoteListPage;
