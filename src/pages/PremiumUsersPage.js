/* eslint-disable react-hooks/exhaustive-deps */
import { IonContent, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useFirebaseConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const PremiumUsersPage = ({ history }) => {
    const [isLoading, setIsLoading] = useState(true)
    useFirebaseConnect(['settings']);
    const settings = useSelector(({ firebase }) => firebase.data.settings) || {};
    const premiumUsers = settings && Object.keys(settings).reduce(
        (acc, key) => {
            const { premium = false } = settings[key];
            return premium ? [ ...acc, key ] : acc
        }, []
    );

    useEffect(() => {
        if (Object.keys(settings).length > 1) {
            setIsLoading(false);
        }
    }, [settings])

    const renderPremiumUsers = () => {
        if (isLoading) return <Loader />;

        if (!premiumUsers.length) return 'No premium users';

        return (
            <>
                <h1>Total premium users: { premiumUsers.length }</h1>
                { premiumUsers.map(user => <p key={ user }>{ user }</p>) }
            </>
        )
    };

    return (
        <IonPage>
            <PageHeader title='PremiumUsers'/>
            <IonContent>
                { renderPremiumUsers() }
            </IonContent>
        </IonPage>
    );
  };

export default PremiumUsersPage;
