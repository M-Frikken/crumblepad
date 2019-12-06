import React, { useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonToggle, IonIcon, IonTextarea, IonSelect, IonSelectOption } from '@ionic/react';
import { timer, lock } from 'ionicons/icons';
import { PERMANENT, TEMPORARY } from './Note';
import { expirationOptions } from '../components/Note';

const NoteInputs = ({ note, setNote }) => {
  const { expirationOption = 0, type, title, content: text } = note || {};
  const customActionSheetOptions = {
    header: 'Times',
    subHeader: 'Select note destruction time'
  };

  const onTypeChange = (e) => {
    setNote({
      ...note,
      type: e.currentTarget.checked ? PERMANENT : TEMPORARY
    });
  }

  // useEffect(() => {
  //   window.addEventListener('ionChange', onSelectChange);
  //   return () => {
  //     window.addEventListener('ionChange', onSelectChange);
  //   };
  // }, []);

  const onSelectChange = (e) => {
    console.log(e, e.detail.value);
    setNote({ ...note, expirationOption: +e.detail.value })
  }

  const onTitleChange = (e) => {
    setNote({ ...note, title: e.currentTarget.value || ''});
  }

  const onTextChange = (e) => {
    setNote({ ...note, content: e.currentTarget.value || '' });
  }

  const renderSelect = () => {
    if (type === PERMANENT) return null;
    return (
      <IonItem>
        <IonLabel>Time</IonLabel>
        <IonSelect
          onChange={ onSelectChange }
          interfaceOptions={customActionSheetOptions}
          interface="alert"
          placeholder="Select One"
        >
          { Object.entries(expirationOptions).map(([name, { title }], i) => (
            <IonSelectOption key={ name } selected={ i === expirationOption } value={ name }>{ title }</IonSelectOption>
          )) }
        </IonSelect>
      </IonItem>
    );
  }

  const renderHeader = () => (
    <IonCardHeader>
      <IonItem>
        <IonToggle
          value="permanent"
          checked={ type === PERMANENT }
          onClick={ onTypeChange }
          color="orange" />
        <IonLabel>
          <IonIcon icon={ timer } /> | <IonIcon icon={ lock } />
        </IonLabel>
        { renderSelect() }
      </IonItem>
      <IonCardTitle>
        <IonInput value={ title } onInput={ onTitleChange } placeholder="Title" />
      </IonCardTitle>
    </IonCardHeader>
  )

  return (
    <IonCard>
      { renderHeader() }
      <IonCardContent>
        <IonTextarea value={ text } onInput={ onTextChange } autofocus={true} placeholder="Write a note..."></IonTextarea>
      </IonCardContent>
    </IonCard>
  );
};

export default NoteInputs;
