import React, { useState, useEffect } from 'react';
import { IonLabel, IonItem, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';
import { timer, lock } from 'ionicons/icons';
import * as DB from '../utils/BrowserDB'
import { timeLeft } from '../utils/time';

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

export type NoteType = {
  id?: number;
  type?: string;
  title?: string;
  content?: string;
  expirationOption?: number;
  expiresAt?: number;
  expired?: boolean;
}

export type NoteListType =  { [key: string]: NoteType };

const Note: React.FC<NoteType> = note => {
  const [expired, setExpired] = useState<boolean>(false);
  const { id, type, title, expiresAt = new Date().getTime() } = note;

  const dateToShow = () => {
    if (type === PERMANENT) return 'NO';

    const timeToDestruction = timeLeft(expiresAt);
    return !timeToDestruction ? 'DESTROYED' : timeToDestruction;
  }

  useEffect(() => {
    if (
      type === TEMPORARY
      && (
        expiresAt
        && expiresAt <= new Date().getTime()
      )
    ) setExpired(true);
  });

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
