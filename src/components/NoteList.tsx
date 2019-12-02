import React, { useEffect } from 'react';
import Note, { TEMPORARY } from '../components/Note';
import { IonList } from '@ionic/react';
import { getNotes } from '../utils/BrowserDB';

const NoteList: React.FC = () => {
  const notes = getNotes();

  useEffect(() => {
    const timeOut = setInterval(() => {
      const expired = Object.values(notes).filter(({ type, expiresAt }) => (
        type === TEMPORARY
        && (expiresAt && expiresAt <= new Date().getTime())
      ));
      console.log(expired);
    }, 1000)
    return () => {
      clearInterval(timeOut);
    };
  });

  if (!Object.keys(notes).length) return <h3>Oops, no notes to crumble...</h3>

  return (
    <IonList>
      { Object.values(notes).reverse().map(note => {
            return (
              <Note
                key={ note.id }
                { ...note }
              />
            );
          }
        )
      }
    </IonList>
  );
};

export default NoteList;
