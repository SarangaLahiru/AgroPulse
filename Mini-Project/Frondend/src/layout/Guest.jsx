import React from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import { useStateContext } from '../context/contextProvider'
import FadeIn from 'react-fade-in';

export default function Guest() {
    const {setToken,token}=useStateContext();
    if(token){

        return <Navigate to="/"/>

    }
  return (
    <div>

        <h2>guest</h2>

        <Outlet />
      
    </div>
  )
}
