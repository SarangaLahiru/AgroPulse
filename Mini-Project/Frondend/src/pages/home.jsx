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

      toast.success("ok")


    }catch(error){

      console.log(error)
      console.log("jhvhjv")
      toast.warn("not ok")

    }
  }



  return (
    <div>
      
        <h2 className=''>home</h2>


        
      
    </div>
  )
}
