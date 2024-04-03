import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axioaClient from '../axios-Client';

export default function Home() {

  const [data,setDate]=useState({});


  const fetchData= async()=>{
    try{
      const response =await axioaClient.get('/data');
      console.log(response)
    }catch(error){

      console.log(error)
      console.log("jhvhjv")

    }
  }

    const notify=()=>{
        toast.success("ok")
    };

  return (
    <div>
        <h2 className=''>home</h2>

<Button onClick={fetchData}>ok</Button>

        
      
    </div>
  )
}
