import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../pages/ErrorPages/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "./../pages/Register/Register";
import Biodatas from "../pages/Biodatas/Biodatas";
import BiodataDetailPage from "../pages/Biodatas/BiodataDetailPage";
import Dashboard from "../layout/Dashboard";
import EditBiodata from "../pages/dashboard/EditBiodata/EditBiodata";
import ViewBiodata from "../pages/dashboard/ViewBiodata/ViewBiodata";
import Checkout from "../pages/Checkout/Checkout";
import PrivateRoute from "./PrivateRoute";

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
        path: "biodatas",
        element: <Biodatas />,
      },
      {
        path: "biodatas/detailsPage/:id",
        element: <BiodataDetailPage />,
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },

  // dashboard routes
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "editBiodata",
        element: <EditBiodata />,
      },
      {
        path: "viewBiodata",
        element: <ViewBiodata />,
      },
    ],
  },
]);

export default router;
