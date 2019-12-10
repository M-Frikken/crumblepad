import React from 'react';
import { Link } from 'react-router-dom';
import { IonMenu, IonRouterLink, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Menu = () => {
    return (
        <IonMenu side="start" menu-id="main-menu" content-id="content" type="reveal">
            <IonHeader>
                <IonToolbar color="light">
                    <IonTitle>CrumblePad</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <Link to="/">
                        <IonItem>Notes</IonItem>
                    </Link>
                    <Link to="/archive">
                        <IonItem>Archive</IonItem>
                    </Link>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menu;