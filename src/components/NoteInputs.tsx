import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonToggle, IonIcon } from '@ionic/react';
import { timer, lock } from 'ionicons/icons';
import NoteTextField from '../components/NoteTextField';

const NoteInputs: React.FC = () => {

    return (
      <IonCard>
        <IonCardHeader>
          <IonItem>
            <IonToggle />
            <IonLabel>
              <IonIcon icon={ timer } /> | <IonIcon icon={ lock } />
            </IonLabel>
          </IonItem>
          <IonCardTitle>
            <IonInput placeholder="Title"></IonInput>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <NoteTextField />
        </IonCardContent>
      </IonCard>
    );
};

export default NoteInputs;
