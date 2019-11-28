import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, timer, lock } from 'ionicons/icons';
import React from 'react';
import NoteList from '../components/NoteList';

const NoteListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="orange">
          <IonTitle>All Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NoteList />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="orange">
            <IonIcon icon={add} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton href="/note/edit/new"><IonIcon icon={lock} /></IonFabButton>
            <IonFabButton href="/note/edit/new"><IonIcon icon={timer} /></IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default NoteListPage;
