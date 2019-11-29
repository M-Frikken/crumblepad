import React from 'react';
import { IonLabel, IonItem, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';
import { timer, lock } from 'ionicons/icons';

export const TEMPORARY = 'temporary';
export const PERMANENT = 'permanent';

export type NoteType = {
  id?: number;
  type?: string;
  title?: string;
  content?: string;
}

const Note: React.FC<NoteType> = ({ id, type, title, content }) => {
  const addToCurrent = () => {
    localStorage.setItem('currentNote', JSON.stringify({
      type,
      title,
      content
    }));
  };

  const renderIcon = () => {
    return type === TEMPORARY
      ? <IonIcon icon={ timer } />
      : <IonIcon icon={ lock } />
  };

  return (
    <Link onClick={addToCurrent} className="note" to={ `/note/${id}` }>
      <IonItem>
        <IonLabel>
          { `${ id } - ${ title } - ` }
          { renderIcon() }
        </IonLabel>
      </IonItem>
    </Link>
  );
};

export default Note;
