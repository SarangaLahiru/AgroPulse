import { Link, Navigate, Outlet } from "react-router-dom";
import React from 'react'
import { useStateContext } from '../context/contextProvider'
import FadeIn from 'react-fade-in';
import Header from "../components/Header/header";

export default function Default() {

  const { setToken, token } = useStateContext();
  setToken(123)

  if (!token) {
    return <Navigate to='/login' />
  }
  return (
    <div>

      <h2>default</h2>
      <Header />
      <Outlet />


    </div>
  )
}
