export const C = {
    ADD_NOTE: 'ADD_NOTE',
    DELETE_NOTE: 'DELETE_NOTE',
    UPDATE_NOTE: 'UPDATE_NOTE'
};

export const addNote = note => ({
    type:  C.ADD_NOTE,
    note
});

export const deleteNote = noteId => ({
    type:  C.DELETE_NOTE,
    noteId
});

export const updateNote = note => ({
    type:  C.UPDATE_NOTE,
    note
});
