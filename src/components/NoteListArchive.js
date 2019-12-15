import React from 'react';
import Note from './Note';
import { IonList } from '@ionic/react';
import '../styles/NoteList.css';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';

const NoteList = () => {
  const currentUserId = useSelector(state => state.firebase.auth.uid);
  useFirebaseConnect([
    { path: 'notes', queryParams: [ 'orderByChild=updatedAt' ] }
    // { path: 'notes', queryParams: [ 'orderByChild=userId', `equalTo=${ currentUserId }`, 'orderByChild=updatedAt' ] }
  ]);
  const notes = useSelector(state => state.firebase.data.notes) || {};

  const expiredNotes = Object.entries(notes).reduce((acc, [key, note]) => (
    note.expired && note.userId === currentUserId
    ? { ...acc, [key]: note }
    : acc
  ), {});


  if (!Object.keys(expiredNotes).length) return <h4 className='empty' >Archive is empty...</h4>

  const renderAlert = () => (
    null
  );

  return (
    <IonList>
      { renderAlert() }
      { Object.entries(expiredNotes).reverse().map(([id, note]) => (
          <Note
            key={ id }
            note={ note }
            id={ id }
          />
        ))
      }
    </IonList>
  );
};

export default NoteList;
