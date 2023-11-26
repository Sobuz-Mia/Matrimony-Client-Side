import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../pages/ErrorPages/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from './../pages/Register/Register';
import Biodatas from "../pages/Biodatas/Biodatas";
import BiodataDetailPage from "../pages/Biodatas/BiodataDetailPage";
import Dashboard from "../layout/Dashboard";
import EditBiodata from "../pages/dashboard/EditBiodata/EditBiodata";

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
      },
      {
        path:'biodatas/detailsPage/:id',
        element:<BiodataDetailPage/>
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

  // dashboard routes
  {
    path:'dashboard',
    element:<Dashboard/>,
    children:[
      {
        path:'editBiodata',
        element:<EditBiodata/>
      }
    ]
  }
]);

export default router;
