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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
      <ToastContainer/>

      

    </ContextProvider>
    
    
  </React.StrictMode>,
)
