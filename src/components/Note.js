/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IonLabel, IonItem, IonIcon, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';
import { timer, lock } from 'ionicons/icons';
import { timeLeft } from '../utils/time';
import { deleteNote, updateNote } from '../store/Notes.actions';
import { connect } from 'react-redux';
import { SECONDS_IN_MS, MINUTE_IN_MS } from '../utils/time';

export const TEMPORARY = 'temporary';
export const PERMANENT = 'permanent';

export const TEMPORARY_NOTE_ID = -2;
export const PEMANENT_NOTE_ID = -1;

export const expirationOptions = {
  0: {
    title: '10 seconds',
    val: SECONDS_IN_MS * 10,
  },
  1: {
    title: '20 seconds',
    val: SECONDS_IN_MS * 20,
  },
  2: {
    title: '1 minute',
    val: MINUTE_IN_MS,
  },
  3: {
    title: '2 minutes',
    val: MINUTE_IN_MS * 2,
  }
}

const mapDispatchToProps = dispatch => ({
  deleteNote: noteId => dispatch(deleteNote(noteId)),
  updateNote: note => dispatch(updateNote(note))
});

const Note = (props) => {
  const {
    note, note: {
      id, type, title,
      expired: expiredInitial = false, expiresAt = new Date().getTime()
    },
    deleteNote, updateNote
  } = props;
  const [expired, setExpired] = useState(expiredInitial);

  const dateToShow = () => {
    if (type === PERMANENT) return 0;

    const timeToDestruction = timeLeft(expiresAt);
    if (!timeToDestruction) {
      setExpired(true);
      updateNote({ ...note, expired: true })
    }

    return timeToDestruction;
  }

  const [time, setTime] = useState(timeLeft(expiresAt));

  useEffect(() => {
    let interval;
    if (type === TEMPORARY && !expired) {
      interval = setInterval(() => setTime(dateToShow()), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [type, expired, expiresAt])

  const onLinkClick = (e) => {
    if (expired) e.preventDefault();
  }

  const renderIcon = () => {
    return type === TEMPORARY
      ? <IonIcon icon={ timer } />
      : <IonIcon icon={ lock } />
  };

  const renderLabel = () => {
    if (type === PERMANENT) return ` ${ title } `;

    return !expired
      ? ` ${ time } | ${ title } `
      : ` ${ title } `;
  }

  const renderDelete = () => {
    const actions = {
      DELETE: () => deleteNote(+id),
      UPDATE_TO_EXPIRED: () => {
        setExpired(true);
        updateNote({ ...note, expired: true });
      }
    };

    return (
      <IonButton onClick={ expired ? actions.DELETE : actions.UPDATE_TO_EXPIRED }>
        <ion-icon name="close"></ion-icon>
      </IonButton>
    )
  }

  return (
      <IonItem>
        <Link
          className="note"
          to={ `/note/${id}` }
          onClick={ onLinkClick }
        >
          <IonLabel>
            { renderIcon() }
            { renderLabel() }
          </IonLabel>
        </Link>
        { renderDelete() }
      </IonItem>
  );
};

export default connect(null, mapDispatchToProps)(Note);
