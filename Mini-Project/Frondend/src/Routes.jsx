import Default from "./layout/Default";
import Guest from "./layout/Guest";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import { createBrowserRouter ,Navigate} from "react-router-dom";
import App from "./App";
import ImageUpload from "./pages/ImageUpload";
import PestImageUpload from "./pages/PestImageUpload";
import Home from "./pages/home";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Default/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/dashboard',
                element:<Navigate to="/user"/>
            },
            {
                path:'/user',
                element:<Navigate to="/"/>
            },
            {
                path:'/detection',
                element:<PestImageUpload/>
            },

        ]
    },
    {
        path:'/',
        element:<Guest/>,
        children:[
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
            {
                path:'/image',
                element:< ImageUpload/>
            },
            
        ]
    }
])
export default router;