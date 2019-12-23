import React, { useState } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonReorder, IonReorderGroup } from '@ionic/react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { expirationOptions } from '../components/Note';
import PageHeader from '../components/PageHeader';

const SettingsPage = () => {
  const [reorderLocked, reorderLockToggle] = useState(false);

  const { isLoaded, isEmpty } = useSelector(({ firebase }) => firebase.profile);
  if (isLoaded && isEmpty) {
    return <Redirect to='/login'/>
  }

  const renderExpirationOptions = () => (
    Object.entries(expirationOptions).map(([id, { title }]) => (
      <IonItem key={ id }>
        <IonLabel>{ `${ id } | ${ title }` }</IonLabel>
        {/* <IonReorder slot="end" /> */}
        <IonReorder slot="start" />
      </IonItem>
    ))
  );

  function doReorder(event) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  const onToggleEdit = () => reorderLockToggle(!reorderLocked);

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

export default SettingsPage;
