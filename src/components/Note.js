import React, { useState } from 'react';
import { IonLabel, IonItem, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';
import { timer, lock } from 'ionicons/icons';
import { timeLeft } from '../utils/time';
import * as DB from '../utils/BrowserDB';

export const TEMPORARY = 'temporary';
export const PERMANENT = 'permanent';

export const TEMPORARY_NOTE_ID = -2;
export const PEMANENT_NOTE_ID = -1;

// in MS
export const expirationOptions = {
  0: 1000 * 10, // 10 secs
  1: 1000 * 20, // 20 secs
  2: 1000 * 60, // 60 secs
  3: 1000 * 60 * 2, // 2 mins
}

const Note = note => {
  const [expired] = useState(false);
  const { id, type, title, expiresAt = new Date().getTime() } = note;

  const dateToShow = () => {
    if (type === PERMANENT) return 'NO';

    const timeToDestruction = timeLeft(expiresAt);
    return !timeToDestruction ? 'DESTROYED' : timeToDestruction;
  }

  const renderIcon = () => {
    return type === TEMPORARY
      ? <IonIcon icon={ timer } />
      : <IonIcon icon={ lock } />
  };

  return (
    <Link
      onClick={() => { DB.setCurrentNote({ ...note, expired }) } }
      className={ `note ${expired ? 'expired' : ''}` }
      to={ `/note/${id}` }
    >
      <IonItem>
        <IonLabel>
          { `${ id } - ${ title } - ${ dateToShow() }` }
          { renderIcon() }
        </IonLabel>
      </IonItem>
    </Link>
  );
};

export default Note;
