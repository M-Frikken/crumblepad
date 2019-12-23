/* eslint-disable react-hooks/exhaustive-deps */
import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Redirect, useParams } from 'react-router';
import { expirationOptions, PERMANENT, TEMPORARY } from '../components/Note';
import NoteInputs from '../components/NoteInputs';

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

    const uid = localStorage.getItem('uid');
    if (!uid) return <Redirect to='/login' />

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
