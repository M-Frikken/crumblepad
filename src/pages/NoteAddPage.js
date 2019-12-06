import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonContent, IonRow, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import NoteInputs from '../components/NoteInputs';
import { checkmark } from 'ionicons/icons';
import { TEMPORARY_NOTE_ID, expirationOptions } from '../components/Note';
import { connect } from 'react-redux';
import { addNote, updateNote } from '../store/Notes.actions';
import * as DB from '../utils/BrowserDB';

const mapDispatchToProps = dispatch => ({
    addNote: note => dispatch(addNote(note)),
    updateNote: note => dispatch(updateNote(note))
});

const NoteAddPage = ({ match, history, addNote, updateNote }) => {
    const { noteId } = match.params || TEMPORARY_NOTE_ID;
    const [note, setNote] = useState(DB.getCurrentNote() || { id: +noteId })

    const emptyCurrentNote = () => {
        DB.removeCurrentNote();
        setNote({});
    }

    const cancel = () => {
        emptyCurrentNote();
        history.push('/home');
    }

    const addNoteAndRedirect = () => {
        const expirationOption = 1;
        const expiresAt =  new Date().getTime() + expirationOptions[expirationOption];
        const noteToAdd = {
            ...note,
            expirationOption,
            expiresAt
        };

        !('id' in noteToAdd) || noteToAdd.id < 0
        ? addNote(noteToAdd)
        : updateNote(noteToAdd);
        emptyCurrentNote();
        history.goBack();
    }

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

export default connect(null, mapDispatchToProps)(NoteAddPage);
