import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonContent, IonRow, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { useEffect } from 'react';
import NoteInputs from '../components/NoteInputs';
import { checkmark } from 'ionicons/icons';
import { PERMANENT, TEMPORARY, TEMPORARY_NOTE_ID, expirationOptions } from '../components/Note';
import * as DB from '../utils/BrowserDB';

export interface NoteDetailsPageType {
    match: {
        params: {
            noteId: string;
        }
    },
    history: {
        push: (path: string) => {}
    }
}

const NoteAddPage: React.FC<NoteDetailsPageType> = ({ match, history }) => {
    const { noteId } = match.params || TEMPORARY_NOTE_ID;

    useEffect(() => {
        const getCurrentNote = () => {
            if (+noteId > 0) return { ...DB.getCurrentNote(), id: noteId };

            if (+noteId === TEMPORARY_NOTE_ID) {
                const expirationOption = 2;
                const expiresAt =  new Date().getTime() + expirationOptions[expirationOption];
                return {
                    type: TEMPORARY,
                    expirationOption,
                    expiresAt
                };
            }

            return { type: PERMANENT };
        }

        DB.setCurrentNote(getCurrentNote());

        return () => {
            DB.createOrUpdateNoteFromCurrent();
            DB.setCurrentNote({});
        }
    }, []);

    const addNote = () => {
        console.log('addingNote');
        DB.createOrUpdateNoteFromCurrent();
    }

    const addNoteAndRedirect = () => {
        console.log('add and redirecting');
        addNote();
        history.push('/home');
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="orange">
                    <IonButtons onClick={addNote} slot="start">
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
                    <IonFabButton onClick={addNoteAndRedirect} color="orange">
                        <IonIcon icon={checkmark} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
  };

export default NoteAddPage;
