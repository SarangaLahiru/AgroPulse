import Button from '@mui/material/Button';
import { TextField, Grid } from '@mui/material';
import './login.css';
import FadeIn from 'react-fade-in';
import { createRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axiosClient from '../axios-Client'; // Assuming you have an axios client configured


export default function Signup() {
  const nameRef = createRef();
  const idRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();
  const {setToken,setUser}=useStateContext();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      id: idRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value
    };

    axiosClient.post('/signup', payload)
      .then(response => {
        console.log(response.data.message); // Handle success response
        console.log("gfghfgh")
        toast.success(response.data.message)

        setToken(123)
      })
      .catch(error => {
        console.log(error.response.data.error); // Handle error
        console.log("dsdfsdf")
        toast.error(error.response.data.error)
        
      });
  };

  return (
    <>
      <FadeIn>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 -mt-14">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto"
              src="/images/logo.jpeg"
              alt="Your Company"
              width="180px"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <FadeIn>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      type="text"
                      className='textInput'
                      color="success"
                      inputRef={nameRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="ID Number"
                      type="text"
                      className='textInput'
                      color="success"
                      inputRef={idRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="E-mail"
                      type="email"
                      className='textInput'
                      color="success"
                      inputRef={emailRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      className='textInput'
                      color="success"
                      inputRef={passwordRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      className='textInput'
                      color="success"
                      inputRef={confirmPasswordRef}
                    />
                  </Grid>
                </Grid>
              </FadeIn>

              <FadeIn>
                <div>
                  <Button
                    type='submit'
                    sx={{ color:"white",padding: "12px 18px",bgcolor:"#014802" }}
                    id="loginbtn"
                    className="loginbtn flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 loginbtn"
                  >
                    Sign up
                  </Button>
                </div>
              </FadeIn>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              If you already have an account?{' '}
              <a href="/login" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </FadeIn>

      
    </>
  );
}
