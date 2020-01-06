import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IonMenu, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/react';
import { listBox, archive, settings, information } from 'ionicons/icons';
import { withRouter } from "react-router";
import '../styles/Menu.css';
import { useSelector } from 'react-redux';
import { expirationOptions as defaultExpirationOptions } from '../components/Note';
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase';

const pages = [
    { title: 'Home', path: '/home', icon: listBox },
    { title: 'Archive', path: '/archive', icon: archive },
    { title: 'Settings', path: '/settings', icon: settings }
];

const Menu = ({ location: { pathname } }) => {
    const uid = localStorage.getItem('uid');
    const firebase = useFirebase();

    useFirebaseConnect([
        { path: `notes/${ uid }`, queryParams: ['orderByChild=updatedAt'] },
        { path: `settings/${ uid }` }
    ]);

    const settings = useSelector(({ firebase }) => firebase.data.settings) || {};
    const { expirationOptions = {} } = settings[uid] || {};
    const isRequested = useSelector(({ firebase }) => firebase.requested[`settings/${uid}/expirationOptions`]);

    useEffect(() => {
        if (isRequested && (expirationOptions && !Object.keys(expirationOptions).length)) {
            console.log('gonna set somethings stupid', expirationOptions, isRequested);

            firebase.set(`settings/${uid}/expirationOptions`, defaultExpirationOptions);
        }
    }, [expirationOptions])

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
                        CrumblePad
                        <Link to="premium/users">
                            <IonIcon icon={information} />
                        </Link>
                    </IonTitle>
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