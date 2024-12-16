import { createBrowserRouter, Navigate } from "react-router-dom";
import Default from "./layout/Default";
import Guest from "./layout/Guest";
import AboutUs from "./pages/About-Us/AboutUs";
import Home from "./pages/home";
import ImageUpload from "./pages/ImageUpload";
import Login from "./pages/login";
import PestImageUpload from "./pages/PestImageUpload";
import PremiumPlans from "./pages/premium";
import ForecastPage from "./pages/premium/Forcast";
import PaymentPage from "./pages/premium/Payment";
import PestDetailsPage from "./pages/premium/pestDetails";
import PestForecastPage from "./pages/premium/pestForcast";
import ProHome from "./pages/premium/proHome";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import Test from "./pages/test";
import ImageSearch from "./pages/test1";
import Chat from "./pages/test2";
import WeatherForecast from "./pages/test3";
import LocationTracker from "./pages/test4";
import App from "./pages/test5";

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
                element: <ImageSearch />
            },
            {
                path: '/test1',
                element: <Test />
            },
            {
                path: '/test2',
                element: <Chat />
            },
            {
                path: '/test3',
                element: <WeatherForecast />
            },
            {
                path: '/test4',
                element: <LocationTracker />
            },
            {
                path: '/test5',
                element: <App />
            },
            {
                path: '/proHome',
                element: <ProHome />
            },
            {
                path: '/Forcast',
                element: <ForecastPage />
            },
            {
                path: '/pestForcast',
                element: <PestForecastPage />
            },
            {
                path: '/pest/:name',
                element: <PestDetailsPage />
            },

            {
                path: '/pro',
                element: <PremiumPlans />
            },
            {
                path: '/payment',
                element: <PaymentPage />
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