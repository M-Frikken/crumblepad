import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent } from '@ionic/react';
import React from 'react';
import NoteList from '../components/NoteList';

const NoteListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NoteList />
      </IonContent>
    </IonPage>
  );
};

export default NoteListPage;
