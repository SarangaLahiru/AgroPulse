import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/header";
import { useStateContext } from '../context/contextProvider';

export default function Default() {

  const { setToken, token } = useStateContext();



  if (!token) {
    return <Navigate to='/login' />
  }
  return (
    <div>

      <h2>default</h2>
      <Header />
      <Outlet />
      <Footer />


    </div>
  )
}
