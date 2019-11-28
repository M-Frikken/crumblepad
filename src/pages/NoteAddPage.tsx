import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonContent, IonRow, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';
import NoteInputs from '../components/NoteInputs';
import { checkmark } from 'ionicons/icons';

const NoteAddPage: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonRow>
                    <IonTitle>New Note</IonTitle>
                </IonRow>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <NoteInputs />
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color="orange">
                    <IonIcon icon={checkmark} />
                </IonFabButton>
            </IonFab>
        </IonContent>
      </IonPage>
    );
  };

export default NoteAddPage;
