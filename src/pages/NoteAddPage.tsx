import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonContent, IonRow, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { useEffect } from 'react';
import NoteInputs from '../components/NoteInputs';
import { checkmark } from 'ionicons/icons';
import { Redirect } from 'react-router';

export interface NoteDetailsPageType {
    match: {
        params: {
            noteId: string;
        }
    }
}

const NoteAddPage: React.FC<NoteDetailsPageType> = ({ match }) => {
    const { noteId } = match.params || -1;
    const noteIdNum = +noteId;

    const allNotes = JSON.parse(localStorage.getItem('notes') || '{}');
    const currentNote = allNotes[noteIdNum] || { id: noteIdNum };

    const addNote = () => {
        const noteToAppend = JSON.parse(localStorage.getItem('currentNote') || '{}');
        if (noteIdNum >= 0) {
            localStorage.setItem('notes', JSON.stringify({
                ...allNotes,
                [noteIdNum]: {
                    ...noteToAppend,
                    id: noteIdNum
                }
            }));
            return;
        };

        if (Object.keys(noteToAppend).filter(key => key !== 'id' && key !== 'type' && noteToAppend[key] !== '').length) {
            const nextIndex = localStorage.getItem('nextIndex') || 0;
            const nextIndexInt = +nextIndex;
            const appendedNotes = { ...allNotes, [nextIndexInt]: { ...noteToAppend, id: nextIndexInt }};
            localStorage.setItem('notes', JSON.stringify(appendedNotes));
            localStorage.setItem('nextIndex', `${nextIndexInt + 1}`);
        }
    }

    const addNoteAndRedirect = () => {
        addNote();
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        return () => {
            addNote();
        };
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="orange">
                    <IonButtons onChange={addNote} onClick={addNote} slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonRow>
                        <IonTitle>New Note</IonTitle>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <NoteInputs note={ currentNote } />
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton color="orange">
                        <IonIcon onClick={addNoteAndRedirect} icon={checkmark} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
  };

export default NoteAddPage;
