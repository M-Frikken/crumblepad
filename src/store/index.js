import NotesReducer from "./Notes.reducer";
import { createStore } from 'redux';

const store = createStore(
    NotesReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;