import React from 'react';
import Note, { NoteType } from '../components/Note';
import { IonList } from '@ionic/react';

const NoteList: React.FC = () => {
  const notes: {[key:string]: NoteType} | {} = JSON.parse(localStorage.getItem('notes') || '{}');

  return (
    <IonList>
      { Object.values(notes).reverse().map(({ id, type, title, content }) => (
            <Note
              key={ id }
              type={ type }
              id={ id }
              title={ title }
              content={ content }
            />
          )
        )
      }
    </IonList>
  );
};

export default NoteList;
