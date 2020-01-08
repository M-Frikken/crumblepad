import { C } from './Message.actions';

const initialState = {
    message: "Sample Message",
    isActive: false
  }

const MessageReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case C.DISPLAY_MESSAGE:
            const { message } = action;
            return {
                ...state,
                message,
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