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
import Favourites from "../pages/dashboard/FavouritesPage/Favourites";
import ContactRequest from "../pages/dashboard/ContactRequestPage/ContactRequest";
import AdminDashboard from "../pages/dashboard/AdminDashboard/AdminDashboard";
import ManageUser from "../pages/dashboard/ManageUser/ManageUser";
import ApprovedPremium from "../pages/dashboard/ApprovedPremium/ApprovedPremium";
import ApprovedContactRequest from "../pages/dashboard/ApprovedContactRequest/ApprovedContactRequest";

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
        element: (
          <PrivateRoute>
            <BiodataDetailPage />
          </PrivateRoute>
        ),
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
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path: "contact-request",
        element: <ContactRequest />,
      },
      {
        path: "adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "manage-user",
        element: <ManageUser />,
      },
      {
        path: "approved-premium",
        element: <ApprovedPremium />,
      },
      {
        path: "approved-contact-request",
        element: <ApprovedContactRequest />,
      },
    ],
  },
]);

export default router;
