/* eslint-disable react-hooks/exhaustive-deps */
import { IonContent, IonItem, IonLabel, IonPage, IonReorder, IonReorderGroup } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { expirationOptions as defaultExpirationOptions } from '../components/Note';
import PageHeader from '../components/PageHeader';
import { useFirebase } from 'react-redux-firebase';
import Loader from '../components/Loader';

const SettingsPage = ({ location: { pathname }, match: { path } }) => {
  const firebase = useFirebase();
  const uid = localStorage.getItem('uid');
  const settings = useSelector(({ firebase }) => firebase.data.settings) || {};
  const isLoading = useSelector(({ firebase }) => firebase.requesting['settings/3ndnPQPXbBRaGB17nRdQrUJkqHX2/expirationOptions']);
  
  const { expirationOptions } = settings[uid] || {};
  const opts = expirationOptions || defaultExpirationOptions;
  const [expOptionOrder, setExpOptionOrder] = useState(Object.keys(opts));

  function doReorder(event) {
    const from = event.detail.from;
    // fix bug with more places then elements
    const to = event.detail.to === Object.keys(opts).length ? event.detail.to - 1 : event.detail.to;
    if (from === to) return event.detail.complete();
    
    const newOrder = expOptionOrder;
    const moving = expOptionOrder.splice(from, 1);
    newOrder.splice(to, 0, ...moving);
    setExpOptionOrder(newOrder);

    event.detail.complete();
  }

  const [reorderLocked, reorderLockToggle] = useState(false);
  const onToggleEdit = () => reorderLockToggle(!reorderLocked);

  useEffect(() => {
    return () => {
      if (pathname === path) {
        const convertedOptions = expOptionOrder.reduce((acc, pos, i) => (
          { ...acc, [i]: opts[pos] }
        ), {});
        firebase.set(`settings/${uid}/expirationOptions`, convertedOptions);
      }
    }
  }, [pathname, path]);

  const renderExpirationOptions = () => {
    if (isLoading) return <Loader />;

    return Object.entries(opts).map(([id, { title }]) => (
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
        <button onClick={ onToggleEdit }>Toggle</button>
        <IonReorderGroup disabled={ reorderLocked } onIonItemReorder={doReorder}>
        { renderExpirationOptions() }
        </IonReorderGroup>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(SettingsPage);
