import { IonMenuButton, IonMenuToggle, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, timer, lock } from 'ionicons/icons';
import React from 'react';
import NoteList from '../components/NoteList';
import { Link } from 'react-router-dom';

const NoteListPage = () => {

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
      <IonHeader>
        <IonToolbar color="orange">
          <IonButtons slot="start">
            <IonMenuToggle><IonMenuButton></IonMenuButton></IonMenuToggle>
          </IonButtons>
          <IonTitle>
            All Notes
          </IonTitle>
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
