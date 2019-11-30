import React, { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonToggle, IonIcon, IonTextarea } from '@ionic/react';
import { timer, lock } from 'ionicons/icons';
import { PERMANENT, TEMPORARY, NoteType } from './Note';

const NoteInputs: React.FC<{ note: NoteType }> = ({ note: currentNote }) => {
  const [title, setTitle] = useState<null | string | undefined>(currentNote.title || '');
  const [text, setText] = useState<null | string | undefined>(currentNote.content || '');
  let defType = currentNote.type || -2;
  if (defType < 0) {
    defType = currentNote.id === -2 ? TEMPORARY : PERMANENT;
  }
  const [type, setType] = useState(defType);

  useEffect(() => {
    localStorage.setItem('currentNote', JSON.stringify({
      type,
      title,
      content: text
    }));
  }, [type, title, text]);

  return (
    <IonCard>
      <IonCardHeader>
        <IonItem>
          <IonToggle
            value="permanent"
            checked={ type === PERMANENT }
            onClick={ (e) => setType(e.currentTarget.checked ? PERMANENT : TEMPORARY) }
            color="orange" />
          <IonLabel>
            <IonIcon icon={ timer } /> | <IonIcon icon={ lock } />
          </IonLabel>
        </IonItem>
        <IonCardTitle>
          <IonInput value={ title } onInput={(e) => setTitle(e.currentTarget.value)} placeholder="Title" />
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonTextarea value={ text } onInput={(e) => setText(e.currentTarget.value)} autofocus={true} placeholder="Write a note..."></IonTextarea>
      </IonCardContent>
    </IonCard>
  );
};

export default NoteInputs;
