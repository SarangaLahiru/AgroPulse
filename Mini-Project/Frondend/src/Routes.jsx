import Default from "./layout/Default";
import Guest from "./layout/Guest";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import { createBrowserRouter ,Navigate} from "react-router-dom";
import App from "./App";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Default/>,
        children:[
            {
                path:'/',
                element:<App/>
            },
            {
                path:'/dashboard',
                element:<Navigate to="/user"/>
            },
            {
                path:'/user',
                element:<Navigate to="/"/>
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
            }
        ]
    }
])
export default router;