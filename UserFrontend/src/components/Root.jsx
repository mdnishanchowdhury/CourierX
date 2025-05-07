import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Root = () => {
    return (
        // const Layout = () => {
        //     return (
        //       <div className="flex flex-col">
        //         <Navbar></Navbar>
        
        //         <div className="flex">
        //           <div className="w-[20%]">
        //            <Home></Home>
        //           </div>
        
        //           <div className="w-[80%]">
        //             <Outlet></Outlet>
        //           </div>
        //         </div>
        
        //         <Footer></Footer>
        //       </div>
        //     );
        //   };
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;