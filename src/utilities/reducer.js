export const reducer = (prevState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                UserData: action.UserData,
            };
        case 'SIGN_IN':
            return {
                ...prevState,
                UserData: action.UserData,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                UserData: []
            };
    }
};

export const initialState = {
    UserData: []
};