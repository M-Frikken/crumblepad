import { C } from './Message.actions';

const initialState = {
    text: "Sample Message",
    isActive: false
  }

const MessageReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case C.DISPLAY_MESSAGE:
            return {
                ...state,
                ...action,
                isActive: true
            }
        case C.HIDE_MESSAGE:
            return {
                ...state,
                isActive: false
            }
        default:
            return state;
    }
}

export default MessageReducer;