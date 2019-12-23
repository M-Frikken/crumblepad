import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonMenuButton, IonTitle } from "@ionic/react";

const PageHeader = ({ title }) => (
    <IonHeader>
        <IonToolbar color="orange">
            <IonButtons slot="start">
                <IonMenuToggle>
                    <IonMenuButton />
                </IonMenuToggle>
            </IonButtons>
            <IonTitle>
            { title }
            </IonTitle>
        </IonToolbar>
    </IonHeader>
)

export default PageHeader;