
import Button from '@mui/material/Button';
import { TextField, Grid, Typography, Container } from '@mui/material';
import './login.css';

import FadeIn from 'react-fade-in';

export default function Login() {
    return (
      <>
        
       <FadeIn>
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto"
              src="/images/logo.jpeg"
              alt="Your Company"
              width="180px"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
           
          <FadeIn>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID Number"
              name="ID"
              type="text"
              className='textInput'
              color="success"
            />
          </Grid>
          </FadeIn>
          
          <FadeIn>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="Password"
              type="password"
              className='textInput'
              color="success"
            />
          </Grid>
          </FadeIn>
          
          
            
  
              <FadeIn>
              <div>
                <Button type='submit' sx={{ color:"white",padding: "12px 18px",bgcolor:"#014802" }} id="loginbtn"
                className="loginbtn flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 loginbtn"
                
                >Sign in</Button>
              </div>
              </FadeIn>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              If you not a member?{' '}
              <a href="/signup" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
       </FadeIn>
      </>
    )
  }
  