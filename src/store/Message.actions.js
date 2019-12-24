export const C = {
    DISPLAY_MESSAGE: 'DISPLAY_MESSAGE',
    HIDE_MESSAGE: 'HIDE_MESSAGE'
};

export const displayMessage = message => ({
    type:  C.DISPLAY_MESSAGE,
    message
});

export const hideMessage = () => ({
    type:  C.HIDE_MESSAGE
});
