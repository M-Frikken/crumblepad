import React from 'react';
import { IonTextarea } from '@ionic/react';

const NoteTextField: React.FC = () => {

    return (
        <IonTextarea autofocus={true} placeholder="Write a note..."></IonTextarea>
    );
};

export default NoteTextField;
