import React, { createContext, useContext, useEffect, useState } from 'react'
const StateContext=createContext({
    currentUser:null,
    token:null,
    notification:null,
    setUser:()=>{},
    setToken:()=>{}

})
export const ContextProvider=({children})=> {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER')) || {})
    const [token,_setToken]=useState(localStorage.getItem('ACCESS_TOKEN'));
    const setToken=(token)=>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token)

        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    useEffect(() => {
        localStorage.setItem('USER', JSON.stringify(user));
      }, [user]);

  return (
    <StateContext.Provider value={{ 
        user,
        setUser,
        token,
        setToken
     }}>
        {children}
     </StateContext.Provider>
  )
}
export const useStateContext=()=>useContext(StateContext)
