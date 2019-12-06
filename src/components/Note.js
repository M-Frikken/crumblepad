import React, { useState } from 'react';
import { IonLabel, IonItem, IonIcon, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';
import { timer, lock } from 'ionicons/icons';
import { timeLeft } from '../utils/time';
import * as DB from '../utils/BrowserDB';
import { deleteNote } from '../store/Notes.actions';
import { connect } from 'react-redux';

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

const mapDispatchToProps = dispatch => ({
  deleteNote: noteId => dispatch(deleteNote(noteId))
});

const Note = (props) => {
  const [expired] = useState(false);
  const {
    note, note: { id, type, title, expiresAt = new Date().getTime() },
    deleteNote
  } = props;

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
      <IonItem>
        <Link
          onClick={() => { DB.setCurrentNote({ ...note, expired }) } }
          className={ `note ${expired ? 'expired' : ''}` }
          to={ `/note/${id}` }
        >
          <IonLabel>
            { `${ id } - ${ title } - ${ dateToShow() }` }
            { renderIcon() }
          </IonLabel>
        </Link>
        <IonButton onClick={ () => {console.log('deleting'); deleteNote(+id); }}>
          <IonIcon slot="icon-only" name="contact" />
        </IonButton>
      </IonItem>
  );
};

export default connect(null, mapDispatchToProps)(Note);
