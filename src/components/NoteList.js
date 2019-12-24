import React from 'react';
import Note from './Note';
import { IonList } from '@ionic/react';
import '../styles/NoteList.css';
import { useSelector } from 'react-redux';

const NoteList = () => {
  const uid = localStorage.getItem('uid');
  const allNotes = useSelector(({ firebase }) => firebase.data.notes) || {};
  const notes = allNotes[uid] || {};

  const activeNotes = Object.entries(notes).reduce((acc, [key, note]) => (
    !('expired' in note) || !note.expired
    ? { ...acc, [key]: note }
    : acc
  ), {});

  if (!Object.keys(activeNotes).length) return <h4 className='empty' >Oops, no notes to crumble...</h4>

  return (
    <IonList>
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
