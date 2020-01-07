import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonToggle, IonTitle } from '@ionic/react';
import { lock, timer } from 'ionicons/icons';
import React, { useCallback, useEffect } from 'react';
import { PERMANENT, TEMPORARY } from './Note';

const NoteInputs = ({ note, setNote, expirationOptions }) => {
  const { expirationOption = 0, type, title, content: text } = note || {};
  const customActionSheetOptions = {
    header: 'Expiration time',
    subHeader: 'Select note expiration time'
  };

  const onTypeChange = (e) => {
    setNote({
      ...note,
      type: e.currentTarget.checked ? PERMANENT : TEMPORARY
    });
  }

  const onSelectChange = useCallback(
    (e) => {
      const selectClass = "md in-item hydrated";
      if (e.target.className === selectClass) {
        setNote({ ...note, expirationOption: +e.detail.value })
      };
    }, [note, setNote]
  );


  useEffect(() => {
    window.addEventListener('ionChange', onSelectChange);
    return () => {
      window.removeEventListener('ionChange', onSelectChange);
    };
  }, [onSelectChange]);

  const onTitleChange = (e) => {
    setNote({ ...note, title: e.currentTarget.value || ''});
  }

  const onTextChange = (e) => {
    setNote({ ...note, content: e.currentTarget.value || '' });
  }

  const renderSelect = () => {
    if (type === PERMANENT) return null;
    return (
      <IonItem class="ion-no-margin">
        <IonLabel position="floating">Expiration</IonLabel>
        <IonSelect
          onChange={ onSelectChange }
          interfaceOptions={customActionSheetOptions}
          interface="alert"
          placeholder="Select"
        >
          { Object.entries(expirationOptions).map(([name, { title }], i) => (
            <IonSelectOption key={ name } selected={ i === expirationOption } value={ name }>
              { title }
            </IonSelectOption>
          )) }
        </IonSelect>
      </IonItem>
    );
  }

  const renderHeader = () => (
    <IonCardHeader>
      <IonItem>
        <IonIcon icon={ timer } />
        <IonToggle
          value="permanent"
          checked={ type === PERMANENT }
          onClick={ onTypeChange }
          color="orange" />
        <IonIcon icon={ lock } />
      </IonItem>
      { renderSelect() }
      <IonCardTitle>
        <IonInput autofocus value={ title } onInput={ onTitleChange } placeholder="Title" />
      </IonCardTitle>
    </IonCardHeader>
  )

  return (
    <IonCard>
      { renderHeader() }
      <IonCardContent>
        <IonTextarea value={ text } onInput={ onTextChange } placeholder="Write a note..."></IonTextarea>
      </IonCardContent>
    </IonCard>
  );
};

export default NoteInputs;
