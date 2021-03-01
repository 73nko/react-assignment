import React, { useContext } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { AppContext } from "./appContext";

import Header from "./components/Header";
import Tickets from "./pages/Tickets";
import Toaster from "./components/Toaster";
import TicketDetails from "./pages/TicketDetails";

import "./app.css";

const App = () => {
  const { notification, setNotification } = useContext(AppContext);

  const clearNotification = () => {
    setNotification(null);
  };
  return (
    <>
      <Toaster
        notification={notification}
        clearNotification={clearNotification}
      />
      <div className="app">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/tickets/:ticketId">
              <TicketDetails />
            </Route>

            <Route path="/">
              <Tickets />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
