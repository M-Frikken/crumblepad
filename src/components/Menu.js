import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { IonMenu, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/react';
import { listBox, archive } from 'ionicons/icons';
import { withRouter } from "react-router";
import '../styles/Menu.css';

const pages = [
    { title: 'Home', path: '/home', icon: listBox },
    { title: 'Archive', path: '/archive', icon: archive }
];

const Menu = ({ location: { pathname } }) => {
    const menuRef = useRef();

    const menuItemClick = (e) => {
        const locationTo = e.currentTarget.href.split('/');
        const pageNameTo = `/${ locationTo[locationTo.length-1] }`;
        if (pathname !== pageNameTo ) menuRef.current.close();
    }

    return (
        <IonMenu ref={ menuRef } side="start" menu-id="main-menu" content-id="content" type="push">
            <IonHeader>
                <IonToolbar color="light">
                    <IonTitle>CrumblePad</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    { Object.values(pages).map(({ title, path, icon }) => (
                            <Link className="link" onClick={ menuItemClick } key={ title } to={ path }>
                                <IonItem color={ path === pathname ? "orange" : "" }>
                                    <IonIcon icon={ icon } />
                                    <IonTitle>{ title }</IonTitle>
                                </IonItem>
                            </Link>
                    ))}
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default withRouter(Menu);