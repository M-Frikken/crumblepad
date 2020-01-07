import { IonButton, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import { information, listBox, settings, trash } from 'ionicons/icons';
import React, { useRef } from 'react';
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const pages = [
    { title: 'Home', path: '/home', icon: listBox },
    { title: 'Archive', path: '/archive', icon: trash },
    { title: 'Settings', path: '/settings', icon: settings }
];

const Menu = ({ location: { pathname }, history }) => {
    const firebase = useFirebase();
    const uid = localStorage.getItem('uid');

    useFirebaseConnect([
        { path: `notes/${ uid }`, queryParams: ['orderByChild=updatedAt'] },
        { path: `settings/${ uid }` }
    ]);

    const logout = () => {
        firebase.logout();
        localStorage.removeItem('uid');
        history.push('/login');
    }

    const menuRef = useRef();
    const menuItemClick = (e) => {
        const locationTo = e.currentTarget.href.split('/');
        const pageNameTo = `/${ locationTo[locationTo.length-1] }`;
        if (pathname !== pageNameTo) menuRef.current.close();
        else e.preventDefault();
    }

    if (!uid) return null;

    return (
        <IonMenu ref={ menuRef } side="start" menu-id="main-menu" content-id="content" type="push">
            <IonHeader>
                <IonToolbar color="light">
                    <IonTitle>
                        <IonImg className="ion-padding" src={ process.env.PUBLIC_URL + 'images/cp-logo-text.png'} alt="CrumblePad" />
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    { Object.values(pages).map(({ title, path, icon }) => (
                        <Link className="link" onClick={ menuItemClick } key={ title } to={ path }>
                            <IonItem color={ path === pathname ? "secondary" : "" }>
                                <IonIcon icon={ icon } />
                                <IonTitle>{ title }</IonTitle>
                            </IonItem>
                        </Link>
                    ))}
                </IonList>
            </IonContent>
            <IonButton className="ion-padding-start ion-padding-end" color="secondary" onClick={ logout }>
                Log out
            </IonButton>
            <Link color="secondary" to="premium/users" style={{ display: 'inline' }}>
                <IonIcon icon={information} />
            </Link>
        </IonMenu>
    )
}

export default withRouter(Menu);