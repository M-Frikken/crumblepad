import React from 'react';
import { IonLabel, IonItem } from '@ionic/react';
import { Link } from 'react-router-dom';

export interface NoteType {
  id?: number;
  title?: string;
  content?: string;
}

const Note: React.FC<NoteType> = ({ id, title, content }) => (
  <Link to={ `/note/${id}` }>
    <IonItem>
      <IonLabel>
        { `${ id } - ${ title }` }
      </IonLabel>
    </IonItem>
  </Link>
);

export default Note;
