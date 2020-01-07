import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from '@ionic/react';
import { add, lock, timer } from 'ionicons/icons';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import NoteListArchive from '../components/NoteListArchive';
import PageHeader from '../components/PageHeader';

const ArchivePage = () => {
  const uid = localStorage.getItem('uid');
  if (!uid) return <Redirect to='/login' />

  return (
    <IonPage>
      <PageHeader title="Archive" />
      <IonContent>
        <NoteListArchive />
      </IonContent>
    </IonPage>
  );
};

export default ArchivePage;
