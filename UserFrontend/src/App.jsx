import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Parcels from "./pages/Parcels";
import Users from "./pages/Users";
import NewParcel from "./pages/NewParcel";
import NewUsers from "./pages/NewUsers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./pages/Profile";
import EditUser from "./pages/EditUser";
import HomePage from "./pages/HomePage";
import HomeNav from "./components/HomeNav";
import Services from "./pages/Services";
import AboutUp from "./pages/AboutUp";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Contacts from "./pages/Contacts";
import Reports from "./pages/Reports";

function App() {
  const Layout = () => {
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className="flex">
          <div className="w-[100%]">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const AuthLayout = () => {
    return (
      <div className="flex flex-col">
        <HomeNav />
        <div className="flex pt-[60px] lg:pt-[80px]">
          <div className="w-[100%]">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/service",
          element: <Services />,
        },
        {
          path: "/aboutUp",
          element: <AboutUp />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
      ],
    },
    {
      path: "/app",
      element: <Layout />,
      children: [
        {
          path: "/app/home",
          element: <Home />,
        },
        {
          path: "/app/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/app/profile",
          element: <Profile />,
        },
        {
          path: "/app/parcels",
          element: <Parcels />,
        },
        {
          path: "/app/users",
          element: <Users />,
        },
        {
          path: "/app/edit-user/:id",
          element: <EditUser />,
        },
        {
          path: "/app/newparcel",
          element: <NewParcel />,
        },
        {
          path: "/app/newuser",
          element: <NewUsers />,
        },
        {
          path: "/app/contacts",
          element: <Contacts />,
        },
        {
          path: "/app/reports",
          element: <Reports/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;