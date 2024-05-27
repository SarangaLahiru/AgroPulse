
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { createRef, useState } from 'react';
import FadeIn from 'react-fade-in';
import { FourSquare } from 'react-loading-indicators';
import { toast } from 'react-toastify';
import axioaClient from '../axios-Client';
import { useStateContext } from '../context/contextProvider';
import './login.css';

export default function Login() {

  const idRef = createRef();
  const passwordRef = createRef();
  const { setToken, setUser } = useStateContext();
  const [loading, setLoading] = useState(false)

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const payload = {

      id: idRef.current.value,
      password: passwordRef.current.value,

    };
    setLoading(true)

    axioaClient.post('/signin', payload)
      .then(response => {
        console.log(response.data.message); // Handle success response
        console.log("gfghfgh")
        toast.success(response.data.message)
        setToken(123)
        setUser(response.data.user)
        console.log(response.data.user)
        setLoading(false)


      })
      .catch(error => {
        console.log(error.response.data.error); // Handle error
        console.log("dsdfsdf")
        toast.error(error.response.data.error)
        setLoading(false)

      });
  };
  return (
    <>
      {
        loading ? (
          <div className='w-fit' >
            <div className=' fixed top-0' style={{ backgroundColor: "white", width: "100%", height: "100vh", zIndex: "1000" }}>
              <div className='relative top-80 w-20 m-auto'>
                <FourSquare color="#32cd32" size="large" text="Loading..." />
              </div>
            </div>
          </div >

        ) : (

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

        )}

    </>
  )
}
