/* eslint-disable react-hooks/exhaustive-deps */
import { IonButton, IonIcon, IonItemDivider, IonLabel, IonTitle } from '@ionic/react';
import { closeCircle, lock, timer, trash, undo } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import '../styles/Note.css';
import { DAY_IN_MS, HOUR_IN_MS, MINUTE_IN_MS, SECOND_IN_MS, timeLeft } from '../utils/time';

export const TEMPORARY = 'temporary';
export const PERMANENT = 'permanent';

export const expirationOptions = {
  0: {
    title: '30 seconds',
    val: SECOND_IN_MS * 30,
  },
  1: {
    title: '15 minutes',
    val: MINUTE_IN_MS * 15,
  },
  // 2: {
  //   title: '1 hour',
  //   val: HOUR_IN_MS,
  // },
  // 3: {
  //   title: '1 day',
  //   val: DAY_IN_MS,
  // },
  // 4: {
  //   title: '1 week',
  //   val: DAY_IN_MS * 7,
  // },
  // 5: {
  //   title: '1 month',
  //   val: DAY_IN_MS * 30,
  // },
  2: {
    title: '1 year',
    val: DAY_IN_MS * 30 * 12,
  }
}

const Note = (props) => {
  const uid = localStorage.getItem('uid');
  const firebase = useFirebase();

  const {
    note, note: {
      type, title, content = "",
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

  const renderIcon = () => {
    return type === TEMPORARY
      ? <IonIcon icon={ timer } />
      : <IonIcon icon={ lock } />
  };

  const renderLabel = () => {
    let titleShort = title
    if (title.length > 50) titleShort = title.substring(0,47).concat("...");

    if (type === PERMANENT) return ` ${ titleShort } `;

    return !expired
      ? ` ${ time } | ${ titleShort } `
      : ` ${ titleShort } `;
  }

  const renderShort = () => {
    let text = content.substring(0,100);

    let lines = text.split("\n");
    text = "";
    for ( let i = 0; i < 4 && i < lines.length; i++ ) {
      text += lines[i];
      if ( i < 3 ) text += "\n";
    }

    if (content.length > 100) text = text.substring(0,97).concat("...");

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
      <IonButton className="ion-no-margin ion-margin-start" color="secondary" slot="end" onClick={ expired ? actions.DELETE : actions.UPDATE_TO_EXPIRED }>
        <IonIcon icon={ expired ? closeCircle : trash }></IonIcon>
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
      <IonButton className="ion-no-margin" color="secondary" slot="end" onClick={ restore }>
        <IonIcon icon={ undo }></IonIcon>
      </IonButton>
    )
  }

  return (
      <IonItemDivider className="ion-padding">
        <Link
          className="note"
          to={ `/note/${ id }` }
          style={{ color: '#222428', textDecoration: 'none' }}
        >
          <IonTitle className="ion-no-padding ion-padding-bottom">
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
