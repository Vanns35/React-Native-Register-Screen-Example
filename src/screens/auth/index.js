import React, { useContext, createContext } from 'react';
import { AuthContext } from '../../utilities/authContext';
import Auth from './auth';

const AuthIndex = ({ navigation }) => {
    const { signIn } = useContext(AuthContext);

    function doLogin(UserData) {
        signIn({ UserData })
    }

    return (
        <Auth
            signIn={signIn}
            doLogin={doLogin}
            navigation={navigation}
        />
    )
}

export default AuthIndex;