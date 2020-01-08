/* eslint-disable react-hooks/exhaustive-deps */
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonIcon, IonItem, IonLabel, IonPage, IonReorder, IonReorderGroup } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import ExpirationTimePicker from '../components/ExpirationTimePicker';
import Loader from '../components/Loader';
import { expirationOptions as defaultExpirationOptions } from '../components/Note';
import PageHeader from '../components/PageHeader';
import { timeLeft } from '../utils/time';

const usePageHook = (currentPath, targetPath) => {
  const [isOnSettingsPage, setIsOnSettingsPage] = useState(true);

  useEffect(() => {
    if (currentPath === targetPath) {
      setIsOnSettingsPage(true);
    }
    else setIsOnSettingsPage(false);
  }, [currentPath, targetPath]);

  return isOnSettingsPage
}

const SettingsPage = ({ location: { pathname = '' }, match: { path = '' } }) => {
  const firebase = useFirebase();
  const uid = localStorage.getItem('uid');
  const settings = useSelector(({ firebase }) => firebase.data.settings) || {};
  const isRequesting = useSelector(({ firebase }) => firebase.requesting[`settings/${uid}`]);

  const { [uid]: { expirationOptions = defaultExpirationOptions } = {} } = settings || {};
  const [expOptionOrder, setExpOptionOrder] = useState(Object.keys(expirationOptions));

  const isOnSettingsPage = usePageHook(pathname, path);

  const [expOpts, setExpOpts] = useState(expirationOptions);

  const doReorder = event => {
    const from = event.detail.from;
    // fix bug with more places than elements
    const to = event.detail.to === Object.keys(expOpts).length ? event.detail.to - 1 : event.detail.to;
    if (from === to) return event.detail.complete();

    const newOrder = [...expOptionOrder];
    const moving = newOrder.splice(from, 1);
    newOrder.splice(to, 0, ...moving);
    setExpOptionOrder(newOrder);

    event.detail.complete();
  }

  const updateExpiratonOptions = (customExpirationTime) => {
    const expOptCount = expOptionOrder.length;
    const allExpirationOptions = {
      ...expOpts,
      [expOptCount]: customExpirationTime
    }
    setExpOpts(allExpirationOptions);
    setExpOptionOrder([...expOptionOrder, `${expOptCount}`]);
    firebase.set(`settings/${uid}/expirationOptions`, allExpirationOptions);
  };

  const deleteExpirationOption = (e) => {
    if (expOptionOrder.length === 1) return;

    const noteId = e.target.id;
    const newOrder = [...expOptionOrder];
    const index = newOrder.indexOf(noteId);
    newOrder.splice(newOrder.indexOf(noteId), 1);

    const newExpOpts = newOrder.reduce((acc, pos) => (
      { ...acc, [pos]: expOpts[pos] }
    ), {});

    console.log(noteId, index, '----');
    console.log('old', expOptionOrder, expOpts);
    console.log('new', newOrder, newExpOpts);
    setExpOptionOrder(newOrder);
    setExpOpts(newExpOpts);
  }

  useEffect(() => {
    if (isOnSettingsPage) {
      setExpOptionOrder(Object.keys(expOpts));
      setExpOpts(expirationOptions);
    } else {
      const convertedOptions = expOptionOrder.reduce((acc, pos, i) => (
        { ...acc, [i]: expOpts[pos] }
        ), {});
      firebase.set(`settings/${uid}/expirationOptions`, convertedOptions);
    }
  }, [isOnSettingsPage])

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const renderDatePicker = () => {
    if (isRequesting) return null;

    const onButtonClick = () => {
      setIsPickerOpen(true);
    }

    return (
      <>
        <IonButton onClick={ onButtonClick }>Add option</IonButton>
        <ExpirationTimePicker
          isPickerOpen={isPickerOpen}
          setIsPickerOpen={setIsPickerOpen}
          updateExpiratonOptions={updateExpiratonOptions}
        />
      </>
    );
  }

  const renderExpirationOptions = () => {
    if (isRequesting) return <Loader />;

    return Object.entries(expOpts).map(([id, { title, val }]) => (
      <IonItem key={id}>
        <IonLabel>
          {`${title} (${timeLeft(new Date().getTime() + val, true)})`}
          { expOptionOrder.length === 1 ? null : (
            <IonButton className="ion-no-margin" color="secondary" id={ id } slot="end" onClick={ deleteExpirationOption }>
              <IonIcon icon={ closeCircle }></IonIcon>
            </IonButton>
          )}
        </IonLabel>
        {/* <IonReorder slot="end" /> */}
        <IonReorder slot="start" />
      </IonItem>
    ));
  };

  const renderExpirationOptionSettings = () => {
    if (!isOnSettingsPage) return null;

    return (
      <IonCard>
        <IonCardHeader>Expiration options</IonCardHeader>
        <IonCardContent>
          <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
            {renderExpirationOptions()}
          </IonReorderGroup>
          { renderDatePicker() }
        </IonCardContent>
      </IonCard>
    );
  };

  if (!uid) return <Redirect to='/login' />
  return (
    <IonPage>
      <PageHeader title='Settings'/>
      <IonContent>
        { renderExpirationOptionSettings() }
      </IonContent>
    </IonPage>
  );
};

export default withRouter(SettingsPage);
