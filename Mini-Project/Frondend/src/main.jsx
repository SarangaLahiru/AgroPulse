import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {RouterProvider} from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ContextProvider } from './context/contextProvider.jsx'
import router from './Routes.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <GoogleOAuthProvider clientId="796659410119-6p76ghbvl4tmcpmngk1v97u8h0n2g6d0.apps.googleusercontent.com">
      <RouterProvider router={router}/>
      </GoogleOAuthProvider>
      <ToastContainer/> 
    </ContextProvider>
  </React.StrictMode>,
)
