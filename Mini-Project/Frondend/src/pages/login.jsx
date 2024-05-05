
import Button from '@mui/material/Button';
import { TextField, Grid, Typography, Container } from '@mui/material';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import FadeIn from 'react-fade-in';
import { createRef } from 'react';
import axioaClient from '../axios-Client';
import { useStateContext } from '../context/contextProvider';

export default function Login() {

  const idRef = createRef();
  const passwordRef = createRef();
  const { setToken, setUser } = useStateContext();
  
  const handleSubmit = (ev) => {
    ev.preventDefault();

    const payload = {

      id: idRef.current.value,
      password: passwordRef.current.value,

    };

    axioaClient.post('/signin', payload)
      .then(response => {
        console.log(response.data.message); // Handle success response
        console.log("gfghfgh")
        toast.success(response.data.message)
        setToken(123)
        setUser(response.data.user)
        console.log(response.data.user)


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
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

              <FadeIn>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="ID Number"
                    name="ID"
                    type="text"
                    className='textInput'
                    color="success"
                    inputRef={idRef}
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
                    inputRef={passwordRef}
                  />
                </Grid>
              </FadeIn>




              <FadeIn>
                <div>
                  <Button type='submit' sx={{ color: "white", padding: "12px 18px", bgcolor: "#014802" }} id="loginbtn"
                    className="loginbtn flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 loginbtn"

                  >Sign in</Button>
                </div>
              </FadeIn>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              If you not a member?{' '}
              <a href="/signup" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </FadeIn>

    </>
  )
}
