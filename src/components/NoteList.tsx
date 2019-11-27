import React from 'react';
import Note from '../components/Note';
import { IonList } from '@ionic/react';

export const notes = [
  {
    id: 1,
    title: 'My Note is best',
    content: 'eksandr Pushkin is, by common agreement -- at least among his own compatriots -- the greatest of all Russian writers. The major part of his lyrical poetry was written between 1820 and 1830, but some of his poetical masterpieces were composed in the last seven years of his life, when he was turning his '
  },
  {
    id: 2,
    title: 'My Note is cool',
    content: 'velopment can be traced from the sparkling ebullience of his early verse -- the crowning achievement of which is the first chapter of Evgeny Onegin, written in 1823 -- to the concetrated expressiveness and restrained power of his later poetry. By effecting a new synthesis between the three main ing'
  },
  {
    id: 3,
    title: 'My Note is not cool',
    content: 'dients of the Russian literary idiom -- the Church Slovanic, the Western European borrowings, and the spoken vernacular -- Pushkin created the language of modern Russian'
  },
  {
    id: 4,
    title: 'My Note is amazing',
    content: 'poetry. His personal life was made difficult by his conflicts with the authorities who disapproved of his liberal views. He was killed in a duel.'
  },
];

const NoteList: React.FC = () => (
  <IonList>
    { notes.map(({ id, title, content }) => (
          <Note
            id={ id }
            title={ title }
            content={ content }
          />
        )
      )
    }
  </IonList>
);

export default NoteList;
