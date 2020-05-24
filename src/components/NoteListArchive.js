import React from 'react';
import Note from './Note';
import { IonList } from '@ionic/react';
import '../styles/NoteList.css';
import { useSelector } from 'react-redux';

const NoteList = () => {
  const uid = localStorage.getItem('uid');
  const allNotes = useSelector(({ firebase }) => firebase.data.notes) || {};
  const notes = allNotes[uid] || {};

  const expiredNotes = Object.entries(notes).reduce((acc, [key, note]) => (
    note.expired
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
