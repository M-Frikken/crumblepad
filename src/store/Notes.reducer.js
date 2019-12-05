import { C } from './Notes.actions';

const initialState = {
    notes: {
        // "0": {
        //     "type": "temporary",
        //     "title": "124",
        //     "content": "241424",
        //     "id": 0,
        //     expired: false
        // },
        // "1": {
        //     "type": "temporary",
        //     "title": "142",
        //     "content": "124",
        //     "id": "1",
        //     "expired": true
        // }
    },
    nextIndex: 0
    // currentNote: {}
}

const NotesReducer = (state = initialState, action) => {
    console.log('inside a store', state, action);
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

            delete notes[noteId];
            return {
                ...state,
                notes
            };
        default:
            return state;
    }
}

export default NotesReducer;