import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonToggle, IonIcon, IonTextarea } from '@ionic/react';
import { timer, lock } from 'ionicons/icons';
import { PERMANENT, TEMPORARY } from './Note';

const NoteInputs = ({ note, setNote }) => {
  const { type, title, content: text } = note;

  const onTypeChange = (e) => {
    setNote({
      ...note,
      type: e.currentTarget.checked ? PERMANENT : TEMPORARY
    });
  }

  const onTitleChange = (e) => {
    setNote({ ...note, title: e.currentTarget.value || ''});
  }

  const onTextChange = (e) => {
    setNote({ ...note, content: e.currentTarget.value || '' });
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonItem>
          <IonToggle
            value="permanent"
            checked={ type === PERMANENT }
            onClick={ onTypeChange }
            color="orange" />
          <IonLabel>
            <IonIcon icon={ timer } /> | <IonIcon icon={ lock } />
          </IonLabel>effect
        </IonItem>
        <IonCardTitle>
          <IonInput value={ title } onInput={ onTitleChange } placeholder="Title" />
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonTextarea value={ text } onInput={ onTextChange } autofocus={true} placeholder="Write a note..."></IonTextarea>
      </IonCardContent>
    </IonCard>
  );
};

export default NoteInputs;
