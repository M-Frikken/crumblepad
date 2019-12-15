import { IonMenuButton, IonMenuToggle, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, timer, lock } from 'ionicons/icons';
import React from 'react';
import NoteListArchive from '../components/NoteListArchive';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ArchivePage = () => {
  const { isLoaded, isEmpty } = useSelector(({ firebase }) => firebase.profile);
  if (isLoaded && isEmpty) {
    return <Redirect to='/login'/>
  }

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
            Archive
          </IonTitle>
        </IonToolbar>
      </IonHeader>
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
