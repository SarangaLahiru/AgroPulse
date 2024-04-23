import React from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import { useStateContext } from '../context/contextProvider'

export default function Guest() {
    const {setToken,token}=useStateContext();
    if(token){

        return <Navigate to="/user"/>

    }
  return (
    <div>

        <h2>guest</h2>

        <Outlet />
      
    </div>
  )
}
