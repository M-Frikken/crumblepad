import React from 'react';
import Note from './Note';
import { IonList } from '@ionic/react';
import '../styles/NoteList.css';
import { connect } from 'react-redux';

// const allNotes = store => ({
//   store.notes
// })

// const filtered = Object.allNotes.foreach(note => {
//   if (note.expired) {
//     return note
//   }
// })
  // .filter(value => )
  // .reduce((obj, key) => {
  //   obj[key] = raw[key];
  //   return obj;
  // }, {});

const mapStateToProps = store => ({
  notes: store.notes
});

const NoteListArchive = ({ notes }) => {
  var filtered = {};

  Object.values(notes).map(note => {
      if('expired' in note && note.expired === true){
        filtered = Object.assign({ note } , filtered);
      }
    })


  if (!Object.keys(filtered).length) return <h4 className='empty' >Oops, no archived notes to crumble...</h4>

  console.log(notes);

  const renderAlert = () => (
    null
  );


  console.log("filtered:");
  console.log(filtered);

  return (
    <IonList>
      { renderAlert() }
      { Object.values(filtered).reverse().map(note => {
            return (
              <Note
                key={ `${note.id}_${note.title}` }
                note={ note }
              />
            );
          }
        )
      }
    </IonList>
  );
};

export default connect(mapStateToProps)(NoteListArchive);

// export default NoteList;