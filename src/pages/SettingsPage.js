/* eslint-disable react-hooks/exhaustive-deps */
import { IonContent, IonItem, IonLabel, IonPage, IonReorder, IonReorderGroup } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Loader from '../components/Loader';
import { expirationOptions as defaultExpirationOptions } from '../components/Note';
import PageHeader from '../components/PageHeader';

const SettingsPage = ({ location: { pathname }, match: { path } }) => {
  const firebase = useFirebase();
  const uid = localStorage.getItem('uid');
  const settings = useSelector(({ firebase }) => firebase.data.settings) || {};
  const isLoading = useSelector(({ firebase }) => firebase.requesting['settings/3ndnPQPXbBRaGB17nRdQrUJkqHX2/expirationOptions']);
  
  const { expirationOptions: userExpirationOptions } = settings[uid] || {};
  const expirationOptions = userExpirationOptions || defaultExpirationOptions;
  const [expOptionOrder, setExpOptionOrder] = useState(Object.keys(expirationOptions));

  function doReorder(event) {
    const from = event.detail.from;
    // fix bug with more places then elements
    const to = event.detail.to === Object.keys(expirationOptions).length ? event.detail.to - 1 : event.detail.to;
    if (from === to) return event.detail.complete();
    
    const newOrder = expOptionOrder;
    const moving = expOptionOrder.splice(from, 1);
    newOrder.splice(to, 0, ...moving);
    setExpOptionOrder(newOrder);

    event.detail.complete();
  }

  const [isOnSettingsPage, setIsOnSettingsPage] = useState(true);

  useEffect(() => {
    // in order to render correctly expiration options after settings got chaged
    if (pathname === path) setIsOnSettingsPage(true);
    else setIsOnSettingsPage(false);

    return () => {
      if (pathname === path) {
        const convertedOptions = expOptionOrder.reduce((acc, pos, i) => (
          { ...acc, [i]: expirationOptions[pos] }
        ), {});
        firebase.set(`settings/${uid}/expirationOptions`, convertedOptions);
      }
    }
  }, [pathname, path]);

  const renderExpirationOptionSettings = () => {
    if (!isOnSettingsPage) return null;
   
    return (
      <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
        {renderExpirationOptions()}
      </IonReorderGroup>
    );
  };

  const renderExpirationOptions = () => {
    if (isLoading) return <Loader />;

    return Object.entries(expirationOptions).map(([id, { title }]) => (
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
