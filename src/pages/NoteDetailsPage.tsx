import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { create } from 'ionicons/icons';
import React from 'react';
import NoteDetailedView from '../components/NoteDetailedView';

export interface NoteDetailsPageType {
    match: {
        params: {
            noteId: string;
        }
    }
}

const NoteDetailsPage: React.FC<NoteDetailsPageType> = ({ match }) => {
    const { noteId } = match.params;
    const noteIdNum = +noteId;
    return (
      <IonPage>
        <IonHeader>
            <IonToolbar color="orange">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>Note { noteId }</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <NoteDetailedView noteId={ noteIdNum } />
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color="orange">
                    <IonIcon icon={ create } />
                </IonFabButton>
            </IonFab>
        </IonContent>
      </IonPage>
    );
  };

export default NoteDetailsPage;
