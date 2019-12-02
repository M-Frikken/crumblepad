import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, timer, lock } from 'ionicons/icons';
import React from 'react';
import NoteList from '../components/NoteList';

const NoteListPage = () => {
  function renderButton() {
    return (
      <IonFabList side="top">
        <IonFabButton href="/note/-1"><IonIcon icon={lock} /></IonFabButton>
        <IonFabButton href="/note/-2"><IonIcon icon={timer} /></IonFabButton>
      </IonFabList>
    )
  }

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
          { renderButton() }
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default NoteListPage;
