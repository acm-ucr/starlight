import Navigation from "@/components/global/navigation";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
