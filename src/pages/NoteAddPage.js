/* eslint-disable react-hooks/exhaustive-deps */
import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonContent, IonRow, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import NoteInputs from '../components/NoteInputs';
import { checkmark } from 'ionicons/icons';
import { expirationOptions, TEMPORARY, PERMANENT } from '../components/Note';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useParams } from 'react-router';

const NoteAddPage = ({ match: { url }, history }) => {
    const { noteId } = useParams() || TEMPORARY;
    const firebase = useFirebase();
    const notes = useSelector(state => state.firebase.data.notes);
    const userId = useSelector(state => state.firebase.auth.uid);

    const [note, setNote] = useState({})

    useEffect(() => {
        if (noteId === TEMPORARY || noteId === PERMANENT) setNote({ type: noteId })
        else setNote((notes && notes[noteId]) || {});
    }, [url])

    const cancel = () => {
        history.push('/home');
    }

    const addNoteAndRedirect = () => {
        const temporaryNoteParams = {};
        if (note.type === TEMPORARY) {
            const { expirationOption = 0 } = note;
            const expiresAt = new Date().getTime() + expirationOptions[expirationOption].val;
            temporaryNoteParams.expiresAt = expiresAt;
        }

        const newNote = {
            ...note,
            ...temporaryNoteParams,
            updatedAt: new Date().getTime(),
            userId
        };

        if (!newNote.title) {
            // TODO: notify user that note was exmpy
            if (!newNote.content) return history.push('/home');

            newNote.title = 'Untitled Note';
        }

        if (noteId === TEMPORARY || noteId === PERMANENT) {
            firebase.push('notes', newNote);
        } else {
            firebase.update(`notes/${noteId}`, newNote);
        }

        history.goBack();
    }

    if (
        // TODO: test
        (note.type === TEMPORARY && note.expired)
    ) return history.push('/home');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="orange">
                    <IonButtons slot="start">
                        <IonBackButton onClick={ cancel } defaultHref="/home" />
                    </IonButtons>
                    <IonRow>
                        <IonTitle>New Note</IonTitle>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <NoteInputs note={ note } setNote={ setNote } />
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={ addNoteAndRedirect } color="orange">
                        <IonIcon icon={ checkmark } />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
  };

export default NoteAddPage;
