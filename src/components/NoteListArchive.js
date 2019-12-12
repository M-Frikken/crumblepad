import React from 'react';
import Note from './Note';
import { IonList } from '@ionic/react';
import '../styles/NoteList.css';
import { useSelector } from 'react-redux';

const NoteListArchive = () => {
  const notes = useSelector(state => state.notes.notes);

  const filteredNotes = Object.entries(notes).reduce((acc, [key, note]) => (
    note.expired
    ? { ...acc, [key]: note }
    : acc
  ), {});


  if (!Object.keys(filteredNotes).length) return <h4 className='empty' >Archive is empty...</h4>

  const renderAlert = () => (
    null
  );

  return (
    <IonList>
      { renderAlert() }
      { Object.values(filteredNotes).reverse().map(note => {
            return (
              <Note
                key={ `${note.id}_${note.title}` }
                note={ note }
              />
            );
          }
        )
      }
    </IonList>
  );
};

export default NoteListArchive;
