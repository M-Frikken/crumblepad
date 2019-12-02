import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonToggle, IonIcon, IonTextarea } from '@ionic/react';
import { timer, lock } from 'ionicons/icons';
import { PERMANENT, TEMPORARY, expirationOptions } from './Note';
import { setCurrentNote, getCurrentNote } from '../utils/BrowserDB';

const NoteInputs: React.FC = () => {
  const currentNote = getCurrentNote();
  const { type, title, content: text } = currentNote;

  const onTypeChange = (e: React.MouseEvent<HTMLIonToggleElement, MouseEvent>) => {
    const expirationOption = 2;
    const expiresAt =  new Date().getTime() + expirationOptions[expirationOption];
    setCurrentNote({
      ...getCurrentNote(),
      type: e.currentTarget.checked ? PERMANENT : TEMPORARY,
      expirationOption,
      expiresAt
    });
  }

  const onTitleChange = (e: React.FormEvent<HTMLIonInputElement>) => {
    setCurrentNote({ ...getCurrentNote(), title: e.currentTarget.value || ''});
  }

  const onTextChange = (e: React.FormEvent<HTMLIonTextareaElement>) => {
    setCurrentNote({ ...getCurrentNote(), content: e.currentTarget.value || '' });
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
