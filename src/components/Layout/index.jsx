import React from "react";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="grid gap-6 mx-5 max-w-7xl md:mx-auto my-10 mt-20 mb-6 min-h-[60vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
