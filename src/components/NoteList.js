import React from 'react';
import Note from './Note';
import { IonList, IonItemDivider } from '@ionic/react';
import '../styles/NoteList.css';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const NoteList = () => {
  const uid = localStorage.getItem('uid');
  const isLoading = useSelector(({ firebase }) => firebase.requesting[`notes/${uid}`]);
  const { [uid]: notes = {} } = useSelector(({ firebase }) => firebase.data.notes) || {};

  const activeNotes = Object.entries(notes).reduce((acc, [key, note]) => (
    !('expired' in note) || !note.expired
    ? { ...acc, [key]: note }
    : acc
  ), {});

  if (isLoading) return <Loader />;

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
