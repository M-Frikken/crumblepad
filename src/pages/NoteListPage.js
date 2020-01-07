import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add, lock, timer } from 'ionicons/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Link, Redirect } from 'react-router-dom';
import { PERMANENT, TEMPORARY } from '../components/Note';
import NoteList from '../components/NoteList';
import UpgradeToPremiumButton from '../components/UpgradeToPremiumButton';

const NoteListPage = ({ history }) => {
  const firebase = useFirebase();

  const { username } = useSelector(({ firebase }) => firebase.profile);
  const uid = localStorage.getItem('uid');
  if (!uid) return <Redirect to='/login' />

  const logout = () => {
    firebase.logout();
    localStorage.removeItem('uid');
    history.push('/login');
  }

  const renderButton = () => (
    <IonFabList side="top">
      <Link to={ `/note/${ PERMANENT }` }>
        <IonFabButton size="small"><IonIcon icon={ lock } /></IonFabButton>
      </Link>
      <Link to={ `/note/${ TEMPORARY }` }>
        <IonFabButton size="small"><IonIcon icon={ timer } /></IonFabButton>
      </Link>
    </IonFabList>
  );

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
          <IonButton color="secondary" onClick={ logout } slot="end">
            Log out
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NoteList />
        <UpgradeToPremiumButton show={ false } />
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
