import { createBrowserRouter, Navigate } from "react-router-dom";
import Default from "./layout/Default";
import Guest from "./layout/Guest";
import AboutUs from "./pages/About-Us/AboutUs";
import Home from "./pages/home";
import ImageUpload from "./pages/ImageUpload";
import Login from "./pages/login";
import PestImageUpload from "./pages/PestImageUpload";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import Test from "./pages/test";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/dashboard',
                element: <Navigate to="/user" />
            },
            {
                path: '/user',
                element: <Navigate to="/" />
            },
            {
                path: '/detection',
                element: <PestImageUpload />
            },
            {
                path: '/support',
                element: <Support />
            },
            {
                path: '/aboutus',
                element: <AboutUs />
            },
            {
                path: '/test',
                element: <Test />
            },



        ]
    },
    {
        path: '/',
        element: <Guest />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/image',
                element: < ImageUpload />
            },

        ]
    }
])
export default router;