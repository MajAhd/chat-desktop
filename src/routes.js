import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./Components/Home";
// Auth
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
// Chat
import Chat from "./Components/Chat";
import Aux from "./HOC/Aux";
const Routes = () => {
  return (
    <Aux>
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/chat/:user_id/:contact_id" component={Chat} />
      </HashRouter>
    </Aux>
  );
};
export default Routes;
