import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../pages/ErrorPages/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from './../pages/Register/Register';
import Biodatas from "../pages/Biodatas/Biodatas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'biodatas',
        element:<Biodatas/>
      }
    ],
  },

  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register/>,
  },
]);

export default router;
