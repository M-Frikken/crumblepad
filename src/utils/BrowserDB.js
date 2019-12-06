export const FieldNames = {
    NEXT_ID: 'nextId',
    NOTES: 'notes',
    CURRENT_NOTE: 'currentNote'
};

export const setItem = (name, item = '') => {
    localStorage.setItem(name, `${item}`);
}

export const setObject = (name, object = {}) => {
    localStorage.setItem(name, JSON.stringify(object));
}

export const getString = (name) => localStorage.getItem(name);

export const getNumber = (name) => {
    const item = localStorage.getItem(name);
    return item ? +item : undefined;
}

export const getObject = (name) => {
    return JSON.parse(localStorage.getItem(name) || '{}');
}

export const getNotes = () => getObject(FieldNames.NOTES);

export const createOrUpdateNote = (note) => {
    const noteIsEmpty = () => (
        !(note.content || note.title)
    );

    if (noteIsEmpty()) return false;

    const notes = getNotes();
    const { id } = note;

    if (!id) {
        const nextId = getNumber(FieldNames.NEXT_ID) || 0;
        notes[nextId] = { ...note, id: nextId };
        setItem(FieldNames.NEXT_ID, nextId + 1);
    } else {
        notes[id] = note;
    }
    setObject(FieldNames.NOTES, notes);
    return notes;
}

export const deleteNote = (noteId) => {
    const notes = getNotes();
    delete notes[noteId];
    return notes;
}

export const deleteNotesByIds = (IDs) => {
    const notes = getNotes();
    const notesLeft = Object.entries(notes).reduce((acc, [key, value]) => {
        return IDs.includes(+key)
        ? { ...acc, [key]: value }
        : acc;
    });
    setObject(FieldNames.NOTES, notesLeft);
}

export const setCurrentNote = (note) => setObject(FieldNames.CURRENT_NOTE, note);

export const getCurrentNote = () => getObject(FieldNames.CURRENT_NOTE);

export const removeCurrentNote = () => localStorage.removeItem(FieldNames.CURRENT_NOTE);

export const createOrUpdateNoteFromCurrent = () => {
    const note = getCurrentNote();
    return createOrUpdateNote(note);
}