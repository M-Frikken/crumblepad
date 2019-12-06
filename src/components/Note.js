import React, { useState } from 'react';
import { IonLabel, IonItem, IonIcon, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';
import { timer, lock } from 'ionicons/icons';
import { timeLeft } from '../utils/time';
import { deleteNote } from '../store/Notes.actions';
import { connect } from 'react-redux';
import { SECONDS_IN_MS, MINUTE_IN_MS } from '../utils/time';

export const TEMPORARY = 'temporary';
export const PERMANENT = 'permanent';

export const TEMPORARY_NOTE_ID = -2;
export const PEMANENT_NOTE_ID = -1;

// in MS
export const expirationOptions = {
  0: {
    title: '10 seconds',
    val: SECONDS_IN_MS * 10,
  },
  1: {
    title: '20 seconds',
    1: SECONDS_IN_MS * 20,
  },
  2: {
    title: '1 minute',
    2: MINUTE_IN_MS,
  },
  3: {
    title: '2 minutes',
    3: MINUTE_IN_MS * 2,
  }
}

const mapDispatchToProps = dispatch => ({
  deleteNote: noteId => dispatch(deleteNote(noteId))
});

const Note = (props) => {
  const [expired] = useState(false);
  const {
    note: { id, type, title, expiresAt = new Date().getTime() },
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
          className={ `note ${expired ? 'expired' : ''}` }
          to={ `/note/${id}` }
        >
          <IonLabel>
            { `${ id } - ${ title } - ${ dateToShow() }` }
            { renderIcon() }
          </IonLabel>
        </Link>
        <IonButton onClick={ () => deleteNote(+id) }>
          <IonIcon slot="icon-only" name="contact" />
        </IonButton>
      </IonItem>
  );
};

export default connect(null, mapDispatchToProps)(Note);
