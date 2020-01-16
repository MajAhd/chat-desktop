import React from "react";
import Aux from "../HOC/Aux";
import Navbar from "../Templates/Navbar";
const Layout = props => {
  return (
    <Aux>
      <main>
        <div className="container">
          <Navbar />
          {props.children}
        </div>
      </main>
    </Aux>
  );
};

export default Layout;
