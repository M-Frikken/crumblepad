/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IonLabel, IonItem, IonIcon, IonButton, IonNote, IonTitle, IonItemDivider } from '@ionic/react';
import { Link } from 'react-router-dom';
import '../styles/Note.css';
import { timer, lock, pulse, close } from 'ionicons/icons';
import { timeLeft } from '../utils/time';
import { SECONDS_IN_MS, MINUTE_IN_MS } from '../utils/time';
import { useFirebase } from 'react-redux-firebase';

export const TEMPORARY = 'temporary';
export const PERMANENT = 'permanent';

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

const Note = (props) => {
  const uid = localStorage.getItem('uid');
  const firebase = useFirebase();

  const {
    note, note: {
      type, title, content,
      expired: expiredInitial = false, expiresAt = new Date().getTime()
    }, id
  } = props;
  const notePath = `notes/${ uid }/${ id }`;
  const [expired, setExpired] = useState(expiredInitial);

  const _dateToShow = () => {
    if (type === PERMANENT) return 0;

    const timeToDestruction = timeLeft(expiresAt);
    if (!timeToDestruction) {
      setExpired(true);
      firebase.update(notePath, { ...note, expired: true });
    }

    return timeToDestruction;
  }

  const [time, setTime] = useState(timeLeft(expiresAt));

  useEffect(() => {
    let interval;
    if (type === TEMPORARY && !expired) {
      interval = setInterval(() => setTime(_dateToShow()), 1000);
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
    var titleShort = title
    if (title.length > 50) titleShort = title.substring(0,47).concat("...");
    
    if (type === PERMANENT) return ` ${ titleShort } `;

    return !expired
      ? ` ${ time } | ${ titleShort } `
      : ` ${ titleShort } `;
  }

  const renderShort = () => {
    var text = content.substring(0,100);

    var lines = text.split("\n");
    text = "";
    for ( var i = 0; i < 4 && i < lines.length; i++ ) {
      text += lines[i];
      if ( i < 3 ) text += "\n";
    }

    if (content.length > 100) text = text.substring(0,97).concat("...");
    // text = "...";

    return ` ${ text } `;
  }

  const renderDeleteButton = () => {
    const actions = {
      DELETE: () => firebase.remove(notePath),
      UPDATE_TO_EXPIRED: () => {
        setExpired(true);
        firebase.update(notePath, {
          ...note,
          expired: true,
          updatedAt: new Date().getTime()
        });
      }
    };

    return (
      <IonButton color="secondary" slot="end" onClick={ expired ? actions.DELETE : actions.UPDATE_TO_EXPIRED }>
        <IonIcon icon={ close }></IonIcon>
      </IonButton>
    )
  }

  const renderRestoreButton = () => {
    if (!expired) return null;

    const restore = () => {
      setExpired(false);
      firebase.update(notePath, {
        ...note,
        expired: false,
        type: PERMANENT,
        updatedAt: new Date().getTime()
      });
    }

    return (
      <IonButton color="secondary" slot="end" onClick={ restore }>
        <IonIcon icon={ pulse }></IonIcon>
      </IonButton>
    )
  }

  return (
      <IonItemDivider class="ion-padding">
        <Link
          className="note"
          to={ `/note/${ id }` }
          onClick={ onLinkClick }
          style={{ color: '#222428', textDecoration: 'none' }}
        >
          <IonTitle class="ion-no-padding ion-padding-bottom">
            { renderIcon() }
            { renderLabel() }
          </IonTitle>
          <IonLabel style={{ whiteSpace: 'pre-line' }}>
            { renderShort() }
          </IonLabel>
        </Link>
          { renderRestoreButton() }
          { renderDeleteButton() }
      </IonItemDivider>
  );
};

export default Note;
