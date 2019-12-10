import React from 'react';
import Note from './Note';
import { IonList } from '@ionic/react';
import '../styles/NoteList.css';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  notes: store.notes
});

const NoteListArchive = ({ notes }) => {
  if (!Object.keys(notes).length) return <h4 className='empty' >Oops, no notes to crumble...</h4>

  const renderAlert = () => (
    null
  );

  return (
    <IonList>
      { renderAlert() }
      { Object.values(notes).reverse().map(note => {
            if(note.expired){
              return (
                <Note
                  key={ `${note.id}_${note.title}` }
                  note={ note }
                />
              );
            }
          }
        )
      }
    </IonList>
  );
};

export default connect(mapStateToProps)(NoteListArchive);

// export default NoteList;