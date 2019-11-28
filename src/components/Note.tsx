import React from 'react';
import { IonLabel, IonItem } from '@ionic/react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';

interface NoteType {
  id?: number;
  title?: string;
  content?: string;
}

const Note: React.FC<NoteType> = ({ id, title, content }) => (
  <Link className="note" to={ `/note/${id}` }>
    <IonItem>
      <IonLabel>
        { `${ id } - ${ title }` }
      </IonLabel>
    </IonItem>
  </Link>
);

export default Note;
