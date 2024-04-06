import {Link, Navigate, Outlet} from "react-router-dom";
import React from 'react'
import { useStateContext } from '../context/contextProvider'
import FadeIn from 'react-fade-in';

export default function Default() {

    const {setToken,token}=useStateContext();

    if(!token){
        return <Navigate to='/login'/>
    }
  return (
    <div>

        <h2>default</h2>
        <Outlet/>
        
      
    </div>
  )
}
