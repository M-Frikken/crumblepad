import React, { useEffect, useState } from 'react';
import Note, { TEMPORARY, expirationOptions } from '../components/Note';
import { IonList, IonAlert } from '@ionic/react';
import { getNotes, deleteNotesByIds } from '../utils/BrowserDB';
import '../styles/NoteList.css';

const NoteList: React.FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const notes = getNotes();
  let expired: number[];

  // useEffect(() => {
    // const timeOut = setInterval(() => {
    //   expired = Object.values(notes).reduce<number[]>((acc, { id, type, expiresAt }) => {
    //     if (
    //       type === TEMPORARY
    //       && id
    //       && (
    //         expiresAt
    //         && expiresAt <= new Date().getTime()
    //       )
    //     ) return [ ...acc, +id ];

    //     return acc;
    //   }, []);

    //   if (expired.length > 0) setShowAlert(true);
    //   // clearInterval(timeOut);
    // }, 1000)
  //   return () => {
  //     clearInterval(timeOut);
  //   };
  // });

  if (!Object.keys(notes).length) return <h4 className='empty' >Oops, no notes to crumble...</h4>

  return (
    <IonList>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Warning!'}
        subHeader={'Some notes have expired'}
        message={'Would you like to delete them?'}
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: e => {
              console.log('Confirm Cancel: blah', expired);
              deleteNotesByIds(expired);
            }
          },
          {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay', expired);
            }
          }
        ]}
      />
      { Object.values(notes).reverse().map(note => {
            return (
              <Note
                key={ `${note.id}_${note.title}` }
                { ...note }
              />
            );
          }
        )
      }
    </IonList>
  );
};

export default NoteList;
