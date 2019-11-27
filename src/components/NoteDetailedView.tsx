import React from 'react';
import { notes } from './NoteList';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

const NoteDetailedView: React.FC<{ noteId: number }> = ({ noteId }) => {
    const noteInfo = notes.find(({ id }) => id === noteId);
    if (!noteInfo) return (<p>Note was not found</p>);

    const { id, title, content } = noteInfo;

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Card id: { id }</IonCardSubtitle>
                <IonCardTitle>{ title }</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                { content }
            </IonCardContent>
        </IonCard>
    );
};

export default NoteDetailedView;
