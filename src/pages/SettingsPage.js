/* eslint-disable react-hooks/exhaustive-deps */
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonItem, IonLabel, IonPage, IonReorder, IonReorderGroup } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { expirationOptions as defaultExpirationOptions } from '../components/Note';
import ExpirationTimePicker from '../components/ExpirationTimePicker';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';

const SettingsPage = ({ location: { pathname = '' }, match: { path = '' } }) => {
  const firebase = useFirebase();
  const uid = localStorage.getItem('uid');
  const settings = useSelector(({ firebase }) => firebase.data.settings) || {};
  const isRequesting = useSelector(({ firebase }) => firebase.requesting[`settings/${uid}`]);

  const { [uid]: userExpirationOptions } = settings || {};
  const expirationOptions = userExpirationOptions || defaultExpirationOptions;
  const [expOptionOrder, setExpOptionOrder] = useState(Object.keys(expirationOptions) || []);

  const [expOpts, setExpOpts] = useState(expirationOptions);

  const doReorder = event => {
    const from = event.detail.from;
    // fix bug with more places then elements
    const to = event.detail.to === Object.keys(expOpts).length ? event.detail.to - 1 : event.detail.to;
    if (from === to) return event.detail.complete();

    const newOrder = expOptionOrder;
    const moving = expOptionOrder.splice(from, 1);
    newOrder.splice(to, 0, ...moving);
    setExpOptionOrder(newOrder);

    event.detail.complete();
  }

  const [isOnSettingsPage, setIsOnSettingsPage] = useState(true);

  useEffect(() => {
    // in order to render correctly expiration options after settings got changed
    if (pathname === path) {
      setIsOnSettingsPage(true);
      setExpOptionOrder(Object.keys(expOpts));
    }

    return () => {
      if (pathname === path) {
        console.log('before change', expOptionOrder, expOpts);
        const convertedOptions = expOptionOrder.reduce((acc, pos, i) => (
          { ...acc, [i]: expOpts[pos] }
        ), {});
        console.log('after changes', convertedOptions, expOpts);
        firebase.set(`settings/${uid}/expirationOptions`, convertedOptions);
        setIsOnSettingsPage(false);
      }
    }
  }, [expOpts, pathname, path]);

  useEffect(() => {
    setExpOptionOrder(Object.keys(expOpts));
    setIsOnSettingsPage(false);
  }, [expOpts]);

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const updateExpiratonOptions = (customExpirationTime) => {
    const expOptCount = expOptionOrder.length;
    const allExpirationOptions = {
      ...expirationOptions,
      [expOptCount]: customExpirationTime
    }
    setExpOpts(allExpirationOptions);
    setExpOptionOrder([...expOptionOrder, `${expOptCount}`]);
    firebase.set(`settings/${uid}/expirationOptions`, allExpirationOptions);
  };

  const renderDatePicker = () => {
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

  const renderExpirationOptionSettings = () => {
    console.log(isOnSettingsPage)
    if (!isOnSettingsPage) return null;

    return (
      <IonCard>
        {/* <IonButton onClick={al}>Add option</IonButton> */}

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

  const renderExpirationOptions = () => {
    if (!isRequesting) return <Loader />;

    return Object.entries(expOpts).map(([id, { title }]) => (
      <IonItem key={id}>
        <IonLabel>{`${id} | ${title}`}</IonLabel>
        {/* <IonReorder slot="end" /> */}
        <IonReorder slot="start" />
      </IonItem>
    ));
  };

  if (!uid) return <Redirect to='/login' />
  return (
    <IonPage>
      <PageHeader title='Settings'/>
      <IonContent>
        {/* <IonButton onClick={ onToggleEdit }>Toggle</IonButton> */}
        { renderExpirationOptionSettings() }
      </IonContent>
    </IonPage>
  );
};

export default withRouter(SettingsPage);
