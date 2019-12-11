import React from 'react';
import { Link } from 'react-router-dom';
import { IonMenu, IonRouterLink, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/react';
import { listBox, archive } from 'ionicons/icons';

const pages = [
    { key: 1, title: 'Home', path: '/home', icon: listBox },
    { key: 2, title: 'Archive', path: '/archive', icon: archive }
];

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
                    { Object.values(pages).map(page => {
                        return (
                            <Link key={page.key} to={page.path}>
                                <IonItem>
                                    <IonIcon icon={ page.icon } />
                                    <IonTitle>{page.title}</IonTitle></IonItem>
                            </Link>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menu;