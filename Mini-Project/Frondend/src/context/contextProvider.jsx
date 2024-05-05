import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => { },
    setToken: () => { },
    setTranslations: () => { },
    translations: {},

})
export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')) || {})
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [translations, _setTranslations] = useState(JSON.parse(localStorage.getItem('TRANSLATIONS')) || {});
    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)

        }
        else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    const setTranslations = (data) => {
        _setTranslations(data)
        localStorage.setItem('TRANSLATIONS', JSON.stringify(data));

    }

    useEffect(() => {
        localStorage.setItem('USER', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('TRANSLATIONS', JSON.stringify(translations)); // Store translations in local storage
    }, [translations]);


    // Function to fetch translations

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            translations,
            setTranslations,
        }}>
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext)
