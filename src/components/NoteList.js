import React from 'react';
import Note from './Note';
import { IonList } from '@ionic/react';
import '../styles/NoteList.css';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  notes: store.notes
});

const NoteList = ({ notes }) => {
  const activeNotes = Object.entries(notes).reduce((acc, [key, note]) => (
    !('expired' in note) || note.expired === false
    ? { ...acc, [key]: note }
    : acc
  ), {});

  if (!Object.keys(activeNotes).length) return <h4 className='empty' >Oops, no notes to crumble...</h4>

  const renderAlert = () => (
    null
  );

  return (
    <IonList>
      { renderAlert() }
      { Object.values(activeNotes).reverse().map(note => (
          <Note
            key={ `${note.id}_${note.title}` }
            note={ note }
          />
        ))
      }
    </IonList>
  );
};

export default connect(mapStateToProps)(NoteList);
