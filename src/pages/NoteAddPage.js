/* eslint-disable react-hooks/exhaustive-deps */
import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonContent, IonRow, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import NoteInputs from '../components/NoteInputs';
import { checkmark } from 'ionicons/icons';
import { TEMPORARY_NOTE_ID, expirationOptions, TEMPORARY, PERMANENT } from '../components/Note';
import { connect } from 'react-redux';
import { addNote,  updateNote } from '../store/Notes.actions';

const mapStateToProps = state => ({
    notes: state.notes
})

const mapDispatchToProps = dispatch => ({
    addNote: note => dispatch(addNote(note)),
    updateNote: note => dispatch(updateNote(note))
});

const NoteAddPage = ({ match: { params, url }, history, notes, addNote, updateNote }) => {
    const [note, setNote] = useState({})

    useEffect(() => {
        const { noteId } = params || TEMPORARY_NOTE_ID;
        const type = +noteId === TEMPORARY_NOTE_ID ? TEMPORARY : PERMANENT;
        setNote(+noteId < 0 ? { id: +noteId, type } : notes[+noteId]);
    }, [url])

    const cancel = () => {
        history.push('/home');
    }

    const addNoteAndRedirect = () => {
        const temporaryNoteParams = {};
        if (note.type === TEMPORARY) {
            const { expirationOption = 0 } = note;
            const expiresAt =  new Date().getTime() + expirationOptions[expirationOption].val;
            temporaryNoteParams.expiresAt = expiresAt;
        }

        const newNote = {
            ...note,
            ...temporaryNoteParams
        };

        !('id' in newNote) || newNote.id < 0
        ? addNote(newNote)
        : updateNote(newNote);
        history.goBack();
    }

    // TODO: test feature
    if (note.type === TEMPORARY && note.expired) return history.push('/home');

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

export default connect(mapStateToProps, mapDispatchToProps)(NoteAddPage);
