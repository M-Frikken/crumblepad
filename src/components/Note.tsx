import React from 'react';
import { IonLabel, IonItem, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';
import { timer, lock } from 'ionicons/icons';
import * as DB from '../utils/BrowserDB'
import { timeLeft, isExpired } from '../utils/time';

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
}

export type NoteListType =  { [key: string]: NoteType };

const Note: React.FC<NoteType> = note => {
  const { id, type, title, expiresAt } = note;

  const dateToShow = () => {
    if (type === PERMANENT) return 'NO';
    if (!expiresAt) return 'no dateTill';

    const timeToDestruction = timeLeft(expiresAt);
    return !timeToDestruction ? 'DESTROYED' : timeToDestruction }

  const renderIcon = () => {
    return type === TEMPORARY
      ? <IonIcon icon={ timer } />
      : <IonIcon icon={ lock } />
  };

  return (
    <Link
      onClick={() => { DB.setCurrentNote(note) } }
      className="note"
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
