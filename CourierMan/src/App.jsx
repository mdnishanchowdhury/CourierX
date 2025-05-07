import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Parcels from "./pages/Parcels";
import Parcel from "./pages/Parcel";
import Login from "./pages/Login";
import Notification from "./pages/Notification";
import HomeNav from "./components/HomeNav";
import Services from "./pages/Services";
import HomePage from "./components/HomePage";
import AboutUp from "./pages/AboutUp";
import Contact from "./pages/Contact";

function App() {
  // Layout for authenticated users (after login)
  const AppLayout = () => {
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

  // Layout for public pages (before login)
  const PublicLayout = () => {
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
      element: <PublicLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/services",
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
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/app",
      element: <AppLayout />,
      children: [
        {
          path: "/app/home",
          element: <Home />,
        },
        {
          path: "/app/parcels",
          element: <Parcels />,
        },
        {
          path: "/app/notification",
          element: <Notification />,
        },
        {
          path: "/app/parcel/:id",
          element: <Parcel />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;