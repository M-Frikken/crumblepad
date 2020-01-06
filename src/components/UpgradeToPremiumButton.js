/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IonButton, IonAlert } from '@ionic/react';
import '../styles/UpgradeToPremiumButton.css';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const UpgradeToPremiumButton = () => {
  const firebase = useFirebase();

  const uid = localStorage.getItem('uid');
  const isLoading = useSelector(({ firebase }) => firebase.requesting[`settings/${uid}`]);
  const { [uid]: settings } = useSelector(({ firebase }) => firebase.data.settings) || {};

  const [isShowButton, setShowButton] = useState(true);
  const [isShowAlert, setShowAlert] = useState(false);

  const showAlert = () => {
    setShowAlert(true);
    firebase.set(`settings/${uid}/premium`, true);
  }

  const hideAlert = () => {
    setShowAlert(false);
  }

  useEffect(() => {
    if (!isLoading) {
      const { premium = false } = settings || {};
      if (premium) setShowButton(false);
    }
  }, [isLoading])

  if (isLoading || !isShowButton) return null;

  return (
    <>
      <IonButton expand="block" className="premiumButton" onClick={ showAlert }>Upgrade to Premium!</IonButton>
      <IonAlert
        isOpen={ isShowAlert }
        onDidDismiss={ hideAlert }
        header={ 'Upgrade to Premium' }
        message={'Thank you for clicking the button! Currently there are no restrictions for non-premium users, therefore continue crumbling notes!!!'}
        buttons={[
          {
            text: 'Ok',
            handler: () => {
              setShowButton(false);
            }
          }
        ]}
      />
    </>
  );
};

export default UpgradeToPremiumButton;
