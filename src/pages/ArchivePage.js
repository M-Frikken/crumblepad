import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
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
