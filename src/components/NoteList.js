import React from 'react';
import Note from './Note';
import { IonList } from '@ionic/react';
import '../styles/NoteList.css';
import { useSelector } from 'react-redux';

const NoteList = () => {
  const notes = useSelector(state => state.notes.notes);

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
      { Object.values(activeNotes).reverse().map(note => (
          <Note
            key={ `${note.id}_${note.title}` }
            note={ note }
          />
        ))
      }
    </IonList>
  );
};

export default NoteList;
