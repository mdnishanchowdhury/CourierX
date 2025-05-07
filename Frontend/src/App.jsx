import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyParcels from "./pages/MyParcels";
import Parcels from "./pages/Parcels";
import Parcel from "./pages/Parcel";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import UserNavbar from "./pages/UserNavbar";

function App() {
  const user = useSelector((state) => state.user);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    
    {
      path: "/myparcels",
      element: user.currentUser ? <MyParcels /> : <Navigate to="/login" />,
    },
    {
      path: "/allparcels",
      element: user.currentUser ? <Parcels /> : <Navigate to="/login" />,
    },
    {
      path: "/parcel/:id",
      element: user.currentUser ? <Parcel /> : <Navigate to="/login" />,
    },
    {
      path: "/userNavbar",
      element: <UserNavbar></UserNavbar>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
