import { C } from './Notes.actions';

const initialState = {
    notes: {
      '0': {
        title: 'temporary note',
        content: '124',
        expirationOption: 1,
        expiresAt: new Date().getTime() + 10000,
        id: 0,
        type: 'temporary'
      },
      '1': {
        title: 'permanent note',
        content: '124124',
        type: 'permanent',
        id: 1
      },
      '2': {
        title: 'permanent expired note',
        content: '124124',
        type: 'permanent',
        expired: true,
        id: 2
      },
      '3': {
        title: 'temp expired note',
        content: '134124',
        type: 'temporary',
        expired: true,
        id: 3
      }
    },
    nextIndex: 2,
    currentNote: {}
  }

const NotesReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case C.ADD_CURRENT_NOTE:
            return {
                ...state,
                currentNote: action.note
            }
        case C.ADD_NOTE:
            const { note: newNote } = action;
            const { nextIndex } = state;
            return {
                ...state,
                notes: {
                    ...state.notes,
                    [nextIndex]: {
                        ...newNote,
                        id: nextIndex
                    }
                },
                nextIndex: nextIndex + 1
            };
        case C.UPDATE_NOTE:
            const { note } = action;
            return {
                ...state,
                notes: {
                    ...state.notes,
                    [note.id]: note
                }
            };
        case C.DELETE_NOTE:
            const { notes } = state;
            const { noteId } = action;

            const newNotes = Object.entries(notes).reduce((acc, [id, note]) => (
                +id === noteId
                ? acc
                : { ...acc, [id]: note }
            ), {});

            return {
                ...state,
                notes: newNotes
            };
        default:
            return state;
    }
}

export default NotesReducer;