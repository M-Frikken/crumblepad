import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from '@ionic/react';
import { add, lock, timer } from 'ionicons/icons';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import NoteListArchive from '../components/NoteListArchive';
import PageHeader from '../components/PageHeader';

const ArchivePage = () => {
  const uid = localStorage.getItem('uid');
  if (!uid) return <Redirect to='/login' />

  function renderButton() {
    return (
      <IonFabList side="top">
        <Link to="/note/-1">
          <IonFabButton size="small"><IonIcon icon={ lock } /></IonFabButton>
        </Link>
        <Link to="/note/-2">
          <IonFabButton size="small"><IonIcon icon={ timer } /></IonFabButton>
        </Link>
      </IonFabList>
    )
  }

  return (
    <IonPage>
      <PageHeader title="Archive" />
      <IonContent>
        <NoteListArchive />
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

export default ArchivePage;
