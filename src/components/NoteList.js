import React from 'react';
import Note from './Note';
import { IonList } from '@ionic/react';
import '../styles/NoteList.css';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';

const NoteList = () => {
  useFirebaseConnect([
    { path: 'notes', queryParams: [ 'orderByChild=updatedAt' ] }
  ]);
  const notes = useSelector(state => state.firebase.data.notes) || {};

  const activeNotes = Object.entries(notes).reduce((acc, [key, note]) => (
    !('expired' in note) || !note.expired
    ? { ...acc, [key]: note }
    : acc
  ), {});

  if (!Object.keys(activeNotes).length) return <h4 className='empty' >Oops, no notes to crumble...</h4>

  const renderAlert = () => (
    null
  );

  return (
    <IonList>
      { renderAlert() }
      { Object.entries(activeNotes).reverse().map(([id, note]) => (
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
